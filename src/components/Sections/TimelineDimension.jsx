import { Html, Line } from '@react-three/drei';

export default function TimelineDimension() {
  const timeline = [
    { year: '2024', title: 'Senior Developer', company: 'Tech Corp' },
    { year: '2022', title: 'Full Stack Dev', company: 'StartUp Inc' },
    { year: '2020', title: 'Junior Developer', company: 'Code Agency' },
  ];

  return (
    <group position={[0, -50, 0]}>
      {/* Section title */}
      <Html position={[0, 8, 0]} center distanceFactor={15}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#ec4899',
          textShadow: '0 0 20px #ec4899',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          📅 Timeline
        </div>
      </Html>

      {/* Timeline path */}
      <Line
        points={timeline.map((_, i) => [(i - 1) * 8, 0, 0])}
        color="#ec4899"
        lineWidth={2}
      />

      {/* Timeline markers */}
      {timeline.map((event, index) => (
        <group key={index} position={[(index - 1) * 8, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={0.8}
            />
          </mesh>
          
          <Html position={[0, -2.5, 0]} center distanceFactor={10}>
            <div style={{
              background: 'rgba(236, 72, 153, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '12px',
              border: '2px solid #ec4899',
              textAlign: 'center',
              width: '200px',
            }}>
              <div style={{
                color: '#ec4899',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {event.year}
              </div>
              <div style={{
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.25rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {event.title}
              </div>
              <div style={{
                color: '#cccccc',
                fontSize: '0.9rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {event.company}
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
