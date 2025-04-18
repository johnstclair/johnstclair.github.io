import { motion } from "motion/react"
import { useState } from "react"

import Background from './components/Background'
import Main from "./components/pages/Main"

import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'


function App() {
  const pages = [<Main />,<></>]
  const [page, setPage] = useState<number>(0);

  return (
    <Background>
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
          <button className={page == 0 ? "active" : ""} onClick={() => setPage(0)}><FontAwesomeIcon icon={faHouse} /></button>
          <button className={page == 1 ? "active" : ""} onClick={() => setPage(1)}><FontAwesomeIcon icon={faCode} /></button>
          <button className={page == 2 ? "active" : ""} onClick={() => setPage(2)}><FontAwesomeIcon icon={faLayerGroup} /></button>
        </motion.div>
      </div>
    </Background>
  )
}

export default App
