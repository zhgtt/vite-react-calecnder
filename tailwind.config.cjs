/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)"
      }
    }
  },
  plugins: [],
  darkMode: "class"
  // prefix: "tw-"
};
