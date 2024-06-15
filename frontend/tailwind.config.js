/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#769D4A",
          50: "#E7EFDD",
          100: "#DAE7CC",
          200: "#C2D7A9",
          300: "#A9C687",
          400: "#90B664",
          500: "#769D4A",
          600: "#5C7A3A",
          700: "#425829",
          800: "#283519",
          900: "#13190C",
          950: "#090B05",
        },
      },
    },
  },
  plugins: [],
};
