import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Ensure binary model assets like .glb are treated as static assets
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  resolve: {
    alias: {
      './main': './main.jsx',
      'src/main.tsx': 'src/main.jsx',
    },
  },
});
