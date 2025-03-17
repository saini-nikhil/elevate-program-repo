import { useState } from 'react'

import './App.css'
import Flip from './components/flip'
import Timer from './components/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>Flashcard Learning App </h1>
       {/* <Timer/> */}
       <Flip/>
    </>
  )
}

export default App
