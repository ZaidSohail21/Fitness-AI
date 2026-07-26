import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('.', import.meta.url));

// Chrome needs manifest.json at the root of the built extension folder.
const manifestPlugin = () => ({
  name: 'copy-chrome-manifest',
  closeBundle() {
    copyFileSync(resolve(rootDirectory, 'src/manifest.json'), resolve(rootDirectory, 'dist/manifest.json'));
  },
});

export default defineConfig({
  plugins: [react(), manifestPlugin()],
  build: { rollupOptions: { input: resolve(rootDirectory, 'popup.html') } },
});
