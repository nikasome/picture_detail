import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import testImage from './picture/yuushou.png';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white'
};

function Canvas() {
  const isFirstLoad = useRef(true);
  const drawing = useRef(false); //描画には直接関係しないのでuseRef
  const canvasRef = useRef();
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const backImage = new Image();
      backImage.src = testImage;
      console.log(backImage); //<img src="..." />が出力される
      backImage.onload = () => {
        //console.log(backImage);
        console.log(backImage.naturalWidth, backImage.naturalHeight);
        canvasRef.current.width = backImage.naturalWidth;
        canvasRef.current.height = backImage.naturalHeight;
        const ctx = getContext();
        ctx.drawImage(
          backImage,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      };
    }
    //console.log('moved useEffect');
  });

  function getContext() {
    return canvasRef.current.getContext('2d');
  }

  function startDrawing(x, y) {
    drawing.current = true;
    const ctx = getContext();
    setStart([x, y]);
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
