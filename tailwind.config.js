/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#7a83e6",
      secondary: "#4F5BDE",
      white: "#fff",
      grey: "#e0e1e2",
      greyDarker: "#a9a9a9",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
};
