import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HolographicGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current && gridRef.current.material && gridRef.current.material.uniforms) {
      gridRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} ref={gridRef}>
      <planeGeometry args={[200, 200, 50, 50]} />
      <shaderMaterial
        wireframe
        transparent
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color('#00ffff') }
        }}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 0.5 + time) * 2.0;
            pos.z += sin(pos.y * 0.5 + time) * 2.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          varying vec2 vUv;
          void main() {
            float alpha = 1.0 - vUv.y;
            gl_FragColor = vec4(color, alpha * 0.3);
          }
        `}
      />
    </mesh>
  );
}
