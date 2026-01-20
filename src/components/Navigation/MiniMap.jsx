import { SECTION_POSITIONS } from '../../utils/constants';

export default function MiniMap({ currentSection, onNavigate }) {
  const sections = Object.keys(SECTION_POSITIONS);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'rgba(10, 14, 39, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(74, 158, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    }}>
      {sections.map((section, index) => {
        const angle = (index / sections.length) * Math.PI * 2;
        const radius = 45;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = section === currentSection;

        return (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              width: isActive ? '14px' : '10px',
              height: isActive ? '14px' : '10px',
              borderRadius: '50%',
              background: isActive ? '#4a9eff' : '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isActive 
                ? '0 0 20px rgba(74, 158, 255, 0.8), 0 0 10px rgba(74, 158, 255, 0.6)' 
                : '0 0 10px rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
              zIndex: isActive ? 2 : 1,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
            title={SECTION_POSITIONS[section]?.name || section}
          />
        );
      })}

      {/* Center dot representing current position */}
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#f59e0b',
        boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
        position: 'absolute',
      }} />
    </div>
  );
}
