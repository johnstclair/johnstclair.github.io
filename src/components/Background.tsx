import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

import "../styles/Background.css"

interface props {
  children: JSX.Element,
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function checkSafety(li: tile[][], r: number, c: number): boolean {
  if (li.length > r) {
    if (li[r].length > c) {
      return true
    }
  }
  return false 
}

interface tile {
  dark: boolean,
  updated: boolean,
}

function Background({ children }: props ) {
  const [effectRunner, setEffectRunner] = useState<number>(3);
  const [darkTiles, setDarkTiles] = useState<tile[][]>([]);
  const [tilePolarity, setTilePolarity] = useState<boolean>(true);

  useWindowSize()

  document.documentElement.style.setProperty('--background-cols', `${Math.floor(document.body.scrollWidth / 100)}`);
  document.documentElement.style.setProperty('--background-rows', `${Math.floor(document.body.scrollHeight / 100)}`);

  document.documentElement.style.setProperty('--scroll-width', `${document.body.scrollWidth}px`);
  document.documentElement.style.setProperty('--scroll-height', `${document.body.scrollHeight}px`);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));

      const output = [];
      console.log(Math.floor(document.body.scrollWidth / 100))
      console.log(Math.floor(document.body.scrollHeight / 100))
      for (let i = 0; i < Math.floor(document.body.scrollWidth / 100); i++) {
        output.push([])
        for (let j = 0; j < Math.floor(document.body.scrollHeight / 100); j++) {
          output[i].push({dark: true, updated: false});
        }
      }
      setDarkTiles(output)

      if (effectRunner != 0) {
        setEffectRunner(effectRunner-1);
      }
    }, 125);
  }, [effectRunner])

  useEffect(() => {
    const output = darkTiles
    output.flat().map(v => {
      v.updated = false;
    })
  }, [darkTiles])

  console.log(darkTiles)

  return (
    <>
      <div className="background-container">
        {Array.from({ length: Math.floor(document.body.scrollWidth / 100) }).map((_,r) => {
          return (<>
            {Array.from({ length: Math.floor(document.body.scrollHeight / 100) }).map((_,c) => {
              // checks if the tile is safe (exists), then sets to correct color, if not safe default to polarity mode
              const tileBgColor = checkSafety(darkTiles, r, c) ? darkTiles[r][c].dark ? 'dark' : 'light' : 'var(--bg)';

              return <motion.div 
                key={`${r} + ${c}`}
                whileTap={{scale: 1.2}}
                onClick={() => {
                  // TODO: currently NEED to hardcode the val of the dark bg, fix this
                  const polarity: string = window.getComputedStyle(document.body).getPropertyValue('--bg') == "#1C1C1C" ? "light" : "dark";

                  document.documentElement.style.setProperty('--bg', `var(--${polarity}-bg)`);
                  document.documentElement.style.setProperty('--fg', `var(--${polarity}-fg)`);
                  document.documentElement.style.setProperty('--trans', `var(--${polarity}-trans)`);

                  setTilePolarity(!tilePolarity)
                  if (checkSafety(darkTiles, r, c)) {
                    const output = darkTiles;
                    output[r][c] = {dark: !output[r][c].dark, updated: true};
                    setDarkTiles(output);
                  } else {
                    console.log(`${r}r ${darkTiles.length} |  ${c}c ${darkTiles[r].length}`)
                  }
                }}
                className="background-grid-item"
                style={{backgroundColor: `var(--${tileBgColor}-bg)`}}></motion.div>
            })}
          </>) 
        })}
      </div>
      <main>
        {children}
      </main>
    </>
  );
};

export default Background
