import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

export default function PerformanceToggle() {
  const { performanceMode, setPerformanceMode } = useContext(SettingsContext);

  return (
    <div style={{ position: 'fixed', bottom: 16, left: 16, zIndex: 300 }}>
      <button
        onClick={() => setPerformanceMode(performanceMode === 'high' ? 'low' : 'high')}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.08)',
          fontWeight: 700,
        }}
      >
        {performanceMode === 'high' ? 'Performance: High' : 'Performance: Low'}
      </button>
    </div>
  );
}
