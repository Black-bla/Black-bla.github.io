import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DataStreams({ count = 50 }) {
  const meshRef = useRef();

  const streams = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 100,
      z: (Math.random() - 0.5) * 100,
      speed: 0.5 + Math.random() * 1.5,
      height: 20 + Math.random() * 30
    }));
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.children.forEach((stream, i) => {
        stream.position.y -= streams[i].speed * 0.1;
        if (stream.position.y < -50) {
          stream.position.y = 50;
        }
      });
    }
  });

  return (
    <group ref={meshRef}>
      {streams.map((stream, i) => (
        <mesh key={i} position={[stream.x, 50, stream.z]}>
          <cylinderGeometry args={[0.05, 0.05, stream.height, 8]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
