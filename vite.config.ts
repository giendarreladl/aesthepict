import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import unocssPlugin from "unocss/vite"
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [solidPlugin(),
     unocssPlugin(), 
    UnoCSS({
    configFile: 'uno.config.ts',
  })],
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: { include: ['mapbox-gl'] },
  build: {
    target: 'esnext',
  },
});
