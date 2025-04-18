import { motion } from "motion/react";

import "../../styles/Main.css";

import logo from "../../assets/logo.png";

function Main() {
  return (<>
    <motion.div 
      initial = {{
        y: "-50em",
      }}
      animate = {{
        y: 0,
        transition: {
          ease: "easeIn",
        }
      }}

      className="project-block block">
      hii
    </motion.div>
    <motion.div 
      initial = {{
        y: "100vh",
      }}
      animate = {{
        y: 0,
        transition: {
          ease: "easeIn",
        }
      }}

      className="about-me-block block">
      hii
    </motion.div>
    <motion.div 
      initial = {{
        x: "100vw",
      }}
      animate = {{
        x: 0,
        transition: {
          ease: "easeIn",
        }
      }}

      className="logo-block block">
    </motion.div>
    <motion.div 
      initial = {{
        x: "-50vw",
      }}
      animate = {{
        x: 0,
        transition: {
          ease: "easeIn",
        }
      }}

      className="technologies-block block">
      tech
    </motion.div>
    <motion.div 
      initial = {{
        y: "100vw",
      }}
      animate = {{
        y: 0,
        transition: {
          ease: "easeIn",
        }
      }}

      className="small-links-block block">
      links
    </motion.div>
  </>)
}

export default Main
