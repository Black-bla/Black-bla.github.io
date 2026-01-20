
# Copilot Instructions for Black-bla.github.io

## Project Architecture & Purpose
- **Infinite Canvas Portfolio:** 3D/2D explorable universe built with React 19, Vite, and Three.js (via @react-three/fiber). Users navigate between floating "zones" (hub, projects, about, skills, timeline, contact) using cinematic camera transitions and spatial UI.
- **Entry Point:** `src/main.jsx` renders `App.jsx` (not .tsx) into the DOM. All main logic starts from `App.jsx`.
- **Core Data Flow:**
  - Camera and navigation state are managed via React hooks (`useCamera`, `useVisitedSections`) and context providers (`SceneContext`, `NavigationContext`, `SettingsContext`).
  - Section positions and navigation logic are defined in `src/utils/constants.js`.
  - 3D scene composition is modular: each major section/component is in `src/components/` (see `docs/structure.md`).
- **Why this structure?**
  - Enables a game-like, immersive experience with modular, testable React components and clear separation of 3D logic, UI, and data.

## Key Developer Workflows
- **Start Dev Server:** `npm run dev` (Vite, HMR enabled)
- **Build for Production:** `npm run build` (TypeScript, then Vite)
- **Lint:** `npm run lint` (TypeScript/React ESLint rules)
- **Preview Production Build:** `npm run preview`
- **Component/Section Development:**
  - Add new 3D/React components in `src/components/` (see `docs/structure.md` for naming/location conventions)
  - Use hooks in `src/hooks/` for camera, gestures, raycasting, etc.
  - Add new section positions in `src/utils/constants.js`
- **Data:**
  - Add/edit content in `src/data/` (projects, skills, experience, about, socialLinks)
- **Shaders:**
  - Place custom GLSL in `src/shaders/` and import into relevant components

## Patterns & Conventions
- **React 19, modern idioms:** Use function components, hooks, and context. No class components.
- **TypeScript:** Use `.ts`/`.tsx` for new files unless working with legacy `.js`/`.jsx`.
- **Three.js via R3F:** All 3D scene logic uses @react-three/fiber and @react-three/drei. Canvas setup in `MainCanvas.jsx`.
  - **CRITICAL:** Import `useFrame` from `@react-three/fiber`, NOT `@react-three/drei`.
  - Import 3D helpers (PerspectiveCamera, Html, OrbitControls, etc.) from `@react-three/drei`.
  - All R3F components must be children of `<Canvas>` in `MainCanvas.jsx`.
- **Camera/Navigation:**
  - Use `useCamera` for camera state and GSAP-powered transitions (`flyToSection`).
  - Camera always looks at the current section's position (see `CameraController.jsx`).
- **Section/Component Structure:**
  - Each major zone (hub, projects, about, etc.) is a separate component in `src/components/Sections/`.
  - Reusable 3D elements in `src/components/Elements/`.
  - Effects (particles, lighting, post-processing) in `src/components/Effects/`.
- **Styling:**
  - Global styles in `src/styles/globals.css`, canvas-specific in `src/styles/canvas.css`.
  - Tailwind CSS is referenced but not required for all components.
- **No custom routing:** Navigation is spatial/camera-based, not URL-based.

## Integration & Extensibility
- **Add dependencies:** `npm install <pkg>` and import in `src/`.
- **Vite plugins:** Add in `vite.config.ts`.
- **React Compiler:** Enabled for fast refresh (see `vite.config.ts`).
- **3D assets:** Place models/textures in `src/assets/`.
- **Static files:** Place in `public/`.

## References & Further Reading
- **Architecture & component map:** `docs/structure.md`
- **Phase checklist:** `docs/check-list` (useful for phased, AI-driven development)
- **Project vision:** `docs/about.md`
- **Build/lint details:** `README.md`, `eslint.config.js`, `vite.config.ts`, `package.json`
- **Section positions/configs:** `src/utils/constants.js`
- **Camera logic:** `src/hooks/useCamera.js`, `src/components/Canvas/CameraController.jsx`

## Common Pitfalls & Important Notes
- **Entry files are `.jsx`, not `.tsx`:** The project uses `main.jsx` and `App.jsx` as entry points. Vite config has aliases to redirect `.tsx` imports to `.jsx` files.
- **Import sources matter:** `useFrame` is from `@react-three/fiber`, while helpers like `PerspectiveCamera`, `Html`, `OrbitControls` are from `@react-three/drei`.
- **Camera position vs lookAt:** Camera position is animated with GSAP in `useCamera.js`, but `lookAt` is updated every frame in `CameraController.jsx` to focus on the current section.
- **Section positions:** All section coordinates are defined in `src/utils/constants.js` as `SECTION_POSITIONS`. Add new sections there first.
- **Three.js context:** 3D components must be children of `<Canvas>` in `MainCanvas.jsx`. Regular React components go outside the canvas.

---
For major changes, update this file to document new patterns, workflows, or architectural shifts. If unclear, consult `docs/structure.md` and `docs/check-list` for canonical structure and conventions.
