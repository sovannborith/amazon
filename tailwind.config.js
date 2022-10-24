/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,

  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
