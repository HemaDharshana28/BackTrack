/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-rust': '#a65d57',
        'brand-green': '#3e6b54',
        'brand-cream': '#fdfcf7',
        'brand-navy': '#4a5568', /* for navbar buttons or dark text if needed */
        'brand-blue': '#4a5c82', /* specifically the Sign In button is purplish/blue */
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}