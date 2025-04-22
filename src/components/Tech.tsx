import { motion } from "motion/react";

import Tooltip from "./Tooltip";

import "../styles/Tech.css";

interface props {
  name: string,
  url: string
}

function Tech({name, url}: props): JSX.Element {
  return ( 
  <Tooltip delay={800} content={name} direction="top">
    <motion.img 
      whileHover={{
        rotate: ["360deg","0deg"],
        transition: {
          duration: .8,
          bounce: .5,
          type: "spring",
        }
      }}
      animate={{rotate: "0deg"}}
      className="tech-stack-img modal" 
      src={url} />
  </Tooltip>
  )
}

export default Tech
