/** @type {import('tailwindcss').Config} */
const config = {
  // Tailwind v4 uses CSS-based configuration via @theme directive in globals.css
  // This minimal config only includes essential settings that can't be configured via CSS
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Modern dark mode support (class-based)
  darkMode: 'class',

  // Essential theme extensions that require JavaScript
  theme: {
    extend: {
      // Additional screens for enhanced responsive design
      screens: {
        'fold': '320px',    // Galaxy Fold and ultra-compact devices
        'xs': '480px',      // Large phones
        '3xl': '1920px',    // 4K displays and ultra-wide monitors
      },
    },
  },

  plugins: [],
}

module.exports = config