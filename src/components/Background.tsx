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
        {Array.from({ length: Math.floor(document.body.scrollHeight / 100) }).map((_,r) => {
          return (<>
            {Array.from({ length: Math.floor(document.body.scrollWidth / 100) }).map((_,c) => {
              return <motion.div 
                key={`${r} + ${c}`}
                whileTap={{scale: 1.2}}
                onClick={() => {
                  const bg1 = window.getComputedStyle(document.body).getPropertyValue('--dark-bg');
                  const bg2 = window.getComputedStyle(document.body).getPropertyValue('--light-bg');
                  const fg1 = window.getComputedStyle(document.body).getPropertyValue('--dark-fg');
                  const fg2 = window.getComputedStyle(document.body).getPropertyValue('--light-fg');
                  console.log(`${bg1}${bg2}${fg1}${fg2}`)
                  document.documentElement.style.setProperty('--dark-bg', `${bg2}`);
                  document.documentElement.style.setProperty('--light-bg', `${bg1}`);
                  document.documentElement.style.setProperty('--dark-fg', `${fg2}`);
                  document.documentElement.style.setProperty('--light-fg', `${fg1}`);
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
