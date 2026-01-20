# COMPLETE TECHNICAL SPECIFICATION: INFINITE CANVAS PORTFOLIO

## OVERVIEW
Build a **single-page React application** where the entire portfolio exists as an explorable 3D/2D space rendered on one continuous WebGL canvas using Three.js. There are NO traditional page routes or scroll behavior. Instead, users navigate by **clicking navigation elements that trigger smooth camera movements** to fly between different spatial sections of the portfolio.

---

## CORE TECHNICAL FOUNDATION

### Canvas Setup
- **Full viewport WebGL canvas** using `@react-three/fiber` (React Three Fiber) covering 100vw x 100vh
- Canvas remains fixed, camera moves to show different sections
- All portfolio sections exist as 3D objects positioned at different coordinates in 3D space
- Use `@react-three/drei` for helpers (OrbitControls, PerspectiveCamera, etc.)
- Enable `antialias`, `alpha`, and set `toneMapping` for visual quality

### Coordinate System & Layout
Imagine the space as a large 3D grid. Define section positions like this:
- **Center Hub**: `position={[0, 0, 0]}` - The starting point
- **Projects Quadrant**: `position={[50, 0, 0]}` - To the right
- **About Zone**: `position={[-50, 0, 0]}` - To the left  
- **Skills Constellation**: `position={[0, 50, 0]}` - Above
- **Timeline Dimension**: `position={[0, -50, 0]}` - Below
- **Contact Portal**: `position={[0, 0, 50]}` - Forward in Z-axis

All positions stored in `src/utils/constants.js` as:
```javascript
export const SECTION_POSITIONS = {
  hub: { position: [0, 0, 0], name: "Home" },
  projects: { position: [50, 0, 0], name: "Projects" },
  about: { position: [-50, 0, 0], name: "About" },
  skills: { position: [0, 50, 0], name: "Skills" },
  timeline: { position: [0, -50, 0], name: "Experience" },
  contact: { position: [0, 0, 50], name: "Contact" }
}
```

---

## CAMERA SYSTEM (CRITICAL COMPONENT)

### Camera Controller Hook (`useCamera.js`)
```javascript
// Manages camera position and animated transitions
const useCamera = () => {
  const cameraRef = useRef()
  const [currentSection, setCurrentSection] = useState('hub')
  
  const flyToSection = (sectionKey) => {
    const target = SECTION_POSITIONS[sectionKey]
    // Use GSAP to animate camera position
    gsap.to(cameraRef.current.position, {
      x: target.position[0],
      y: target.position[1], 
      z: target.position[2] + 20, // Offset camera back from target
      duration: 2,
      ease: "power2.inOut"
    })
    // Also animate camera lookAt
    gsap.to(cameraRef.current.rotation, {
      // Calculate rotation to look at target
      duration: 2,
      ease: "power2.inOut"
    })
  }
  
  return { cameraRef, flyToSection, currentSection }
}
```

### Camera Component (`CameraController.jsx`)
- Use `<PerspectiveCamera>` from drei with `fov={75}` and `far={1000}`
- Initial position: `[0, 0, 30]` looking at origin `[0, 0, 0]`
- Attach ref from `useCamera` hook
- On every frame, use `camera.lookAt()` to keep focused on current section center
- Optional: Add slight mouse parallax (camera position offsets ±2 units based on mouse)

---

## NAVIGATION SYSTEM

### Mini-Map Component (`MiniMap.jsx`)
**Visual**: Small circular radar in bottom-right corner (100px diameter), semi-transparent dark background with glassmorphism blur.

**Content**: 
- White dot at center representing current position
- Colored dots around the circle for each section (calculate angles to space them evenly)
- Each dot pulses gently (scale animation 1 → 1.2 → 1)
- Distance rings fade outward from center
- Section names appear on hover

**Interaction**:
```javascript
const handleDotClick = (sectionKey) => {
  flyToSection(sectionKey) // From camera hook
  playSound('whoosh') // Optional
}
```

**Styling**: Use Tailwind for the UI layer overlaid on canvas:
```jsx
<div className="fixed bottom-6 right-6 w-28 h-28 rounded-full bg-gray-900/40 backdrop-blur-md border border-white/20">
  {/* Render dots with absolute positioning */}
</div>
```

