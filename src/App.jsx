import MainCanvas from './components/Canvas/MainCanvas';
import { Suspense } from 'react';
import CanvasLoader from './components/Shared/CanvasLoader';
import CameraController from './components/Canvas/CameraController';
import CenterHub from './components/Sections/CenterHub';
import ProjectsQuadrant from './components/Sections/ProjectsQuadrant';
import AboutZone from './components/Sections/AboutZone';
import SkillsConstellation from './components/Sections/SkillsConstellation';
import TimelineDimension from './components/Sections/TimelineDimension';
import ContactPortal from './components/Sections/ContactPortal';
import PortalGateways from './components/Navigation/PortalGateways';
import ParticleSystem from './components/Effects/ParticleSystem';
import LightingRig from './components/Effects/LightingRig';
import MiniMap from './components/Navigation/MiniMap';
import useCamera from './hooks/useCamera';
import './styles/globals.css';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import HolographicGrid from './components/Effects/HolographicGrid';
import DataStreams from './components/Effects/DataStreams';
import PostProcessing from './components/Canvas/PostProcessing';

export default function App() {
  const { cameraRef, flyToSection, currentSection } = useCamera();

  return (
    <ErrorBoundary>
      <>
      {/* Mini-map navigation */}
      <MiniMap currentSection={currentSection} onNavigate={flyToSection} />
      
      {/* Home button - always visible */}
      {currentSection !== 'hub' && (
        <button
          onClick={() => flyToSection('hub')}
          style={{
            position: 'fixed',
            top: '2rem',
            left: '2rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(74, 158, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(74, 158, 255, 0.5)',
            borderRadius: '50px',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            zIndex: 100,
            transition: 'all 0.3s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(74, 158, 255, 0.4)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(74, 158, 255, 0.2)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🏠</span> Home
        </button>
      )}
      
      {/* Current section indicator */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '0.75rem 1.5rem',
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        color: '#ffffff',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: 100,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        {currentSection === 'hub' ? '🌟 Welcome' : `📍 ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}`}
      </div>

      {/* Tagline overlay - only show on hub */}
      {currentSection === 'hub' && (
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          pointerEvents: 'none'
        }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 300, margin: 0 }}>
            Exploring the infinite canvas of creativity
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 400, margin: '0.5rem 0 0 0', color: 'rgba(255, 255, 255, 0.6)' }}>
            Click any portal to explore
          </p>
        </div>
      )}

      <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 200, padding: '6px 10px', background: 'rgba(255,0,0,0.08)', color: '#fff', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600 }}>
        Debug: App mounted
      </div>

      <MainCanvas>
        <CameraController cameraRef={cameraRef} section={currentSection} />
        <LightingRig />
        <ParticleSystem />
        <HolographicGrid />
        <DataStreams count={30} />
        <CenterHub />
        <PortalGateways onPortalClick={flyToSection} currentSection={currentSection} />
        <ProjectsQuadrant />
        <Suspense fallback={<CanvasLoader />}>
          <AboutZone />
        </Suspense>
        <SkillsConstellation />
        <TimelineDimension />
        <ContactPortal />
        <PostProcessing />
      </MainCanvas>
      </>
    </ErrorBoundary>
  );
}
