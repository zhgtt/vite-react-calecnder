/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)"
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
