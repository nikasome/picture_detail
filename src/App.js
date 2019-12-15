import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import testImage from './picture/yuushou.png';

const style = {
  border: '1px solid gray'
};

function Canvas() {
  const isFirstLoad = useRef(true);
  const drawing = useRef(false); //State更新には直接関係しないのでuseRef
  // 画像と図形のcanvasを分ける
  const imageRef = useRef();
  const canvasRef = useRef();
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);

  useEffect(() => {
    // 初回のみcanvasの背景に画像をセット
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      const backImage = new Image();
      backImage.src = testImage;
      console.log(backImage); //<img src="..." />が出力される
      // 画像読み込みまで時間が掛かるためonloadを付ける
      backImage.onload = () => {
        //console.log(backImage);
        console.log(backImage.naturalWidth, backImage.naturalHeight);
        imageRef.current.width = backImage.naturalWidth;
        imageRef.current.height = backImage.naturalHeight;
        canvasRef.current.width = backImage.naturalWidth;
        canvasRef.current.height = backImage.naturalHeight;
        const image_ctx = getContext(imageRef);
        image_ctx.drawImage(
          backImage,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        /*
        const rect_ctx = getContext();
        rect_ctx.fillStyle = 'rgba(216, 216, 216, 0.5)';
        rect_ctx.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        */
      };
    }
    //console.log('moved useEffect');
  });

  function getContext(ref = canvasRef) {
    const ctx = ref.current.getContext('2d');
    ctx.lineWidth = 3;
    return ctx;
  }

  function startDrawing(x, y) {
    drawing.current = true;
    const ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeRect(x, y, 10, 10);
    setStart([x, y]);
    setEnd([10, 10]);
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
    const ctx = getContext();
    ctx.fillStyle = 'rgba(216, 216, 216, 0.9)';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.clearRect(start[0], start[1], end[0], end[1]);
    ctx.strokeRect(start[0], start[1], end[0], end[1]);
  }

  return (
    <div className="canvas-wrapper">
      <canvas ref={imageRef} style={style} />
      <canvas
        ref={canvasRef}
        onMouseDown={e =>
          startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        onMouseUp={() => endDrawing()}
        onMouseLeave={() => console.log('MouseLeaved')}
        onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        style={style}
      />
    </div>
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
