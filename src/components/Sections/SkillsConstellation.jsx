import { Html } from '@react-three/drei';

export default function SkillsConstellation() {
  const skills = [
    { name: 'React', level: 0.9, color: '#61dafb' },
    { name: 'JavaScript', level: 0.95, color: '#f7df1e' },
    { name: 'TypeScript', level: 0.85, color: '#3178c6' },
    { name: 'Node.js', level: 0.8, color: '#68a063' },
    { name: 'Three.js', level: 0.75, color: '#ffffff' },
  ];

  return (
    <group position={[0, 50, 0]}>
      {/* Section title */}
      <Html position={[0, 8, 0]} center distanceFactor={15}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#f59e0b',
          textShadow: '0 0 20px #f59e0b',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          ⚡ Skills
        </div>
      </Html>

      {/* Skill orbs */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={index} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[skill.level * 2, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            <Html position={[0, -3, 0]} center distanceFactor={8}>
              <div style={{
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                textShadow: `0 0 10px ${skill.color}`,
                whiteSpace: 'nowrap',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {skill.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
