import { motion } from "motion/react"

import Background from './components/Background'
import './App.css'

function App() {
  return (
    <Background>
      <motion.div 
        initial = {{
          y: "100vh",
        }}
        animate = {{
          y: 0,
          transition: {
            ease: "easeInOut",
            duration: 0.5
          }
        }}

        className="main-container">
        <div className="project-block block">hii</div>
        <div className="about-me-block block">hii</div>
        <div className="logo-block block">hii</div>
        <div className="technologies-block block">hii</div>
        <div className="small-links-block block">hii</div>
      </motion.div>
    </Background>
  )
}

export default App
