import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, Stars, PerspectiveCamera, Preload, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

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
        powerPreference: 'high-performance',
        toneMapping: 3,
        toneMappingExposure: 1.2
      }}
      dpr={[1, 2]}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 5, 30]} fov={75} />

      {/* Non-suspending scene primitives: render immediately so the canvas isn't blank while models load */}
      <ambientLight intensity={0.1} color="#0a0e27" />

      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ffff" castShadow shadow-mapSize={[2048, 2048]} />

      <directionalLight position={[-10, 5, -5]} intensity={1} color="#ff00ff" />

      <pointLight position={[0, -10, 0]} intensity={0.5} color="#4a9eff" distance={50} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      <fog attach="fog" args={["#0a0e27", 30, 100]} />

      <Environment preset="night" />

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

      {/* Render children directly; suspenders should be wrapped individually by the caller to avoid hiding the whole scene */}
      {children}

      <Preload all />

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />

        <ChromaticAberration offset={[0.002, 0.002]} radialModulation modulationOffset={0.5} />

        <Vignette offset={0.3} darkness={0.5} eskil={false} blendFunction={BlendFunction.NORMAL} />

        <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </Canvas>
  );
}
