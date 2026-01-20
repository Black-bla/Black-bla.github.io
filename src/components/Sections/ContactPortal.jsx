import { Html } from '@react-three/drei';

export default function ContactPortal() {
  return (
    <group position={[0, 0, 50]}>
      {/* Section title */}
      <Html position={[0, 8, 0]} center distanceFactor={15}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#8b5cf6',
          textShadow: '0 0 20px #8b5cf6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          📧 Contact
        </div>
      </Html>

      {/* Vortex ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.5, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Contact info */}
      <Html position={[0, 0, 0]} center distanceFactor={12}>
        <div style={{
          background: 'rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '20px',
          border: '2px solid #8b5cf6',
          textAlign: 'center',
          width: '400px',
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Let's Connect!
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <a href="mailto:contact@example.com" style={{
              color: '#8b5cf6',
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              📧 contact@example.com
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              color: '#8b5cf6',
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              💻 GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
              color: '#8b5cf6',
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              💼 LinkedIn
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}
