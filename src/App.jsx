import { useState } from 'react'
import positive from './assets/Positive.png'
import negative from './assets/Negative.png'
import neutral from './assets/Neutral.png'
import error from './assets/error.png'
import not_rated from './assets/not_rated.png'
import './App.css'
function App() {
  const [resultState, setResultState] = useState('nothing_sent')
  const [queryDisplayState, setQueryDisplayState] = useState('')

  return (
    <>
      <div>
        <h1>Sentiment analysis frontend</h1>
        <ResultContainer resultState={resultState} queryDisplayState={queryDisplayState} />
        <InputContainer setResultState={setResultState} setQueryDisplayState={setQueryDisplayState}/>
      </div>
    </>
  )
}

function ResultText({resultState, queryDisplayState}) {
  return (
    <>
      <div>
        <p>Sentiment analysis for query: "{queryDisplayState}" was:</p>
        <h2>{resultState}</h2>
      </div>
    </>
  )

}
function ResultContainer({resultState, queryDisplayState}) {
  let content
  if (resultState == "nothing_sent") {
    content = 
    <div>
      <p>You have not sent anything for sentiment analysis</p>
      <img src={not_rated} className="logo"/>
    </div>
  }
  if (resultState == "sending...") {
    content = 
    <div>
      <p>Checking...</p>
      <img src={not_rated} className="logo"/>
    </div>
  }

  if (resultState == "error") {
    content = 
    <div>
      <p>Looks like something went horribly wrong :(</p>
      <img src={error} className="logo"/>
    </div>
  }

  if (resultState == "Positive") {
    content = 
    <div>
      <ResultText resultState={resultState} queryDisplayState={queryDisplayState}></ResultText>
      <img src={positive} className="logo"/>
    </div>
  }
  if (resultState == "Neutral") {
    content = 
    <div>
      <ResultText resultState={resultState} queryDisplayState={queryDisplayState}></ResultText>
      <img src={neutral} className="logo"/>
    </div>
  }
  if (resultState == "Negative") {
    content = 
    <div>
      <ResultText resultState={resultState} queryDisplayState={queryDisplayState}></ResultText>
      <img src={negative} className="logo"/>
    </div>
  }
  return (
    <>
    {content}
    </>
  )
}

function InputContainer({setResultState, setQueryDisplayState}) {
  const [inputState, setInputState] = useState('')

  function handleTextAreaChange(e) {
    setInputState(e.target.value)
  }
  function randomSentiment() {
    const sentimenList = [
      "Positive",
      "Neutral",
      "Negative",
      "nothing_sent",
      "error"
    ]
    // https://www.w3schools.com/jsref/jsref_random.asp
    const x = Math.floor(Math.random() * sentimenList.length)
    console.log(x)
    const result = sentimenList[x]
    return result
    
    
  }

  async function sendQuery() {
    setQueryDisplayState(inputState)
    setResultState("sending...")
    // Stack Overflow: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
    await new Promise( r => setTimeout(r, 3000))
    const result = randomSentiment()
    setResultState(result)
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
