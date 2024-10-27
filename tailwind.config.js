/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#55AB60",
        secondary: "#F2FCF4",
        accent: "#F3FFF5",
        cardbg: "#F2FCF4",
        heading: "#656565",
        subheading: "#838383",
      },
    },
  },
  plugins: [],
};
