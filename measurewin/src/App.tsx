import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// var app = require('electron').remote;
var drag = require('electron-drag')
function App() {
  const [hovered, setHovered] = useState(false);
  const [pt1, setPoint1] = useState({ x: 110, y: 110 })
  const [pt2, setPoint2] = useState({ x: 0, y: 0 });
  const [currentPoint, setCurrentPoint] = useState(0);
  const [listening, setListening] = useState(false);
  const handleRef: any = React.createRef();
  useEffect(() => {
    var clear = drag('#drag-handle');
    return () => {
      clear()
    };
  }, [hovered]);
  return (
    <div className="App" onMouseUp={() => {
      setListening(false);
    }}
      onMouseMove={(evt) => {
        if (listening) {
          switch (currentPoint) {
            case 0:
              setPoint1({
                x: evt.clientX,
                y: evt.clientY
              })
              break;
            case 1:
              break;
          }
        }
        setPoint2({
          x: evt.clientX,
          y: evt.clientY
        })
      }}
      onMouseDown={(evt) => {
        setListening(true);
      }} style={{ backgroundColor: '#00000033', position: 'relative' }}>
      <div id={'drag-handle'} className="titlebar" ref={handleRef} onMouseOver={() => {
        setHovered(true);
      }} style={{
        ...({ webkitAppRegion: 'drag' } as any), position: 'absolute',
        height: 10,
        width: `100vw`,
        backgroundColor: 'red'
      }}>X = {Math.abs(pt1.x - pt2.x)}, Y = {Math.abs(pt1.y - pt2.y)}</div>
      <div id={'drag-handle'} className="titlebar" ref={handleRef} onMouseOver={() => {
        setHovered(true);
      }} style={{
        ...({ webkitAppRegion: 'drag' } as any),
        position: 'absolute',
        bottom: 40,
        height: 10,
        width: `calc(100vw - 10px)`,
        backgroundColor: 'red'
      }}>Drag me</div>
      <header className="App-header">
      </header>
      <Point point={pt1} />
      <Point point={pt2} />
      <svg id="svg">
        <line id="line" x1={pt1.x} y1={pt1.y} x2={pt2.x} y2={pt2.y} />
      </svg>
    </div >
  );
}

function Point(props: {
  point: {
    x: number,
    y: number
  }
}) {
  return <div style={{
    pointerEvents: 'none',
    height: 12,
    width: 12,
    backgroundColor: 'orange',
    position: 'absolute',
    top: props.point.y - 6,
    left: props.point.x - 6,
  }}></div>
}
// // Close app 
// document.getElementById("close").addEventListener("click", () => {

// }, false);

// Close app 
// document.getElementById("devtools").addEventListener("click", () => {
//   app.BrowserWindow.getFocusedWindow().openDevTools();
// }, false);
export default App;
