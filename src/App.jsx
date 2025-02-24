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
      <div className="appRoot">
        <div className='headline'>
          <h1>Sentiment analysis frontend</h1>
        </div>
        <div className='queryText'>
          <ResultQueryText resultState={resultState} queryDisplayState={queryDisplayState}></ResultQueryText>
        </div>
        <div className='image'>
          <ResultImage resultState={resultState}></ResultImage>
        </div>
        <div className='resultText'>
          <ResultText resultState={resultState}></ResultText>
        </div>
        <InputContainer setResultState={setResultState} setQueryDisplayState={setQueryDisplayState}/>
      </div>
    </>
  )
}

function ResultQueryText({resultState, queryDisplayState}) {
  let content
  if(resultState == "nothing_sent") {
    content = (
      <>
        <h3>
          Send something for sentiment analysis
        </h3>
      </>
    )
  }
  else {
    content = (
      <>
        <p>
          Sentiment for query:
        </p>
        <p className='queryContainer'>
        "{queryDisplayState}"
        </p>
        <p>
          was:
        </p>
      </>
    )
  }
  return content

}
function ResultText({resultState}) {
  let content
  if(resultState == "sending...") {
    content = (
      <>
        <h2> Checking sentiment... </h2>
      </>
    )
  }
  if(resultState == "nothing_sent") {
    content = (
      <>
        <h2>Nothing sent</h2>
      </>
    )
  }
  else {
    content = (
      <>
        <h2>{resultState}</h2>
      </>
    )
  }
  return content
}

function ResultImage({resultState}) {
  let content
  if(resultState == "Positive") {
    content = (
      <>
        <img src={positive} className="logo"/>
      </>
    )
  }
  else if(resultState == "Negative") {
    content = (
      <>
        <img src={negative} className="logo"/>
      </>
    )
  }
  else if(resultState == "Neutral") {
    content = (
      <>
        <img src={neutral} className="logo"/>
      </>
    )
  }
  else if(resultState == "error") {
    content = (
      <>
        <img src={error} className="logo"/>
      </>
    )
  }
  else{
    content = (
      <>
        <img src={not_rated} className="logo"/>
      </>
    )
  }
  return content
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
      "Negative"
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
      <div className='textInput'>
          <input type='text' value={inputState} onChange={handleTextAreaChange}></input>
      </div>
      <div className='inputButton'>
        <button onClick={sendQuery}>Send</button>
      </div>
    </>
  )
}

export default App
