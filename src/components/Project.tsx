import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../styles/Projects.css"

import Tech from './Tech'

interface technologies {
  name: string,
  url: string,
}

interface iconLinks {
  name: string,
  icon: string,
  url: string,
}

interface projectInfo {
  name: string,
  description: string,
  role: string,
  image: string,
  links: iconLinks[],
  technologies: technologies[],
}

interface props {
  information: projectInfo,
}

function Project({ information }: props) {
  let bottomPadding: string = "1em";
  if (information.links.length > 0) {
    bottomPadding = "3.5em";
  }

  return (<div className="project" style={{paddingBottom: bottomPadding}}>
    <h3>{information.name}</h3>
    <img src={`/${information.image}`}/>
    <p style={{textIndent: 0, margin: ".5em 0 0 .2em"}}>{information.role}</p>
    <p>{information.description}</p>
    <div className="links">
      {information.links.map((v,i) => {
        return  (
          <a key={i} href={v.url} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={v.icon as IconProp} />
          </a>
        )
      })}
    </div>
    <div className="tech">
      {information.technologies.map((v,i) => {
        return (<>
          <div key={i}>
            <Tech name={v.name} url={v.url}/>
          </div>
        </>)
      })}
    </div>
  </div>)
}

export default Project
