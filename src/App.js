import React, { useState, useRef } from 'react';
import './App.css';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white'
};

function Canvas() {
  //const [drawing, setDrawing] = useState(false);
  const drawing = useRef(false); //描画には直接関係しないのでuseRef
  const canvasRef = useRef();
  const [start_x, setX] = useState(0);
  //let start_x = 0; //これでも動く(create rect flexible時点で)が拡張性が悪い
  const [start_y, setY] = useState(0);
  //let start_y = 0;

  function getContext() {
    //console.log(canvasRef.current);  //<canvas ... />が返ってくる
    return canvasRef.current.getContext('2d');
  }

  function startDrawing(x, y) {
    drawing.current = true;
    const ctx = getContext();
    setX(x);
    //start_x = x;
    setY(y);
    //start_y = y;
  }

  function draw(x, y) {
    if (!drawing.current) {
      return;
    }
    const ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeRect(start_x, start_y, x - start_x, y - start_y);
  }

  function endDrawing() {
    drawing.current = false;
    //setDrawing(false);
  }

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width="500px"
      height="500px"
      onMouseDown={e =>
        startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      }
      onMouseUp={() => endDrawing()}
      onMouseLeave={() => endDrawing()}
      onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      style={style}
    />
  );
}

function Button() {
  const [c, setC] = useState(0);

  return <button onClick={() => setC(c + 1)}>{c}</button>;
}

function App() {
  return (
    <div className="App">
      <Canvas />
      <Button />
    </div>
  );
}

export default App;