### Portal Gateways (`PortalGateways.jsx`)
**Visual**: At the Center Hub section, render 5 floating portal rings around the central name element.

Each portal is a **3D torus geometry** (donut shape):
```jsx
<mesh position={[15, 0, 0]} rotation={[0, Math.PI/2, 0]}>
  <torusGeometry args={[3, 0.3, 16, 100]} />
  <meshStandardMaterial 
    color={portalColor} 
    emissive={portalColor} 
    emissiveIntensity={0.5}
  />
</mesh>
```

**Animation**: Each portal slowly rotates on its Y-axis using `useFrame`:
```javascript
useFrame((state) => {
  meshRef.current.rotation.y += 0.01
})
```

**Hover Effect**: On hover (using raycasting), portal scales up 1.2x and emissive intensity increases to 1.0

**Click Behavior**: When clicked, triggers `flyToSection(linkedSection)`

**Portal Positioning**: Arrange in a circle around origin:
```javascript
const angle = (index / totalPortals) * Math.PI * 2
const x = Math.cos(angle) * 15
const z = Math.sin(angle) * 15
```

---

## SECTIONS DETAILED BREAKDOWN

### 1. CENTER HUB (`CenterHub.jsx`)

**3D Name Display**:
```jsx
<Text3D 
  font="/fonts/helvetiker_bold.typeface.json"
  size={5}
  height={0.5}
  position={[0, 5, 0]}
>
  YOUR NAME
  <meshStandardMaterial 
    color="#00ffff" 
    emissive="#00ffff" 
    emissiveIntensity={0.3}
  />
</Text3D>
```

**Gradient Effect**: Animate material color cycling through HSL values in `useFrame`

**Orbiting Particles**: Create `<Points>` geometry with 1000 particles in a sphere around the name:
```javascript
const particles = useMemo(() => {
  const positions = new Float32Array(1000 * 3)
  for(let i = 0; i < 1000; i++) {
    const radius = 10 + Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    positions[i*3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i*3+2] = radius * Math.cos(phi)
  }
  return positions
}, [])
```

**Portal Gateways**: Render the 5 portals positioned around this hub

