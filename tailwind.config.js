/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "rgb(var(--color-bg) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        chip: "rgb(var(--color-chip) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        heading: "rgb(var(--color-heading) / <alpha-value>)",
        copy: "rgb(var(--color-copy) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        cyan: "rgb(var(--color-accent) / <alpha-value>)",
        mint: "#34d399",
        coral: "#fb7185",
        gold: "#fbbf24",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 18% 18%, rgb(var(--mesh-cyan) / 0.18), transparent 28%), radial-gradient(circle at 82% 8%, rgb(var(--mesh-coral) / 0.14), transparent 26%), radial-gradient(circle at 55% 75%, rgb(var(--mesh-mint) / 0.12), transparent 32%)",
      },
    },
  },
  plugins: [],
};
