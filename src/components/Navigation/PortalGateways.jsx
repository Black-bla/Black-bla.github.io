import { useRef, useState } from 'react';
import { Html, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SECTION_POSITIONS } from '../../utils/constants';

export default function PortalGateways({ onPortalClick, currentSection }) {
  const portals = [
    { key: 'projects', color: '#3b82f6', label: 'Projects', icon: '💼', description: 'View my work', angle: 0 },
    { key: 'about', color: '#10b981', label: 'About', icon: '👤', description: 'Learn about me', angle: Math.PI * 0.4 },
    { key: 'skills', color: '#f59e0b', label: 'Skills', icon: '⚡', description: 'My expertise', angle: Math.PI * 0.8 },
    { key: 'timeline', color: '#ec4899', label: 'Timeline', icon: '📅', description: 'My journey', angle: Math.PI * 1.2 },
    { key: 'contact', color: '#8b5cf6', label: 'Contact', icon: '📧', description: 'Get in touch', angle: Math.PI * 1.6 },
  ];

  return (
    <group>
      {portals.map((portal) => (
        <PortalRing
          key={portal.key}
          sectionKey={portal.key}
          color={portal.color}
          label={portal.label}
          icon={portal.icon}
          description={portal.description}
          angle={portal.angle}
          onPortalClick={onPortalClick}
          isActive={currentSection === portal.key}
        />
      ))}
    </group>
  );
}

function PortalRing({ sectionKey, color, label, icon, description, angle, onPortalClick, isActive }) {
  const meshRef = useRef();
  const lineRef = useRef();
  const [hovered, setHovered] = useState(false);
  const radius = 15;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Scale on hover or active
      const targetScale = (hovered || isActive) ? 1.3 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Connecting line from center to portal */}
      <Line
        points={[[0, 0, 0], [-x, 0, -z]]}
        color={isActive ? color : '#ffffff'}
        lineWidth={isActive ? 2 : 1}
        transparent
        opacity={isActive ? 0.8 : 0.3}
        dashed={!isActive}
        dashScale={50}
        dashSize={0.5}
        gapSize={0.3}
      />

      <mesh
        ref={meshRef}
        onClick={() => onPortalClick && onPortalClick(sectionKey)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusGeometry args={[2, 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={(hovered || isActive) ? 1.2 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={(hovered || isActive) ? 1.5 : 0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Portal label with icon */}
      <Html
        position={[0, -3.5, 0]}
        center
        distanceFactor={8}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'all 0.3s ease',
          opacity: (hovered || isActive) ? 1 : 0.7,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            background: (hovered || isActive) ? `${color}22` : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}44`,
          }}
        >
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.25rem',
          }}>
            {icon}
          </div>
          <div
            style={{
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginBottom: '0.25rem',
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: '#cccccc',
              fontSize: '0.75rem',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {description}
          </div>
        </div>
      </Html>
    </group>
  );
}
