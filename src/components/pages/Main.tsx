import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/Main.css";

import logo from "../../assets/logo.png";
import information from "../../assets/information.json"

import Tech from "../Tech";

function Main() {
  const load= {
    initial: {
      scale: ".9",
    },
    animate: {
      scale: "1",
      transition: {
      }
    }
  };

  return (<>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="project-block block hoverable">
      project
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="about-me-block block hoverable">
      <h1>{information["about-me-header"]}</h1>
      <p>{information["about-me-content"]}</p>
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="logo-block block hoverable">
      <img src={logo} style={{width: "22em", margin: "-.5em"}}/>
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="technologies-block block hoverable">
      <h1>{information["technologies-header"]}</h1>
      <div className="tech-stack-imgs">
        {information["technologies-icons"].map((v,i) => {
          return (<>
            <div key={i}>
              <Tech name={v.name} url={v.url}/>
            </div>
          </>)
        })}
      </div>
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="small-links-block block hoverable">
        {information["links"].map((v,i) => {
          return (<>
            <div key={i} className={v.icon == "" ? "empty" : ""}>
              <a href={v.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={v.icon} />
              </a>
            </div>
          </>)
        })}
    </motion.div>
  </>)
}

export default Main
