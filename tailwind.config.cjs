/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        accent: "#f97316",
        accentSoft: "#fed7aa",
        surface: "#020617",
      },
      boxShadow: {
        glass: "0 18px 45px rgba(15,23,42,0.65)",
      },
    },
  },
  plugins: [],
};