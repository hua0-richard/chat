/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(      {addCommonColors: true}
    )]
}