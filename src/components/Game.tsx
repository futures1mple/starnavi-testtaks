import React, { useEffect, useState } from 'react';
import { Game } from '../models/game';
import '../App.css';

const GameComponent:React.FC = () => {
  const [fields, setFields] = useState<Game[]>([])
  const [selectedField, setSelectedField] = useState<number>()
  const [array, setArray] = useState<any>([])
  const [colored, setColored] = useState<any>([])
  
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
      var elements = document.getElementsByClassName("cell")
      var temp: any = [];
      
      for(var i = 0; i< elements.length; i++) {
        var id = elements[i].id
        var row = id.split("+")[0]
        var col = id.split("+")[1]
        
        if(elements[i].classList.contains("cell-blue")) {
          temp = [...temp, {row: row, col: col}]
        } 
      }
      
      setColored(temp)
      
      
  }

  // Starting the game
  const startGame = () => {
    setColored([])
    var cells = document.getElementsByClassName("cell")
    // clearing cells
    for(var i = 0; i< cells.length; i++) {
        
        cells[i].className = "cell"
    }
    
    setArray(new Array(selectedField).fill(0))
    
  }





  return (
    <div className="Game container">
      <div className="game-field col-12 d-flex flex-wrap">
        <div className="setting-field d-flex align-items-center col-12">
          <select onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedField(parseInt(e.target.value))
                    }} className='game-options'>
            <option value={0}> Pick mode </option>
            {fields.map((field, key) => {
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
        <div className="game-board me-3">
            {array.map((el: number, key: number) => {
                var index1 = key;
                var second = array.map((el: number, key: number) => {
                    var index2 = key;
                    return (
                        <div id={`${index1+1}+${index2+1}`} onMouseEnter={(e)=>{changeColor(e.target)}} className="cell"></div>
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
        <div className="hovered d-flex flex-wrap w-25">
          <h3 className="title w-100">Hovered squares</h3>
          {colored.map((elem:any) => {
            return (
              <div className="col-12 d-flex m-1">
                <div className="btn hovered-btn">
                  <span className="custom-row me-3">row: {elem.row}</span>
                  <span className="custom-col">col: {elem.col}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default GameComponent;
