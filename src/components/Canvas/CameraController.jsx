
import { useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SECTION_POSITIONS } from '../../utils/constants';

export default function CameraController({ cameraRef, section = 'hub' }) {
  const localRef = useRef();
  
  useEffect(() => {
    if (cameraRef && localRef.current) {
      cameraRef.current = localRef.current;
    }
  }, [cameraRef]);

  // Look at the current section position every frame
  useFrame(() => {
    if (localRef.current) {
      const pos = SECTION_POSITIONS[section]?.position || [0, 0, 0];
      localRef.current.lookAt(...pos);
    }
  });

  return (
    <PerspectiveCamera
      ref={localRef}
      makeDefault
      fov={75}
      position={[0, 5, 30]}
      far={1000}
    />
  );
}
