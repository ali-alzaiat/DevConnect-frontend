import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import babel from '@rolldown/plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    }),
    tailwindcss(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      }
    })
  ],
  resolve: {
    tsconfigPaths: true
  },
  server: {
    open: true
  },
  css: {
    devSourcemap: true
  }
});
