import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

export default function MainCanvas({ children }) {
  return (
    <Canvas
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0, 
        background: 'linear-gradient(to bottom, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)'
      }}
      gl={{ 
        antialias: true, 
        alpha: false, 
        powerPreference: 'high-performance'
      }}
      camera={{ position: [0, 5, 30], fov: 75, near: 0.1, far: 1000 }}
      shadows
    >
      <Suspense fallback={null}>
        {children}
        {/* Add orbit controls for panning and rotation */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxDistance={100}
          minDistance={10}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          panSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}
