import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddEmployee from './components/AddEmployeefrom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddEmployee/>
    </>
  )
}

export default App
