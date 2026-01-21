import { useRef, useMemo } from 'react';
import { Text, Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CenterHub() {
  const groupRef = useRef();
  const textRef = useRef();
  const particlesRef = useRef();
  const scanLineRef = useRef();
  const energyCoreRef = useRef();
  const hologramRingsRef = useRef([]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 12 + Math.random() * 8;
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ],
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = time * 0.05;
    if (textRef.current) {
      textRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      if (textRef.current.material) textRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 10) * 0.05;
    }
    if (scanLineRef.current) {
      scanLineRef.current.rotation.y = time * 2;
      if (scanLineRef.current.material) scanLineRef.current.material.opacity = 0.3 + Math.sin(time * 4) * 0.2;
    }
    if (energyCoreRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.2;
      energyCoreRef.current.scale.setScalar(pulse);
      if (energyCoreRef.current.material) energyCoreRef.current.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.5;
    }
    hologramRingsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = time * (0.3 + i * 0.1);
        ring.rotation.z = time * (0.2 - i * 0.05);
        if (ring.material) ring.material.opacity = 0.2 + Math.sin(time * 2 + i) * 0.1;
      }
    });
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      particles.forEach((particle, i) => {
        const i3 = i * 3;
        const angle = particle.offset + time * particle.speed * 0.1;
        const radius = 12 + Math.sin(time * 0.5 + particle.offset) * 3;
        const phi = Math.acos(particle.position[2] / 20);
        const theta = Math.atan2(particle.position[1], particle.position[0]);
        positions[i3] = radius * Math.sin(phi + angle * 0.1) * Math.cos(theta + angle);
        positions[i3 + 1] = radius * Math.sin(phi + angle * 0.1) * Math.sin(theta + angle);
        positions[i3 + 2] = radius * Math.cos(phi + angle * 0.1);
      });
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.position[0];
      positions[i * 3 + 1] = p.position[1];
      positions[i * 3 + 2] = p.position[2];
    });
    return positions;
  }, [particles]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={energyCoreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text ref={textRef} position={[0, 0, 0]} fontSize={5} maxWidth={200} lineHeight={1} letterSpacing={0.15} textAlign="center" anchorX="center" anchorY="middle" font="/fonts/Orbitron-Bold.ttf">
          MUNGUTI
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} metalness={1} roughness={0.1} transparent opacity={0.9} />
        </Text>
      </Float>

      <Text position={[0.05, -0.05, -0.1]} fontSize={5} maxWidth={200} lineHeight={1} letterSpacing={0.15} textAlign="center" anchorX="center" anchorY="middle">
        MUNGUTI
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} transparent opacity={0.3} />
      </Text>

      <Text position={[0, -4, 0]} fontSize={0.9} color="#00ff00" anchorX="center" anchorY="middle" font="/fonts/RobotoMono-Regular.ttf">
        {'> CREATIVE_DEVELOPER.exe'}
        <meshStandardMaterial emissive="#00ff00" emissiveIntensity={0.5} />
      </Text>

      <mesh ref={scanLineRef} position={[0, 0, 0]}>
        <planeGeometry args={[30, 0.1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} ref={(el) => (hologramRingsRef.current[index] = el)} rotation={[(Math.PI / 4) * index, (Math.PI / 6) * index, (Math.PI / 8) * index]} position={[0, 0, 0]}>
          <torusGeometry args={[8 + index * 2, 0.15, 16, 100]} />
          <meshStandardMaterial color={index % 2 === 0 ? '#00ffff' : '#ff00ff'} emissive={index % 2 === 0 ? '#00ffff' : '#ff00ff'} emissiveIntensity={0.8} transparent opacity={0.3} wireframe={index % 2 === 1} />
        </mesh>
      ))}

      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[15, 15, 0.2, 6]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#4a9eff" emissiveIntensity={0.2} metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, -4.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[14.8, 14.8, 0.01, 6]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent opacity={0.3} wireframe />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#00ffff" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>

      <Sparkles count={100} scale={20} size={2} speed={0.3} color="#00ffff" opacity={0.5} />

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 12;
        return (
          <mesh key={`beam-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[0.1, 0.1, 20, 8]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent opacity={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}
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
