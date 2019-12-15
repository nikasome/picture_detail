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
  const [start, setStart] = useState([0, 0]);
  //let start_x = 0; //これでも動く(create rect flexible時点で)が拡張性が悪い
  //let start_y = 0;
  const [end, setEnd] = useState([0, 0]);

  function getContext() {
    //console.log(canvasRef.current);  //<canvas ... />が返ってくる
    return canvasRef.current.getContext('2d');
  }

  function startDrawing(x, y) {
    drawing.current = true;
    const ctx = getContext();
    setStart([x, y]);
    //start_x = x;
    //start_y = y;
  }

  function draw(x, y) {
    if (!drawing.current) {
      return;
    }
    const ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setEnd([x - start[0], y - start[1]]); //w, hを設定している
    ctx.strokeRect(start[0], start[1], end[0], end[1]);
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

/*
function Button() {
  const [c, setC] = useState(0);

  return <button onClick={() => setC(c + 1)}>{c}</button>;
}
*/

function App() {
  return (
    <div className="App">
      <Canvas />
      {/* <Button />  */}
    </div>
  );
}

export default App;
