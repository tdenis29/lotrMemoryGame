import React, {Children, useEffect, useState} from 'react'

function App() {
  const [hpData, setHPData] = useState()
  const[score, setScore] = useState(0)


  useEffect(() => {
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
        charArray[7], charArray[8], charArray[9], charArray[10], charArray[11]
        ]
      setHPData(useTheseChars)
    
    }
    callHPAPI()
  }, [hpData])

  return (
   <>
   <Header  Scoreboard={<Scoreboard score={score} />}/>
   <Gameboard data={hpData} Cards={Cards}/>
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
function Gameboard(data, {Cards}){
  console.log(data)
  const gameElements = data.map(item => <Cards path={item.image} name={item.name} />)
  return (
    <div>
      {gameElements}
    </div>
  )
}
function Cards(path, name) {
  return(
    <div className='card'>
      <img alt="" src={path}></img>
      <p>{name}</p>
    </div>
  )
}
export default App;


// return <ComponentOne ComponentTwo={<ComponentTwo data={data} />} />;