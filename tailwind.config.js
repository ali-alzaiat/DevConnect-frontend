/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  plugins: [require("tailwind-variants")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        app: 'var(--bg-app)',
        sidebar: 'var(--bg-sidebar)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          hover: 'var(--bg-surface-hover)',
        },
        // Text
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        inverse: 'var(--text-inverse)',
        // Brand
        brand: {
          DEFAULT: 'var(--brand-primary)',
          hover: 'var(--brand-primary-hover)',
          muted: 'var(--brand-primary-muted)',
        },
        // Borders
        subtle: 'var(--border-subtle)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      }
    },
  },
};
