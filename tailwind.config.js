/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1fcf5",
          100: "#d9f6e3",
          200: "#b5edc7",
          300: "#84dfa3",
          400: "#3fc46b",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16"
        }
      }
    }
  },
  plugins: []
};
