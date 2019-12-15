import React, { useState } from 'react';
import './App.css';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white'
};

function Canvas() {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = React.createRef();

  function getContext() {
    return canvasRef.current.getContext('2d');
  }

  function startDrawing(x, y) {
    setDrawing(true);
    const ctx = getContext();
    ctx.moveTo(x, y);
  }

  function draw(x, y) {
    if (!drawing) {
      return;
    }
    const ctx = getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function endDrawing() {
    setDrawing(false);
  }

  return (
    <canvas
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

function App() {
  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
