import { Html, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

// Static import of the user's GLB file. The user provided `about.glb` at:
// `src/assets/models/workspace-items/about.glb` — Vite will return a URL string.
// The model file present in the repo is named `ABOUT.glb` (uppercase).
// Import using the exact filename so Vite resolves it correctly.
import aboutGLB from '../../assets/models/workspace-items/ABOUT.glb';

export default function AboutZone() {
  const group = useRef();

  // Call the hook unconditionally; Canvas children are wrapped in Suspense.
  const gltf = useGLTF(aboutGLB);

  return (
    <group position={[-50, 0, 0]} ref={group}>
      {/* Section title */}
      <Html position={[0, 8, 0]} center distanceFactor={15}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#10b981',
          textShadow: '0 0 20px #10b981',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          👤 About Me
        </div>
      </Html>

      {gltf && gltf.scene ? (
        // Render the imported GLB scene. Adjust scale/rotation/position as needed.
        <primitive object={gltf.scene} position={[0, -1, 0]} scale={1.5} />
      ) : (
        // Fallback: simple card with text (visible if GLB not found)
        <>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[12, 8, 0.5]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.3}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>

          <Html position={[0, 0, 0.3]} center distanceFactor={12}>
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              width: '400px',
            }}>
              <p style={{
                color: '#ffffff',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                Passionate developer and designer creating innovative digital experiences. 
                Focused on building user-centric solutions with modern technologies.
              </p>
            </div>
          </Html>
        </>
      )}

    </group>
  );
}
