import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function LightingRig() {
  const light1Ref = useRef();
  const light2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.5) * 20;
      light1Ref.current.position.z = Math.cos(time * 0.5) * 20;
    }
    
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.3) * 25;
      light2Ref.current.position.z = Math.sin(time * 0.3) * 25;
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      
      {/* Colored accent lights that move */}
      <pointLight
        ref={light1Ref}
        position={[20, 10, 20]}
        intensity={1.5}
        distance={50}
        color="#4a9eff"
      />
      
      <pointLight
        ref={light2Ref}
        position={[-20, 10, -20]}
        intensity={1.5}
        distance={50}
        color="#9333ea"
      />
      
      {/* Subtle fill light from below */}
      <pointLight
        position={[0, -10, 0]}
        intensity={0.5}
        distance={40}
        color="#f59e0b"
      />
    </>
  );
}
