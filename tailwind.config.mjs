/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core palette (from Stitch "Ethos Observatório" design system)
        primary: '#0D3B4C',
        'primary-deep': '#002532',
        'primary-container': '#0d3b4c',
        secondary: '#476800',
        'secondary-container': '#b6f24c',
        'secondary-fixed': '#b9f54f',
        tertiary: '#0d2335',

        // Surfaces (light theme — "No-Line Rule": use background shifts, not borders)
        surface: '#fbfaf1',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f4ec',
        'surface-container': '#efeee6',
        'surface-container-high': '#e9e8e0',
        'surface-container-highest': '#e4e3db',
        'surface-dim': '#dbdad2',

        // Text
        'on-primary': '#ffffff',
        'on-surface': '#1b1c17',
        'on-surface-variant': '#41484c',

        // Utility
        'outline-variant': '#c1c7cc',
        outline: '#71787c',
        error: '#ba1a1a',

        // Dark theme overrides
        dark: {
          surface: '#121c20',
          'surface-container-low': '#1a2a30',
          'surface-container': '#1e3040',
          'on-surface': '#e4e3db',
          'on-surface-variant': '#c1c7cc',
        },

        // Chart colors (colorblind-safe)
        chart: {
          1: '#0D3B4C',
          2: '#476800',
          3: '#4a6d00',
          4: '#2d6195',
          5: '#b9f54f',
          6: '#a4cce1',
          7: '#8da1b9',
          8: '#354e00',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
    },
  },
  plugins: [],
};
