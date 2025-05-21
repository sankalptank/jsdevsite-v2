import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from './cube';
import '/Users/sankalptank/Desktop/programming/J1 website v2/jsdevsite-v2/src/components/canvas.css';
import whiteImg from '/Users/sankalptank/Desktop/programming/J1 website v2/jsdevsite-v2/public/default.png';

const CanvasScene = () => {
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [swayX, setSwayX] = useState(0);
  const [swayY, setSwayY] = useState(0);
  const [cubeImg, setCubeImg] = useState('public/default.png'); // Manage cube color state
  const cubeScale = 4;
  console.log(textPosition.x,textPosition.y);
  console.log(textPosition);
  const yPos = useState(textPosition.y);
  return (
    <>
    <div className='canvas_container'
    style={{width: '100vw',
            height: '100vh'
    }}
    >
        <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Cube setTextPosition={setTextPosition} scale={[cubeScale,cubeScale,cubeScale]} swayX={swayX} swayY={swayY} img={cubeImg} />
        </Canvas>
    </div>
    <div className='bS'>
      <img src='public/j1icon.png' className='logoImg'></img>
    </div>
    <div
      style={{
        position: 'absolute',
        top: `${textPosition.y}px`,
        left: `${textPosition.x+(50*cubeScale)}px`,
        color: 'red',
      }}
    >
      <a 
      onMouseEnter={() => setSwayX(Math.PI/2)} 
      onMouseLeave={() => setSwayX(0)}
      onClick={() => {
        setSwayX(0);
      }}>
        Projects
      </a>
    </div>
    <div
      style={{
        position: 'absolute',
        top: `${textPosition.y}px`,
        left: `${(textPosition.x-200)}px`,
        color: 'red',
      }}
    >
      <a 
      onMouseEnter={() => setSwayX(-Math.PI/2)} 
      onMouseLeave={() => setSwayX(0)}
      onClick={() => {
        setSwayX(0);
      }}>
        Info
      </a>
    </div>
    <div
      style={{
        position: 'absolute',
        top: `${textPosition.y+200}px`,
        left: `${textPosition.x-15}px`,
        color: 'red',
      }}
    >
      <a 
      onMouseEnter={() => setSwayY(Math.PI/2)} 
      onMouseLeave={() => setSwayY(0)}
      onClick={() => {
        setSwayX(0);
      }}>
        Contact
      </a>
    </div>
    </>
  );
};

export default CanvasScene;
