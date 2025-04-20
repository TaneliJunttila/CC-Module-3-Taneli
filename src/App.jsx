import { useState } from 'react'
import positive from './assets/Positive.png'
import negative from './assets/Negative.png'
import neutral from './assets/Neutral.png'
import error from './assets/Error.png'
import not_rated from './assets/Not_rated.png'
import './App.css'
function App() {
  const [resultState, setResultState] = useState('nothing_sent')
  const [queryDisplayState, setQueryDisplayState] = useState('')
  const [historyItemList, setHistoryItemList] = useState([])

  return (
    <>
      <div className="appRoot">
        <div className='headline'>
          <h1>Sentiment analysis frontend</h1>
        </div>
        <div className='image'>
          <ResultImage resultState={resultState}></ResultImage>
        </div>
        <div className='queryText'>
          <ResultQueryText resultState={resultState} queryDisplayState={queryDisplayState}></ResultQueryText>
        </div>
        <InputContainer setResultState={setResultState} setQueryDisplayState={setQueryDisplayState}/>
        <div className='resultText'>
          <ResultText resultState={resultState}></ResultText>
        </div>
        <div className='historyContainer'>
          <HistoryContainer historyItemList={historyItemList} setHistoryItemList={setHistoryItemList}></HistoryContainer>
        </div>
      </div>
    </>
  )
}

function HistoryContainer({historyItemList, setHistoryItemList}) {
  async function getHistory() {
    try {
      await fetch("https://cc-module-5-taneli-private-cloud-computing-2025-taneli.2.rahtiapp.fi/history", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        return response.json();
      }
      ).then(data => {
        setHistoryItemList(data)
      })
    }
    catch(err) {
      alert(err)
    }
  }
  async function deleteHistory() {
    try {
      await fetch("https://cc-module-5-taneli-private-cloud-computing-2025-taneli.2.rahtiapp.fi/history", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        getHistory()
        return response.json();
      })
    }
    catch(err) {
      alert(err)
    }
  }

  let content = (
    <>
    <h3>History</h3>
    <div className='refreshButton'>
        <button onClick={getHistory}>Refresh</button>
    </div>
    <div className='refreshButton'>
        <button onClick={deleteHistory}>Delete History</button>
    </div>
    <div>
      <HistoryList historyItemList={historyItemList}></HistoryList>
    </div>
    
    </>
  )

  return content
}

function HistoryList({historyItemList}) {
  const listItems = historyItemList.map(historyItem => 
    <li>
      <h4>
        Query: {[historyItem.query]}
      </h4>
      <h6>
        Answer: {[historyItem.result]}
      </h6>
    </li>
  )
  return <ul>{listItems}</ul>
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
        <h3>
          Sentiment for query:
        </h3>
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
  else if(resultState == "nothing_sent") {
    content = (
      <>
        <h2>Nothing sent</h2>
      </>
    )
  }
  else {
    content = (
      <>
        <h2>is {resultState}</h2>
      </>
    )
  }
  return content
}

function ResultImage({resultState}) {
  let content
  if(resultState == "positive") {
    content = (
      <>
        <img src={positive} className="logo"/>
      </>
    )
  }
  else if(resultState == "negative") {
    content = (
      <>
        <img src={negative} className="logo"/>
      </>
    )
  }
  else if(resultState == "neutral") {
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
      "positive",
      "neutral",
      "negative"
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
    // https://www.w3schools.com/jsref/jsref_try_catch.asp
    try {
      await fetch("https://cc-module-5-taneli-private-cloud-computing-2025-taneli.2.rahtiapp.fi/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
          prediction: inputState.toString()
        }),
      }).then(response => {
        return response.json();
      }
      ).then(data => {
        setResultState(data['Verdict'])
      })
    }
    catch(err) {
      setResultState("error")
      alert(err)
    }
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
