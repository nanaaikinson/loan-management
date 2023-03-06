/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const { colors } = require("./theming/colors.cjs");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [require("kutty"), require("tailwind-bootstrap-grid")()],
  corePlugins: {
    container: false,
  },
};
