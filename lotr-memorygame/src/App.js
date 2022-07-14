import React, {useEffect, useState} from 'react'

function App() {
  
  const [hpData, setHPData] = useState([])
  const [gameData, setGameData] = useState([])
  const[score, setScore] = useState(0)
  

  useEffect(() => {
    callHPAPI()
  }, [])

  useEffect(()=> {
    if(hpData){
      shuffleArray(hpData)
    }
  }, [hpData])

  async function callHPAPI(){
    console.log("api called")
    const response = await fetch("http://hp-api.herokuapp.com/api/characters")

    if (!response === 200) {
      const message = `An error has occured: ${response.status}`;
      console.log(message)
    }
    const characters = await response.json();
    let charArray = Array.from(characters)
    let useTheseChars = [
      charArray[0], charArray[1], charArray[2], charArray[3], charArray[4], charArray[16], 
      charArray[7], charArray[8], charArray[9], charArray[10], charArray[11], charArray[12]
      ]
      useTheseChars.forEach(item => item.chosen = false)
      setHPData(useTheseChars)  
  }

  function shuffleArray(array) {
    let newArr = [...array]
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    setGameData(newArr)
}

  function handleClick(e){
    let clicked = e.target.dataset.name
    let tempArray = [...hpData]
    let filteredItem = tempArray.filter(item => item.name === clicked)  
    if(filteredItem[0].chosen === true ){
      handleItemHasChosen()
    } else {
      handleItemNotChosen()
      let itemToUpdate = filteredItem[0].chosen = true
      let finishedArray = tempArray.map(item => item.name === itemToUpdate.name ? itemToUpdate : item )
      setHPData(finishedArray)
    }
   }

   function handleItemHasChosen(){
    // console.log("reset score here")
    setScore(prevScore => prevScore = 0)
    setHPData(prevData => prevData.map(item => {
      return {
        ...item,
        chosen : false,
      }
    }))
   }
   function handleItemNotChosen(){
    // console.log("increment score here")
    setScore(prevScore => prevScore + 1)
   }
    

  return (
   <>
   <Header  Scoreboard={<Scoreboard score={score} />}/>
   <Gameboard data={gameData} handleClick={handleClick} Cards={<Cards/>}/>
   </>
  );
}
function Header ({Scoreboard}) {
  // console.log("header rendered")
  return (
    <header>
      <h1>Harry Potter Memory Game</h1>
      {Scoreboard}
    </header>
  )
}

function Scoreboard({score}){
  const [bestScore, setBestScore] = useState(0)

  if(score > bestScore){
    setBestScore(prevBest => prevBest = score)
  } 
  return (
    <div>
      <p>Current Score : {score}</p>
      <p>Best Score : {bestScore}</p>
    </div>
  )
}
function Gameboard(props){
  const gameElements = props.data.map((item,index) => <Cards key={index} handleClick={props.handleClick} path={item.image} name={item.name} />)
  return (
    <div className='gameboard'>
      {gameElements}
    </div>
  )
}
function Cards(props) {
  const {handleClick, name , path} = props
  return(
      <div className='card'>
        <div className='card-img'>
          <img onClick={(e)=> handleClick(e)} alt="" src={path} data-name={name} className="game-img"></img>
        </div>
        <div className='card-name'>
          <p className='centered'>{name}</p>
        </div>
      </div>
  )
}
export default App;


