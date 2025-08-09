/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00f5ff',
        'neon-purple': '#8b5cf6',
        'neon-pink': '#e879f9',
        'neon-cyan': '#06b6d4',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'gradient-shift': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(ellipse at center, #1a0b2e 0%, #16213e 50%, #0f3460 100%)',
        'neon-gradient': 'linear-gradient(-45deg, #00f5ff, #8b5cf6, #e879f9, #06b6d4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-cyan-500',
    'bg-purple-500',
    'bg-pink-500',
    'border-cyan-500/20',
    'border-purple-500/20',
    'border-pink-500/20',
    'border-yellow-500/20',
    'border-yellow-500/40',
    'hover:border-cyan-500/30',
    'hover:border-purple-500/30',
    'hover:border-pink-500/30',
  ],
};