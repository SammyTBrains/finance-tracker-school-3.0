/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#2032f4",
      secondary: "#0815a1",
      white: "#fff",
      grey: "#e0e1e2",
      greyDarker: "#a9a9a9",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
};
