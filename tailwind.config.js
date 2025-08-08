module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: { 
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      }
    } 
  },
  plugins: [],
};