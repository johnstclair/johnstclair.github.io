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

function Background({ children }: props ) {
  const [effectRunner, setEffectRunner] = useState<number>(3);

  useWindowSize()

  document.documentElement.style.setProperty('--background-cols', `${Math.floor(document.body.scrollWidth / 100)}`);
  document.documentElement.style.setProperty('--background-rows', `${Math.floor(document.body.scrollHeight / 100)}`);

  document.documentElement.style.setProperty('--scroll-width', `${document.body.scrollWidth}px`);
  document.documentElement.style.setProperty('--scroll-height', `${document.body.scrollHeight}px`);

  console.log(`${document.body.scrollHeight}h by ${document.body.scrollWidth}w`)

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));

      if (effectRunner != 0) {
        setEffectRunner(effectRunner-1);
      }
    }, 125);
  }, [effectRunner])

  return (
    <>
      <div className="background-container">
        {Array.from({ length: Math.floor(document.body.scrollHeight / 100) }).map(() => {
          return (<>
            {Array.from({ length: Math.floor(document.body.scrollWidth / 100) }).map(() => {
              return <motion.div 
                whileTap={{scale: 1.2}}
                onClick={() => {
                  document.documentElement.style.setProperty('--tile-color', document.documentElement.style.getPropertyValue('--tile-color') == "var(--bg)" ? "var(--bg-alt)" : "var(--bg)");
                }}
                className="background-grid-item" ></motion.div>
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
