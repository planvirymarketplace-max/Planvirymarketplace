import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: "#B87333",
          soft: "#C49A6C",
        },
        ivory: {
          DEFAULT: "#FFFFF0",
        },
        ink: {
          DEFAULT: "#1a1a1a",
        },
        hairline: {
          DEFAULT: "rgba(0,0,0,0.08)",
        },
        surface: {
          DEFAULT: "#f8f8f8",
        },
        background: {
          DEFAULT: "#ffffff",
        },
        foreground: {
          DEFAULT: "#1a1a1a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
