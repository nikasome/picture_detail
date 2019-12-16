import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import testImage from '../../picture/yuushou.png';

function Canvas() {
  //State更新には直接関係しないのでuseRefを使用
  const isFirstLoad = useRef(true); //画像セットのための初回起動かどうか判別するフラグ
  const isDrawing = useRef(false); //Rect描画中かどうか判別するフラグ
  //const canEdit = useRef(props) //編集画面かどうか判別するフラグ
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
      //console.log(backImage); //<img src="..." />が出力される
      backImage.onload = () => {
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
    isDrawing.current = true;
    const ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeRect(x, y, 10, 10);
    setStart([x, y]);
    setEnd([10, 10]);
  }

  function draw(x, y) {
    if (!isDrawing.current) {
      return;
    }
    const ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setEnd([x - start[0], y - start[1]]); //w, hの設定
    ctx.strokeRect(start[0], start[1], end[0], end[1]);
  }

  function endDrawing() {
    isDrawing.current = false;
    const ctx = getContext();
    ctx.fillStyle = 'rgba(216, 216, 216, 0.9)';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.clearRect(start[0], start[1], end[0], end[1]);
    ctx.strokeRect(start[0], start[1], end[0], end[1]);
  }

  return (
    <div className="canvas-wrapper">
      <canvas ref={imageRef} />
      <canvas
        ref={canvasRef}
        onMouseDown={e =>
          startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        onMouseUp={() => endDrawing()}
        onMouseLeave={() => console.log('MouseLeaved')}
        onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      />
    </div>
  );
}

export default Canvas;
