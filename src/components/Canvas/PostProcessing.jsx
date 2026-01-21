import { EffectComposer, Bloom, ChromaticAberration, Vignette, Scanline, Glitch, Noise } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={2} luminanceThreshold={0.15} luminanceSmoothing={0.9} radius={0.85} mipmapBlur />

      <ChromaticAberration offset={[0.0015, 0.0015]} radialModulation modulationOffset={0.3} />

      <Scanline density={1.5} opacity={0.05} blendFunction={BlendFunction.OVERLAY} />

      <Glitch delay={[10, 20]} duration={[0.1, 0.3]} strength={[0.1, 0.2]} mode={GlitchMode.SPORADIC} active ratio={0.85} />

      <Vignette offset={0.2} darkness={0.6} eskil={false} blendFunction={BlendFunction.NORMAL} />

      <Noise opacity={0.08} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  );
}
// Bloom, effects, etc.
export default function PostProcessing() {
  return null;
}
