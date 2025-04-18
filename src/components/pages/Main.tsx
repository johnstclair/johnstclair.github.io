import { motion } from "motion/react";

import "../../styles/Main.css";

import logo from "../../assets/logo.png";
import information from "../../assets/information.json"

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

      className="project-block block hoverable">
      project
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

      className="about-me-block block hoverable">
      <h1>{information["about-me-header"]}</h1>
      <p>{information["about-me-content"]}</p>
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

      className="logo-block block hoverable">
      <img src={logo} style={{width: "22em", margin: "-.5em"}}/>
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

      className="technologies-block block hoverable">
      <h1>{information["technologies-header"]}</h1>
      <div className="tech-stack-imgs">
        {information["technologies-icons"].map((v,i) => {
          return (<>
            <div>
              <motion.img 
                whileHover={{
                  rotate: ["360deg","0deg"],
                  transition: {
                    bounce: .5,
                    type: "spring",
                  }
                }}
                animate={{rotate: "0deg"}}
                className="tech-stack-img" 
                key={i} 
                src={v.link} />
            </div>
          </>)
        })}
      </div>
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

      className="small-links-block block hoverable">
      links
    </motion.div>
  </>)
}

export default Main
