import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';

localStorage.setItem('swayX', 0);
localStorage.setItem('swayY', 0);



function Cube({ position = [posX, posY, 0], setTextPosition, img='src/assets/default.png', scale = [2.6, 2.6, 2.6], swayX = 0, swayY = 0, posX = 0, posY = 0, opacityVal = 100, rotBack = true}) {
    const meshRef = useRef();

    
    // Load texture
    const texture = useLoader(THREE.TextureLoader, img); 

    useFrame(({ camera }, delta) => {
        const clampedDelta = Math.min(delta, 0.1); // prevents extreme jumps cause frame (delta) changes when tabbed out
        meshRef.current.material.opacity = localStorage.getItem('opacity');

        meshRef.current.position.x = localStorage.getItem("posX");
        meshRef.current.position.y = localStorage.getItem("posY");
        meshRef.current.rotation.y = localStorage.getItem("rotY");
        meshRef.current.rotation.x = localStorage.getItem("rotX");



        console.log('opacity:',opacityVal)


        const worldPosition = new THREE.Vector3();
        const screenPosition = worldPosition.clone().project(camera);
        const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
        meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, opacityVal, clampedDelta * 10); // Lerp opacity


        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, posX, clampedDelta * 5);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, posY, clampedDelta * 5);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, swayX, clampedDelta * 5);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, swayY, clampedDelta * 5); //swayx goes to rot y and vise versa dont question it

        localStorage.setItem('opacity', meshRef.current.material.opacity);

        localStorage.setItem('posX', meshRef.current.position.x);
        localStorage.setItem('posY', meshRef.current.position.y);
        if (rotBack){
            localStorage.setItem('rotY', meshRef.current.rotation.y);
            localStorage.setItem('rotX', meshRef.current.rotation.x);
        };

        setTextPosition({ x: x + 50, y: y - 50 });
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={scale} />
            <meshStandardMaterial map={texture} opacity={opacityVal/100} transparent={true} />
        </mesh>
    );
}

export default Cube;
