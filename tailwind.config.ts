import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        mist: "var(--mist)",
        turquoise: "var(--turquoise)",
        coral: "var(--coral)",
        "teal-deep": "var(--teal-deep)",
        "coral-deep": "var(--coral-deep)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "Consolas", "monospace"],
      },
      boxShadow: {
        lift: "0 26px 70px rgba(2, 21, 27, 0.14)",
        panel: "0 34px 90px rgba(0, 0, 0, 0.34)",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
