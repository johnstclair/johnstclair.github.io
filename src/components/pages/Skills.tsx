import { motion } from "motion/react";

import "../../styles/Skills.css";

import information from "../../assets/information.json"

import Tech from "../Tech";

function Skills() {
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
      className="skills hoverable">
    <div className="skills-wrapper">
        {information["skills"].map((v,i) => {
          return (
            <div key={i} className="skill-section">
              <h1>{v.header} - </h1>
              {v.description}
              <br/>
              {v.items.map((v,i) => {
                return (
                  <Tech key={i} name={v.name} url={v.url}/>
                )
              })}
            </div>
          )
        })}
    </div>
    </motion.div>
  </>)
}

export default Skills
