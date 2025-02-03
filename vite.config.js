import { defineConfig } from 'vite';
import { componentTagger } from "lovable-tagger";
import path from 'path';

export default defineConfig({
  base: './',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      'd81eb12f-5727-4ffe-a553-996fe0e673ab.lovableproject.com',
      '.lovableproject.com'
    ]
  },
  optimizeDeps: {
    exclude: ['lovable-tagger']
  },
  plugins: [
    {
      ...componentTagger(),
      apply: 'build'
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      external: ['lovable-tagger']
    }
  }
});