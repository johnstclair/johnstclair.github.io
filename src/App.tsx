import { motion } from "motion/react"
import { useState } from "react"

import Background from './components/Background'
import Main from "./components/pages/Main"
import Projects from "./components/pages/Projects"
import Skills from "./components/pages/Skills"

import './App.css'

import { IconProp, library  } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

function App() {
  const pages = [<Main />,<Projects />, <Skills />]
  const [page, setPage] = useState<number>(0);

  return (
    <Background scrollablePage={page == 0}>
      <div className="inner-main-container">
        <motion.div 
          initial = {{
            scale: 0.9,
          }}
          animate = {{
            scale: 1.0,
            transition: {
              ease: "easeInOut",
              duration: 0.5
            }
          }}

          className="main-container">
            {pages[page]}
        </motion.div>
        <motion.div className="nav-buttons-container hoverable">
          <button className={page == 0 ? "active" : ""} onClick={() => setPage(0)}><FontAwesomeIcon icon={"fa-house" as IconProp} /></button>
          <button className={page == 1 ? "active" : ""} onClick={() => setPage(1)}><FontAwesomeIcon icon={"fa-code" as IconProp} /></button>
          <button className={page == 2 ? "active" : ""} onClick={() => setPage(2)}><FontAwesomeIcon icon={"fa-layer-group" as IconProp} /></button>
        </motion.div>
      </div>
    </Background>
  )
}

export default App
