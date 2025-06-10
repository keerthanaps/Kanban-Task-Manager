/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional: add custom dark mode color palette
        dark: {
          background: '#1f2937', // gray-800
          surface: '#374151', // gray-700
          border: '#4b5563', // gray-600
          text: '#f9fafb',    // gray-50
        },
      },
    },
  },
  plugins: [],
};
