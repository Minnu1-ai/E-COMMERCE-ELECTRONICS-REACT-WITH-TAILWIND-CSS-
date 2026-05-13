/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#2563eb',
          secondary: '#1e293b',
          third:     '#3b82f6',
          fourth:    '#60a5fa',
          accent:    '#f59e0b',
        },
        bg: {
          main: '#f8fafc',
          card: '#ffffff',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
};
