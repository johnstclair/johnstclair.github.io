import { JSX, useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

import "../styles/Background.css"

interface props {
  children: JSX.Element,
  scrollablePage: boolean,
}

function useWindowSize(setDarkTiles: (item: tile[][]) => void, pageDims: [number, number], tilePolarity: boolean) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([pageDims[0], pageDims[1]]);
      const output: tile[][] = [];
      for (let i = 0; i < Math.floor(pageDims[1] / 100); i++) {
        output.push([])
        for (let j = 0; j < Math.floor(pageDims[0] / 100); j++) {
          output[i].push({dark: tilePolarity, updated: true});
        }
      }
      setDarkTiles(output);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return size;
}

function checkSafety(li: tile[][], r: number, c: number): boolean {
  if (r == -1 || c == -1) {
    return false
  }
  if (li.length > r) {
    if (li[r].length > c) {
      return true
    }
  }
  return false 
}

function allTheSame(li: tile[][]): boolean {
  if (li.length == 0) {
    return false
  }
  if (li[0].length == 0) {
    return false
  }
  const output = li[0][0].dark;
  for (let i = 0; i < li.length; i++) {
    for (let j = 0; j < li[i].length; j++) {
      if (output != li[i][j].dark) {
        return false
      }
    }
  }
  return true
}

interface tile {
  dark: boolean,
  updated: boolean,
}

function Background({ children, scrollablePage }: props ) {
  const [darkTiles, setDarkTiles] = useState<tile[][]>([]);
  const [tilePolarity, setTilePolarity] = useState<boolean>(true);

  const [showNotif, setShowNotif] = useState<boolean>(true);

  const [update, setUpdate] = useState<number>(0);

  
  const pageWidth = scrollablePage ? document.body.scrollWidth : window.innerWidth;
  const pageHeight = scrollablePage ? document.body.scrollHeight : window.innerHeight;

  const updateDarkTiles = (input: tile[][]) => {
    setDarkTiles(input);
    setUpdate(update+1);
  }

  useWindowSize(updateDarkTiles, [pageWidth, pageHeight], tilePolarity);

  document.documentElement.style.setProperty('--background-cols', `${Math.floor(pageWidth / 100)}`);
  document.documentElement.style.setProperty('--background-rows', `${Math.floor(pageHeight / 100)}`);

  document.documentElement.style.setProperty('--scroll-width', `${pageWidth}px`);
  document.documentElement.style.setProperty('--scroll-height', `${pageHeight}px`);

  useEffect(() => {
    document.documentElement.style.setProperty('--scrollable-height', `${pageHeight}px`);

    if (pageHeight == window.innerHeight) {
      document.documentElement.style.setProperty('--overflow', `hidden`);
    } else {
      document.documentElement.style.setProperty('--overflow', `visible`);
    }
  }, [pageHeight, scrollablePage])

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      const pWidth = scrollablePage ? document.body.scrollWidth : window.innerWidth;
      const pHeight = scrollablePage ? document.body.scrollHeight : window.innerHeight;

      const output: tile[][] = [];
      for (let i = 0; i < Math.floor(pHeight / 100); i++) {
        output.push([])
        for (let j = 0; j < Math.floor(pWidth / 100); j++) {
          output[i].push({dark: tilePolarity, updated: false});
        }
      }
      setDarkTiles(output)
    }, 750);

    setTimeout(() => {
      setShowNotif(false);
    }, 10000)
   
    document.addEventListener('mousedown', () => setShowNotif(false)); 
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const output = darkTiles
    output.flat().map(v => {
      v.updated = false;
    })
    if (output.length > 0) {
      if (!allTheSame(output)) {
        setTimeout(() => {
          for (let i = 0; i < output.length; i++) {
            for (let j = 0; j < output[i].length; j++) {
              if (!output[i][j].updated && output[i][j].dark == tilePolarity) {
                if (checkSafety(output,i-1,j)) {if (output[i-1][j].dark != tilePolarity) {output[i-1][j] = {dark: tilePolarity, updated: true}}}
                if (checkSafety(output,i+1,j)) {if (output[i+1][j].dark != tilePolarity) {output[i+1][j] = {dark: tilePolarity, updated: true}}}
                if (checkSafety(output,i,j-1)) {if (output[i][j-1].dark != tilePolarity) {output[i][j-1] = {dark: tilePolarity, updated: true}}}
                if (checkSafety(output,i,j+1)) {if (output[i][j+1].dark != tilePolarity) {output[i][j+1] = {dark: tilePolarity, updated: true}}}
              }
            }
          }
        setUpdate(update+1)
        }, 30);
      }
    }
    setDarkTiles(output);
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  return (
    <>
      {showNotif ? 
      <motion.div 
          initial={{
            scale: ".8",
          }}
          animate={{
            scale: "1",
          }}
          className="background-notif hoverable">
        <h3>Hey!</h3>
        <p>You can switch the background color by clicking on any of the tiles!</p>
      </motion.div> : <></>}
      <div className="background-container">
        {Array.from({ length: Math.floor(pageHeight / 100) }).map((_,r) => {
          return (<>
            {Array.from({ length: Math.floor(pageWidth / 100) }).map((_,c) => {
              // checks if the tile is safe (exists), then sets to correct color, if not safe default to polarity mode
              const tileBgColor = checkSafety(darkTiles, r, c) ? darkTiles[r][c].dark ? 'dark' : 'light' : 'var(--bg)';

              return <motion.div 
                key={`${r} + ${c}`}
                whileTap={{scale: 1.2}}
                onClick={() => {
                  // TODO: currently NEED to hardcode the val of the dark bg, fix this
                  const polarity: string = window.getComputedStyle(document.body).getPropertyValue('--bg') == "#1C1C1C" ? "light" : "dark";
                  const altPolarity: string = window.getComputedStyle(document.body).getPropertyValue('--bg') == "#1C1C1C" ? "dark" : "light";

                  if (polarity == 'dark') {
                    document.documentElement.style.setProperty('--invert-amount', ".15");
                  } else {
                    document.documentElement.style.setProperty('--invert-amount', ".85");
                  }

                  document.documentElement.style.setProperty('--bg', `var(--${polarity}-bg)`);
                  document.documentElement.style.setProperty('--fg', `var(--${polarity}-fg)`);
                  document.documentElement.style.setProperty('--trans', `var(--${polarity}-trans)`);
                  document.documentElement.style.setProperty('--shadow', `var(--${polarity}-shadow)`);

                  document.documentElement.style.setProperty('--alt-bg', `var(--${altPolarity}-bg)`);
                  document.documentElement.style.setProperty('--alt-fg', `var(--${altPolarity}-fg)`);
                  document.documentElement.style.setProperty('--alt-trans', `var(--${altPolarity}-trans)`);
                  document.documentElement.style.setProperty('--alt-shadow', `var(--${altPolarity}-shadow)`);

                  setTilePolarity(!tilePolarity)
                  setUpdate(update+1)
                  if (checkSafety(darkTiles, r, c)) {
                    const output = darkTiles;
                    output[r][c] = {dark: !output[r][c].dark, updated: true};
                    setDarkTiles(output);
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
