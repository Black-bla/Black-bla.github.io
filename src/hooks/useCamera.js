// Camera state & animations
import { useRef, useState } from 'react';
import { SECTION_POSITIONS } from '../utils/constants';
import gsap from 'gsap';

export default function useCamera() {
  const cameraRef = useRef();
  const [currentSection, setCurrentSection] = useState('hub');

  const flyToSection = (sectionKey) => {
    const target = SECTION_POSITIONS[sectionKey];
    if (!target || !cameraRef.current) return;
    
    // Calculate camera position based on section
    let cameraPos = { x: 0, y: 5, z: 30 };
    
    if (sectionKey !== 'hub') {
      // Position camera to focus on the selected section
      const [targetX, targetY, targetZ] = target.position;
      const distance = 25;
      
      // Calculate angle to position camera
      const angle = Math.atan2(targetZ, targetX);
      cameraPos = {
        x: targetX + Math.cos(angle + Math.PI) * distance,
        y: targetY + 5,
        z: targetZ + Math.sin(angle + Math.PI) * distance,
      };
    }
    
    // Animate camera with rotation
    gsap.to(cameraRef.current.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: 2,
      ease: 'power2.inOut',
    });
    
    setCurrentSection(sectionKey);
  };

  return { cameraRef, flyToSection, currentSection };
}
