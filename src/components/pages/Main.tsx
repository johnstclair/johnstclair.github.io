import { motion } from "motion/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "../../styles/Main.css";

import information from "../../assets/information.json"

import Tech from "../Tech";
import Project from "../Project";

const load = {
  initial: {
    scale: ".9",
  },
  animate: {
    scale: "1",
    transition: {
    }
  }
};

function Main() {
  let featProject = information["projects"][information["featProject"]];
  featProject = {name: featProject.name, description: "", role: "", image: featProject.image, links: [], technologies: []};

  return (<>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="project-block block hoverable">
      <a href={information["projects"][information["featProject"]].links[0].url}>
        <Project information={featProject} />
      </a>
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="about-me-block block hoverable">
      <h1>{information["about-me-header"]}</h1>
      <p>{information["about-me-content"]}</p>
      <p className="about-me-json">
        {information["about-me-json"].map((v) => {
          const quotes = !v.value.includes("\"") ? "\"" : "";
          return (<>
            <span className="key">"{v.key}"</span>: 
            <span className="value"> {quotes}{v.value}{quotes}</span>,
            <br />
          </>)
        })}
      </p>
    </motion.div>
    <motion.div 
      variants={load}
      animate="animate"
      initial="initial"
      className="logo-block block hoverable">
      <img src={"/logo.png"} style={{width: "22em", margin: "-.5em"}}/>
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
                <FontAwesomeIcon icon={v.icon as IconProp} />
              </a>
            </div>
          </>)
        })}
    </motion.div>
  </>)
}

export default Main
