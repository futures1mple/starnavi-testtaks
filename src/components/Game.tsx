import React, { useEffect, useState } from 'react';
import { Game } from '../models/game';
import '../App.css';

const GameComponent:React.FC = () => {
  const [fields, setFields] = useState<Game[]>([])
  const [selectedField, setSelectedField] = useState<number>()
  const [array, setArray] = useState<any>([])
  
  useEffect(()=> {
    // Fetching data
    fetch('https://demo7919674.mockable.io/')
      .then( async (response)  => {
        var res = await response.json()
        setFields(res)
      })
      .catch((err) => {
        console.log(err);
      }) 
  }, [])

  // Changing the cell color
  const changeColor = (e: any) => {
      e.classList.toggle("cell-blue")
  }

  // Starting the game
  const startGame = () => {
    var cells = document.getElementsByClassName("cell")
    // clearing cells
    for(var i = 0; i< cells.length; i++) {
        console.log("wwewe");
        
        cells[i].className = "cell"
    }
    
    setArray(new Array(selectedField).fill(0))
    
  }




  return (
    <div className="Game container">
      <div className="game-field">
        <div className="setting-field d-flex align-items-center">
          <select onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedField(parseInt(e.target.value))
                    }} className='game-options'>
            <option value={0}> -- Default -- </option>
            {fields.map((field) => {
                return (
                  <option value={field.field} >  
                    {field.name} ({field.field}x{field.field})  
                </option>
                )
              })
            }
          </select>
          <div onClick={startGame} className="btn btn-primary start-btn ms-2">
            Start
          </div>
        </div>
        <div className="game-board">
            {array.map((el: number) => {
                var second = array.map((el: number) => {
                    return (
                        <div onMouseEnter={(e)=>{changeColor(e.target)}} className="cell"></div>
                    )
                })
                return(
                    <>
                        <div className="rows d-flex">
                            {second}
                        </div>
                    </>
                )
            })}
            
            {/* <div onMouseEnter={(e)=>{changeColor(e.target)}} className="cell"></div> */}
        </div>
      </div>
    </div>
  );
}

export default GameComponent;
