import { motion } from "motion/react"

import Background from './components/Background'
import Main from "./components/pages/Main"

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
        <Main />
      </motion.div>
    </Background>
  )
}

export default App
