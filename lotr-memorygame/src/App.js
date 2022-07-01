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
    const response = await fetch("http://hp-api.herokuapp.com/api/characters")

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.log(message)
    }
    const characters = await response.json();
    let charArray = Array.from(characters)
    let useTheseChars = [
      charArray[0], charArray[1], charArray[2], charArray[3], charArray[4], charArray[16], 
      charArray[7], charArray[8], charArray[9], charArray[10], charArray[11], charArray[12]
      ]
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
    // console.log("ran")
    let clicked = e.target.dataset.name
    for(let i = 0; i > hpData.length; i++){
      let count = 0
      if(hpData[i].chosen){
       count = count++
      }
    }
   
  
  
    
    
    
  }

  return (
   <>
   <Header  Scoreboard={<Scoreboard score={score} />}/>
   <Gameboard data={gameData} handleClick={handleClick} Cards={<Cards/>}/>
   </>
  );
}
function Header ({Scoreboard}) {
  return (
    <header>
      <h1>Harry Potter Memory Game</h1>
      {Scoreboard}
    </header>
  )
}

function Scoreboard({score}){
  return (
    <div>
      <p>{score}</p>
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


