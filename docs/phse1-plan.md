Here’s a step-by-step plan to implement Phase 2: Basic Canvas & Camera System:

**1. MainCanvas.jsx**
- Replace the placeholder with a real R3F <Canvas> setup.
- Set the canvas to cover the full viewport (100vw x 100vh).
- Ensure antialias, alpha, and toneMapping are set for quality.

**2. CameraController.jsx**
- Implement a <PerspectiveCamera> using Drei.
- Set initial position to [0, 0, 30], looking at [0, 0, 0].
- Attach a ref for camera control.

**3. useCamera.js**
- Implement state for current camera section.
- Create a flyToSection(sectionKey) function that animates the camera position using GSAP.
- Expose cameraRef, flyToSection, and currentSection.

**4. Integrate Camera Logic**
- In MainCanvas, add CameraController and pass cameraRef from useCamera.
- On section change, call flyToSection to animate camera.

**5. Camera LookAt**
- On every frame, update camera.lookAt() to focus on the current section’s position.

**6. Easing**
- Use GSAP’s power2.inOut for smooth camera transitions.

**7. Testing**
- Add two dummy section positions in constants.js.
- Test camera movement between them using flyToSection.

**8. Verify**
- Ensure cameraRef is correctly attached and transitions are smooth.

Would you like to start with the MainCanvas implementation, or another step?
