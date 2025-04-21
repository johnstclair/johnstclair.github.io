import { motion } from "motion/react";

import "../../styles/Projects.css";

import information from "../../assets/information.json"

import Project from "../Project";

function Projects() {
  return (<>
    <motion.div 
      initial = {{
        scale: ".9",
      }}
      animate = {{
        scale: "1",
        transition: {
        }
      }}
      className="projects hoverable">
    <div className="projects-wrapper">
        {information["projects"].map((v) => {
          return (
            <Project information={v}/>
          )
        })}
    </div>
    </motion.div>
  </>)
}

export default Projects
