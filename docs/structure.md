src/
├── components/
│   ├── Canvas/
│   │   ├── MainCanvas.jsx          # Core Three.js canvas setup
│   │   ├── CameraController.jsx    # Camera movement & transitions
│   │   ├── SceneManager.jsx        # Manages all 3D objects in scene
│   │   └── PostProcessing.jsx      # Bloom, effects, etc.
│   │
│   ├── Navigation/
│   │   ├── MiniMap.jsx             # Radar/mini-map navigator
│   │   ├── DirectionalBeacons.jsx  # Edge indicators for sections
│   │   └── PortalGateways.jsx      # Floating portal rings at center
│   │
│   ├── Sections/
│   │   ├── CenterHub.jsx           # Main starting point with name
│   │   ├── ProjectsQuadrant.jsx    # 3D gallery space
│   │   ├── AboutZone.jsx           # Workspace environment
│   │   ├── SkillsConstellation.jsx # Floating orb system
│   │   ├── TimelineDimension.jsx   # Experience timeline path
│   │   └── ContactPortal.jsx       # Contact vortex/terminal
│   │
│   ├── Elements/
│   │   ├── FloatingIsland.jsx      # Reusable island platform
│   │   ├── ProjectCard3D.jsx       # Individual project display
│   │   ├── SkillOrb.jsx            # Glowing skill sphere
│   │   ├── TimelineMarker.jsx      # Milestone points
│   │   ├── PortalRing.jsx          # Gateway portal effect
│   │   └── InteractiveObject.jsx   # Clickable 3D objects
│   │
│   ├── Effects/
│   │   ├── ParticleSystem.jsx      # Ambient particles
│   │   ├── BackgroundVoid.jsx      # Generative art background
│   │   ├── LightingRig.jsx         # Dynamic lights
│   │   ├── GravityWell.jsx         # Magnetic cursor effects
│   │   └── RippleEffect.jsx        # Click disturbance waves
│   │
│   ├── UI/
│   │   ├── LoadingSequence.jsx     # Universe construction animation
│   │   ├── FocusModal.jsx          # Expanded project view
│   │   ├── ContactForm.jsx         # Futuristic contact interface
│   │   ├── GuestBook.jsx           # Visitor messages sphere
│   │   ├── SettingsPanel.jsx       # Sound, time-of-day toggle
│   │   └── Tooltip.jsx             # Hover information displays
│   │
│   └── Shared/
│       ├── CustomCursor.jsx        # Animated cursor follower
│       ├── SoundEffects.jsx        # Audio controller
│       └── ProgressIndicator.jsx   # Visit trail system
│
├── hooks/
│   ├── useCamera.js                # Camera state & animations
│   ├── useThree.js                 # Three.js setup hook
│   ├── useMousePosition.js         # Track cursor in 3D space
│   ├── useGestures.js              # Mobile gesture handling
│   ├── useIntersect.js             # Raycasting for clicks
│   ├── useTimeOfDay.js             # Time-based atmosphere
│   └── useVisitedSections.js       # Track user exploration
│
├── utils/
│   ├── cameraAnimations.js         # GSAP camera movement functions
│   ├── three-helpers.js            # Three.js utility functions
│   ├── physics.js                  # Inertia & gravity calculations
│   ├── colorSchemes.js             # Time-of-day color palettes
│   ├── particlePatterns.js         # Particle generation logic
│   └── constants.js                # Section positions, configs
│
├── data/
│   ├── projects.js                 # Project content & metadata
│   ├── skills.js                   # Skills data with connections
│   ├── experience.js               # Timeline/work history
│   ├── about.js                    # Bio, interests, photos
│   └── socialLinks.js              # Contact info & socials
│
├── styles/
│   ├── globals.css                 # Base styles & Tailwind imports
│   └── canvas.css                  # Canvas-specific styles
│
├── shaders/                        # Custom WebGL shaders
│   ├── void.frag                   # Background effect shader
│   ├── void.vert
│   ├── portal.frag                 # Portal ring effect
│   └── glow.frag                   # Bloom/glow effects
│
├── assets/
│   ├── models/                     # 3D models (.glb, .gltf)
│   │   ├── workspace-items/
│   │   └── decorative/
│   ├── textures/                   # Material textures
│   ├── sounds/                     # Audio files
│   │   ├── whoosh.mp3
│   │   ├── chime.mp3
│   │   └── ambient.mp3
│   └── images/                     # Photos, screenshots
│
├── context/
│   ├── SceneContext.jsx            # Global scene state
│   ├── NavigationContext.jsx       # Current section, transitions
│   └── SettingsContext.jsx         # User preferences (sound, etc)
│
├── App.jsx                         # Main app component
└── main.jsx                        # Entry point