/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-opacity": "rgba(var(--color-primary-rgb), 0.45)"
      },
      fontFamily: {
        primary: ["BadComic"]
      }
    }
  },
  plugins: [],
  darkMode: "class",
  corePlugins: {
    preflight: false
  }
  // prefix: "tw-"
};
