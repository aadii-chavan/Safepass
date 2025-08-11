/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af',   // blue-800
        },
        accent: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#047857',    // emerald-800
        },
        background: {
          DEFAULT: '#0f172a', // slate-900
          light: '#1e293b',   // slate-800
        },
        card: {
          DEFAULT: '#1e293b', // slate-800
          light: '#334155',   // slate-700
        },
        border: {
          DEFAULT: '#334155', // slate-700
        },
      },
      boxShadow: {
        'card': '0 4px 24px 0 rgba(16, 185, 129, 0.08)',
      },
    },
  },
  plugins: [],
};
