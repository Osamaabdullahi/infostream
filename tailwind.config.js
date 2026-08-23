/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: "#FAFAF7",
        "paper-dim": "#F1EFE7",
        ink: "#181A1F",
        "ink-soft": "#585B62",
        "ink-faint": "#8A8D93",
        rule: "#DEDBCF",
        masthead: "#16233F",
        "masthead-light": "#22335A",
        signal: "#B4232C",
        brass: "#9C7A2E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
