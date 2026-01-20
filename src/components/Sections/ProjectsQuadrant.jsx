import { Html } from '@react-three/drei';

export default function ProjectsQuadrant() {
  const projects = [
    { title: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', color: '#3b82f6' },
    { title: 'Mobile App', tech: 'React Native, Firebase', color: '#10b981' },
    { title: 'Analytics Dashboard', tech: 'Next.js, D3.js', color: '#f59e0b' },
  ];

  return (
    <group position={[50, 0, 0]}>
      {/* Section title */}
      <Html position={[0, 8, 0]} center distanceFactor={15}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#3b82f6',
          textShadow: '0 0 20px #3b82f6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          💼 Projects
        </div>
      </Html>

      {/* Project cards */}
      {projects.map((project, index) => (
        <group key={index} position={[(index - 1) * 8, 0, 0]}>
          <mesh>
            <boxGeometry args={[6, 8, 0.5]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={0.3}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
          
          <Html position={[0, 0, 0.3]} center distanceFactor={10}>
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              width: '200px',
            }}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {project.title}
              </h3>
              <p style={{
                color: '#cccccc',
                fontSize: '0.9rem',
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {project.tech}
              </p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
