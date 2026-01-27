import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function CanvasLoader() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 1.5;
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 1, 0]}>
        <torusGeometry args={[1.2, 0.12, 16, 100]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} metalness={0.5} roughness={0.2} />
      </mesh>

      <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#ffffff',
          background: 'rgba(10,14,39,0.6)',
          padding: '0.5rem 0.9rem',
          borderRadius: 8,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 600
        }}>
          Loading section...
        </div>
      </Html>
    </group>
  );
}