**Tagline**: Use HTML overlay (Drei's `<Html>` component) to show text below the 3D name:
```jsx
<Html position={[0, 0, 0]} center>
  <div className="text-2xl text-white font-light">
    Developer → Designer → Creator
  </div>
</Html>
```

---

### 2. PROJECTS QUADRANT (`ProjectsQuadrant.jsx`)

**Layout**: When camera arrives at position `[50, 0, 0]`, render 6-8 project cards floating in 3D space at varying Z-depths (-10 to +10).

**Project Card Component** (`ProjectCard3D.jsx`):
```jsx
<group position={cardPosition}>
  {/* Card plane */}
  <mesh>
    <planeGeometry args={[8, 10]} />
    <meshStandardMaterial>
      <videoTexture attach="map" args={[videoElement]} />
    </meshStandardMaterial>
  </mesh>
  
  {/* Title text */}
  <Html position={[0, -6, 0]} center>
    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded">
      <h3 className="text-white font-bold">Project Name</h3>
      <p className="text-gray-300 text-sm">Tech: React, Three.js</p>
    </div>
  </Html>
</group>
```

**Video Texture**: Each card shows an auto-playing video preview:
```javascript
const video = document.createElement('video')
video.src = project.videoUrl
video.loop = true
video.muted = true
video.play()
```

**Hover Effect**: 
- Card scales to 1.1x
- Moves 2 units toward camera (z += 2)
- Adds glow outline using `<Outlines>` from drei

**Click Behavior**: 
- Other cards fade to 20% opacity
- Clicked card flies to center of view and scales to 1.5x
- Overlay modal appears with project details, gallery, and "Visit Site" button
- Modal is HTML overlay with blur background

**Mouse Drag Rotation**: Use `OrbitControls` but limit to rotation only (no pan/zoom) so user can spin the entire project gallery

---

### 3. ABOUT ZONE (`AboutZone.jsx`)

**Concept**: A low-poly 3D workspace scene rendered at position `[-50, 0, 0]`

**3D Objects**:
- **Desk**: Box geometry `[10, 0.5, 5]` with wood texture
- **Computer**: Smaller boxes arranged as monitor + keyboard
- **Book**: When clicked, opens (rotate animation) and shows bio text on pages
- **Coffee Cup**: Hovers slightly, steam particles rise from it
- **Photos**: Floating plane geometries showing personal photos, hovering above desk
- **Lamp**: Emits point light, can be clicked to toggle

**Interactive Objects**:
```javascript
const handleObjectClick = (objectType) => {
  switch(objectType) {
    case 'book':
      // Animate book opening
      gsap.to(bookRef.current.rotation, { x: Math.PI/4, duration: 1 })
      // Show bio text overlay
      setShowBio(true)
      break
    case 'computer':
      // Screen lights up showing tech stack icons
      break
    case 'photo':
      // Enlarges and shows story caption
      break
  }
}
```

**Camera Angle**: When arriving, camera positions at `[-50, 5, 20]` looking down at desk at slight angle

**Ambient Lighting**: Warm orange point light from lamp, soft ambient light overall

---

### 4. SKILLS CONSTELLATION (`SkillsConstellation.jsx`)

**Layout**: At position `[0, 50, 0]`, render 20-30 skill orbs scattered in 3D space in a spherical volume (radius 15 units from center)

**Skill Orb Component** (`SkillOrb.jsx`):
```jsx
<group position={orbPosition}>
  <mesh ref={orbRef}>
    <sphereGeometry args={[skillLevel * 0.3 + 0.5, 32, 32]} />
    <meshStandardMaterial
      color={skillColor}
      emissive={skillColor}
      emissiveIntensity={0.5}
      roughness={0.3}
      metalness={0.7}
    />
  </mesh>
  
  <Html center>
    <div className="text-white text-sm font-semibold whitespace-nowrap">
      {skillName}
    </div>
  </Html>
</group>
```

**Orb Sizing**: Skill proficiency determines sphere radius (beginner: 0.5, expert: 1.5)

**Pulsing Animation**:
```javascript
useFrame((state) => {
  orbRef.current.scale.setScalar(
    1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
  )
})
```

**Connection Lines**: When hovering an orb, draw lines to related skills:
```jsx
{hoveredSkill && relatedSkills.map(related => (
  <Line
    points={[orbPosition, relatedOrbPosition]}
    color="cyan"
    lineWidth={2}
    opacity={0.6}
  />
))}
```

**Rotation Control**: User can drag to rotate entire constellation using limited `OrbitControls`

---

### 5. TIMELINE DIMENSION (`TimelineDimension.jsx`)

**Concept**: A physical path extending along the Y-axis from `[0, -50, 0]` downward

**Path Geometry**: Use `<Line>` or `<Tube>` geometry creating a glowing path:
```jsx
const pathPoints = experienceData.map((exp, i) => 
  new THREE.Vector3(0, -50 - (i * 15), 0)
)

<Line points={pathPoints} color="cyan" lineWidth={3} />
```

**Milestone Markers** (`TimelineMarker.jsx`):
Each job/milestone is a glowing marker positioned along the path:
```jsx
<group position={[0, yPosition, 0]}>
  {/* Glowing sphere marker */}
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial emissive="blue" emissiveIntensity={1} />
  </mesh>
  
  {/* Connecting line to path */}
  <Line points={[[0, 0, 0], [5, 0, 0]]} color="white" />
  
  {/* Info card */}
  <Html position={[8, 0, 0]}>
    <div className="bg-gray-900/80 backdrop-blur-md p-4 rounded-lg border border-cyan-500/30 w-64">
      <h4 className="text-cyan-400 font-bold">{job.title}</h4>
      <p className="text-white">{job.company}</p>
      <p className="text-gray-400 text-sm">{job.date}</p>
      <p className="text-gray-300 text-sm mt-2">{job.description}</p>
    </div>
  </Html>
</group>
```

**Camera Movement**: When navigating here, camera follows along the path (animated Y position from -50 to -50 - (milestones * 15))

**Progressive Reveal**: As camera moves down timeline, past markers light up more brightly, future ones are dimmed

---

### 6. CONTACT PORTAL (`ContactPortal.jsx`)

**Position**: `[0, 0, 50]` - forward in Z space

**Vortex Effect**: Animated spiral particles drawing inward:
```javascript
useFrame((state) => {
  particlesRef.current.rotation.z += 0.01
  // Animate particles spiraling inward toward center
  positions.forEach((pos, i) => {
    const angle = (i / totalParticles) * Math.PI * 2 + state.clock.elapsedTime
    const radius = 10 - (i / totalParticles) * 10
    positions[i*3] = Math.cos(angle) * radius
    positions[i*3+1] = Math.sin(angle) * radius
    positions[i*3+2] = Math.sin(state.clock.elapsedTime + i) * 2
  })
})
```

**Contact Form**: HTML overlay centered in view:
```jsx
<Html center>
  <form className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 w-96">
    <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
    
    <input 
      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:border-purple-500 focus:outline-none transition"
      placeholder="Your Name"
    />
    
    <input 
      type="email"
      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4"
      placeholder="Your Email"
    />
    
    <textarea 
      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-6 h-32"
      placeholder="Your Message"
    />
    
    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition transform">
      Send Message
    </button>
  </form>
</Html>
```

**Social Links**: Floating icon spheres orbiting the portal:
```jsx
socialLinks.map((social, i) => {
  const angle = (i / socialLinks.length) * Math.PI * 2
  return (
    <mesh 
      position={[Math.cos(angle) * 8, Math.sin(angle) * 8, 0]}
      onClick={() => window.open(social.url)}
    >
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color={social.color} emissive={social.color} />
    </mesh>
  )
})
```

---

## AMBIENT EFFECTS & ATMOSPHERE

### Particle System (`ParticleSystem.jsx`)
Create a global particle field filling the entire space:
```javascript
const particleCount = 5000
const positions = new Float32Array(particleCount * 3)

for(let i = 0; i < particleCount; i++) {
  positions[i*3] = (Math.random() - 0.5) * 200
  positions[i*3+1] = (Math.random() - 0.5) * 200
  positions[i*3+2] = (Math.random() - 0.5) * 200
}

<points>
  <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      count={particleCount}
      array={positions}
      itemSize={3}
    />
  </bufferGeometry>
  <pointsMaterial size={0.1} color="white" transparent opacity={0.6} />
</points>
```

**Animation**: In `useFrame`, slowly drift particles and make them respond to cursor position:
```javascript
useFrame((state) => {
  const positions = pointsRef.current.geometry.attributes.position.array
  for(let i = 0; i < positions.length; i += 3) {
    positions[i+1] += Math.sin(state.clock.elapsedTime + i) * 0.001
    // Add cursor influence
    const dx = mousePosition.x - positions[i]
    const dy = mousePosition.y - positions[i+1]
    const distance = Math.sqrt(dx*dx + dy*dy)
    if(distance < 10) {
      positions[i] += dx * 0.01
      positions[i+1] += dy * 0.01
    }
  }
  pointsRef.current.geometry.attributes.position.needsUpdate = true
})
```

### Background Void (`BackgroundVoid.jsx`)
A huge sphere enclosing everything with animated shader material:
```jsx
<mesh scale={[500, 500, 500]}>
  <sphereGeometry args={[1, 64, 64]} />
  <shaderMaterial
    side={THREE.BackSide}
    uniforms={{
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(timeOfDayPalette.color1) },
      uColor2: { value: new THREE.Color(timeOfDayPalette.color2) }
    }}
    vertexShader={voidVertexShader}
    fragmentShader={voidFragmentShader}
  />
</mesh>
```

**Shader** (`void.frag`):
```glsl
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
  vec3 color = mix(uColor1, uColor2, vUv.y);
  color += 0.1 * sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
  gl_FragColor = vec4(color, 1.0);
}
```

Update `uTime` in `useFrame` to animate

### Lighting Rig (`LightingRig.jsx`)
```jsx
<>
  <ambientLight intensity={0.2} />
  <pointLight position={[10, 10, 10]} intensity={0.8} color="cyan" />
  <pointLight position={[-10, -10, -10]} intensity={0.5} color="purple" />
  <spotLight 
    position={[0, 20, 0]} 
    angle={0.3} 
    penumbra={1} 
    intensity={1}
    castShadow
  />
</>
```

**Time-of-Day System** (`useTimeOfDay.js`):
```javascript
const getTimeOfDay = () => {
  const hour = new Date().getHours()
  if(hour >= 6 && hour < 12) return 'morning'
  if(hour >= 12 && hour < 18) return 'afternoon'
  if(hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

const colorPalettes = {
  morning: { bg1: '#87CEEB', bg2: '#FDB813', ambient: 0.6 },
  afternoon: { bg1: '#00BFFF', bg2: '#1E90FF', ambient: 0.8 },
  evening: { bg1: '#FF6347', bg2: '#FF8C00', ambient: 0.4 },
  night: { bg1: '#191970', bg2: '#000080', ambient: 0.2 }
}
```

Apply these colors to background shader and light intensities

---

## USER INTERACTIONS

### Mouse/Cursor Tracking (`useMousePosition.js`)
```javascript
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Convert to normalized device coordinates (-1 to +1)
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return mousePosition
}
```

### Raycasting for Clicks (`useIntersect.js`)
```javascript
const useIntersect = (meshRef, onIntersect) => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  
  useFrame(({ camera }) => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(meshRef.current)
    
    if(intersects.length > 0) {
      onIntersect(intersects[0])
    }
  })
  
  const handleClick = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  }
  
  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
}
```

### Custom Cursor (`CustomCursor.jsx`)
HTML element that follows mouse, rendered outside canvas:
```jsx
<div 
  className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 mix-blend-difference"
  style={{
    left: cursorPosition.x,
    top: cursorPosition.y,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.2s, height 0.2s'
  }}
/>
```

When hovering interactive objects, scale up to `w-12 h-12`

---

## UI OVERLAYS (HTML Layer)

### Loading Sequence (`LoadingSequence.jsx`)
Full-screen overlay shown on initial load:
```jsx
<div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
      Initializing Universe...
    </h1>
    <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
        style={{ width: `${loadingProgress}%` }}
      />
    </div>
    <p className="text-gray-400 mt-4">{loadingProgress}%</p>
  </div>
</div>
```

Simulate loading by incrementing progress, then fade out with:
```javascript
gsap.to(loaderRef.current, { opacity: 0, duration: 1, onComplete: () => setShowLoader(false) })
```

### Settings Panel (`SettingsPanel.jsx`)
Floating button in top-right that expands into panel:
```jsx
<div className="fixed top-6 right-6 z-40">
  <button 
    onClick={() => setShowSettings(!showSettings)}
    className="w-12 h-12 rounded-full bg-gray-900/60 backdrop-blur-md border border-white/20 flex items-center justify-center"
  >
    ⚙️
  </button>
  
  {showSettings && (
    <div className="absolute top-16 right-0 bg-gray-900/90 backdrop-blur-xl p-6 rounded-lg border border-white/20 w-64">
      <h3 className="text-white font-bold mb-4">Settings</h3>
      
      <label className="flex items-center justify-between text-white mb-3">
        <span>Sound Effects</span>
        <input type="checkbox" checked={soundEnabled} onChange={toggleSound} />
      </label>
      
      <label className="flex items-center justify-between text-white mb-3">
        <span>Auto Time-of-Day</span>
        <input type="checkbox" checked={autoTime} onChange={toggleAutoTime} />
      </label>
      
      <button 
        onClick={resetCamera}
        className="w-full bg-cyan-500 text-white py-2 rounded mt-4"
      >
        Return to Hub
      </button>
    </div>
  )}
</div>
```

---

## DATA STRUCTURE

### Projects Data (`data/projects.js`)
```javascript
export const projects = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping platform with payment integration',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    videoUrl: '/videos/project1-preview.mp4',
    images: ['/images/project1-1.jpg', '/images/project1-2.jpg'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/...',
    featured: true,
    color: '#00ffff'
  },
  // ... more projects
]
```

### Skills Data (`data/skills.js`)
```javascript
export const skills = [
  {
    id: 'react',
    name: 'React',
    level: 9, // 1-10 scale
    category: 'frontend',
    color: '#61DAFB',
    relatedSkills: ['javascript', 'nextjs', 'typescript']
  },
  {
    id: 'threejs',
    name: 'Three.js',
    level: 7,
    category: 'graphics',
    color: '#000000',
    relatedSkills: ['webgl', 'react-three-fiber']
  },
  // ... more skills
]
```

---

## PERFORMANCE OPTIMIZATIONS

1. **Instancing**: For repeated geometries (particles, portals), use `<Instances>` from drei
2. **LOD**: Use `<Lod>` for complex models, showing simpler versions when far from camera
3. **Frustum Culling**: Three.js does this automatically, but ensure objects outside view aren't updating
4. **Lazy Loading**: Only load section assets when navigating near them using `React.lazy()` and `Suspense`
5. **Texture Compression**: Use compressed texture formats (KTX2)
6. **Physics**: Don't run physics calculations unless necessary, use simple math for drifting effects

---

## MOBILE ADAPTATIONS

### Gesture Controls (`useGestures.js`)
```javascript
const useGestures = () => {
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  
  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - touchStart.current.x
    const deltaY = e.touches[0].clientY - touchStart.current.y
    
    // Pan camera based on swipe
    camera.position.x -= deltaX * 0.05
    camera.position.y += deltaY * 0.05
  }
  
  const handlePinch = (e) => {
    // Calculate pinch distance and zoom camera
    if(e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      // Zoom logic
    }
  }
}
```

### Responsive UI
- Mini-map larger on mobile (160px diameter) and positioned bottom-center
- Settings button moves to top-left
- Project cards arrange vertically in tighter stack
- HTML text overlays use smaller font sizes
- Disable some particle effects on mobile for performance

---

## SOUND SYSTEM (`SoundEffects.jsx`)

```javascript
const sounds = {
  whoosh: new Audio('/sounds/whoosh.mp3'),
  chime: new Audio('/sounds/chime.mp3'),
  ambient: new Audio('/sounds/ambient.mp3')
}

sounds.ambient.loop = true
sounds.ambient.volume = 0.3

export const playSound = (soundName) => {
  if(soundEnabled) {
    sounds[soundName].currentTime = 0
    sounds[soundName].play()
  }
}

// Start ambient on load
useEffect(() => {
  if(soundEnabled) sounds.ambient.play()
}, [soundEnabled])
```

Play sounds on:
- Camera transition starts: `whoosh`
- Clicking interactive object: `chime`
- Background always: `ambient`

---

## MAIN APP STRUCTURE

```jsx
// App.jsx
function App() {
  return (
    <>
      <CustomCursor />
      <MiniMap />
      <Settings
      panel />
      
      <Canvas shadows camera={{ position: [0, 0, 30], fov: 75 }}>
        <CameraController />
        <LightingRig />
        <BackgroundVoid />
        <ParticleSystem />
        
        <Suspense fallback={null}>
          <CenterHub />
          <ProjectsQuadrant />
          <AboutZone />
          <SkillsConstellation />
          <TimelineDimension />
          <ContactPortal />
        </Suspense>
        
        <EffectComposer>
          <Bloom intensity={0.5} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
      
      <LoadingSequence />
    </>
  )
}
```

---

## KEY DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "@react-three/postprocessing": "^2.15.0",
    "gsap": "^3.12.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## SUMMARY OF IMPLEMENTATION ORDER

1. **Setup**: Create React app, install dependencies, configure Tailwind
2. **Canvas Foundation**: Basic Three.js canvas with camera and lighting
3. **Camera System**: Implement camera controller and transition animations
4. **Center Hub**: Build starting point with 3D name and portals
5. **Navigation**: Add mini-map and portal click handlers
6. **Sections**: Build each section one at a time (Projects → About → Skills → Timeline → Contact)
7. **Effects**: Add particle system, background void, lighting enhancements
8. **UI Layer**: Build HTML overlays (loading, settings, custom cursor)
9. **Interactions**: Implement hover effects, click handlers, raycasting
10. **Data Integration**: Connect all components to data files
11. **Polish**: Add sound, time-of-day, mobile gestures, performance optimization
12. **Testing**: Test all transitions, interactions, and responsiveness

This specification gives a complete blueprint for building the infinite canvas portfolio. Every section is explorable, every interaction is intentional, and the entire experience is unlike any traditional portfolio website.