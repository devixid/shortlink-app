/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px"
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
