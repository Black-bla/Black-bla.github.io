import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function CenterHub() {
  const groupRef = useRef();
  const textRef = useRef();

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    if (textRef.current) {
      // Subtle floating effect
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Text for name */}
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={4}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        MUNGUTI
        <meshStandardMaterial
          color="#ffffff"
          emissive="#4a9eff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text>

      {/* Subtitle/tagline */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.8}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        Creative Developer & Designer
      </Text>

      {/* Orbiting rings for visual interest */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[8, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#4a9eff"
          emissive="#4a9eff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]} position={[0, 0, 0]}>
        <torusGeometry args={[10, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#9333ea"
          emissive="#9333ea"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
