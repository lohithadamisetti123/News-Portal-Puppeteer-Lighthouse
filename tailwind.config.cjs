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
        accent: "#fbbf24",
        "accent-soft": "rgba(251,191,36,0.12)",
        surface: "#020617",
        "surface-elevated": "#0f172a",
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.3)",
        "glass-hover": "0 12px 48px rgba(0,0,0,0.4), 0 0 40px rgba(251,191,36,0.08)",
        glow: "0 0 40px rgba(251,191,36,0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease both",
        "fade-in": "fadeIn 0.4s ease both",
      },
    },
  },
  plugins: [],
};