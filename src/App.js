import React from 'react';
import './App.css';
import Canvas from './component/canvas/index';

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
