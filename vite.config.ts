import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['@gradio/client'],
      output: {
        // This will help ensure the module is treated as external
        globals: {
          '@gradio/client': 'gradioClient'
        }
      }
    },
  },
  // Prevent Vite from trying to optimize this dependency
  optimizeDeps: {
    exclude: ['@gradio/client']
  },
  // Define environment variables to help with conditional code
  define: {
    'process.env.BROWSER': JSON.stringify(true),
  }
});
