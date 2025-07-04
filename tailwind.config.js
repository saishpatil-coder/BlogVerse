module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Ensure this is added
  theme: {
    extend: {
      animation: {
        'fade-in-out': 'fadeInOut 1.2s ease-in-out',
        'spin-slow': 'spin 2s linear infinite',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
