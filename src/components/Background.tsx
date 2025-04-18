import { useLayoutEffect, useState } from "react";
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
  useWindowSize()

  return (
    <>
      <div className="background-container">
        {Array.from({ length: Math.floor(document.body.clientHeight / 100) }).map(() => {
          return (<>
            {Array.from({ length: Math.floor(document.body.clientWidth / 100) }).map(() => {
              document.documentElement.style.setProperty('--background-cols', `${Math.floor(document.body.clientWidth / 100)}`);
              document.documentElement.style.setProperty('--background-rows', `${Math.floor(document.body.clientHeight / 100)}`);
              return <motion.div 
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
