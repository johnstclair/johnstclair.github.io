import { motion } from "framer-motion";

import "../styles/background.css"

interface props {
  children: JSX.Element,
}

function Background({ children }: props ) {
  return (
    <>
      <div className="background-container">
        {Array.from({ length: 250 }).map((_, i) => {
          return (<motion.div
            key={i}
            className="background-grid-item"
        ></motion.div>
      )})}
      </div>
      <main>
        {children}
      </main>
    </>
  );
};

export default Background
