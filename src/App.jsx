import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [resultState, setResultState] = useState('nothing_sent')
  const [queryDisplayState, setQueryDisplayState] = useState('')

  return (
    <>
      <div>
        <ResultContainer resultState={resultState} queryDisplayState={queryDisplayState} />
        <InputContainer setResultState={setResultState} setQueryDisplayState={setQueryDisplayState}/>
      </div>
    </>
  )
}
function ResultContainer({resultState, queryDisplayState}) {
  return (
    <>
      <div>
        <h1>Result:</h1>
        <p>{resultState}</p>
        <p>{queryDisplayState}</p>
      </div>
    </>
  )
}

function InputContainer({setResultState, setQueryDisplayState}) {
  const [inputState, setInputState] = useState('')

  function handleTextAreaChange(e) {
    setInputState(e.target.value)
  }

  async function sendQuery() {
    setQueryDisplayState(inputState)
    setResultState("sending...")
    await new Promise( r => setTimeout(r, 3000))
    setResultState("positive")
  }
  return (
    <>
      <div>
        <h1>Input</h1>
        <input type='text' value={inputState} onChange={handleTextAreaChange}></input>
        <button onClick={sendQuery}>Send</button>
      </div>
    </>
  )
}

export default App
