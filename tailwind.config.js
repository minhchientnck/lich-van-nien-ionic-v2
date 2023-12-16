/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dayview': 'radial-gradient(circle, #f5f5f5 -20%, #ceef89 100%)',
      }
    },
  },
  plugins: [],
}

