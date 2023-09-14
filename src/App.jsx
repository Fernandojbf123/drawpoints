import { useState } from "react"


function App() {
  
  let [points, setPoints] = useState([]);
  let [memory, setMemory] = useState([]);

  function handleClick (e) {
    const x = Number(e.clientX);
    const y = Number(e.clientY);
    const id = generateID();
    setPoints([...points, {id, x, y}])
  }

  function handleUndo () {
    if (points.length === 0) {
      return
    }
    let {id,x,y} = points[points.length-1]; //ultimo elemento
    let updatedPoints = points.filter ( point => point.id != id) 
    setPoints([...updatedPoints])
    
    setMemory([...memory, {id, x, y}]) //guardar en memoria el último elemento borrado
  }

  function handleRedo () {
    if (memory.length===0) {
      return
    }
    let {id, x, y} = memory[memory.length-1]; //elemento en memoria de la última posición
    let updatedPoints = [...points, {id,x,y}] // agregar el ultimo elemento en memoria
    setPoints([...updatedPoints])

    let updatedMemory = memory.filter( ele => ele.id != id)
    setMemory([...updatedMemory])
  }



  function generateID () {
    const random = Math.random().toString(36).substr(2);
    const date   = Date.now().toString(36)
    return random + date;
}

  return (
   <main id="main">
      <header id="header">
        <button onClick={handleUndo}>{`undo`}</button>
        <button onClick={handleRedo}>{`redo`}</button>
      </header>

      <div id="canvas" onClick={handleClick}>
        {points?.length> 0 ? (
          points.map ( point => (
            <div
              id="point"
              key={point.id}
              style={{top: `${point.y}px`, left:`${point.x}px`}}
            >
            </div>
          ))
        ):(
          null
        )}
      </div>

   </main>
  )
}

export default App
