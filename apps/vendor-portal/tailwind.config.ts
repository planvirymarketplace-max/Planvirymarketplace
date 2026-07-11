import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#ffffff",
        "inverse-primary": "#bcc7de",
        "primary-container": "#1e293b",
        "on-surface": "#1b1b1d",
        "secondary-fixed": "#dbe1ff",
        "surface-container": "#f0edef",
        "surface": "#fbf8fa",
        "on-background": "#1b1b1d",
        "on-primary-fixed-variant": "#3c475a",
        "tertiary-fixed-dim": "#ddc39d",
        "secondary-fixed-dim": "#b4c5ff",
        "on-primary-fixed": "#111c2d",
        "primary-fixed": "#d8e3fb",
        "outline": "#75777d",
        "background": "#fbf8fa",
        "on-error": "#ffffff",
        "surface-tint": "#545f73",
        "inverse-on-surface": "#f3f0f2",
        "primary-fixed-dim": "#bcc7de",
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#003ea8",
        "on-secondary-fixed": "#00174b",
        "error": "#ba1a1a",
        "primary": "#091426",
        "on-tertiary-fixed": "#271902",
        "surface-container-highest": "#e4e2e3",
        "outline-variant": "#c5c6cd",
        "on-tertiary-fixed-variant": "#564427",
        "surface-variant": "#e4e2e3",
        "on-surface-variant": "#45474c",
        "on-tertiary-container": "#a38c6a",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#fadfb8",
        "on-secondary-container": "#fefcff",
        "surface-container-high": "#eae7e9",
        "surface-bright": "#fbf8fa",
        "inverse-surface": "#303032",
        "on-tertiary": "#ffffff",
        "on-primary": "#ffffff",
        "secondary-container": "#316bf3",
        "tertiary-container": "#35260c",
        "on-primary-container": "#8590a6",
        "tertiary": "#1e1200",
        "surface-container-low": "#f5f3f4",
        "secondary": "#0051d5",
        "surface-dim": "#dcd9db",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "section-margin": "32px",
        "container-padding": "24px",
        "base": "4px",
        "card-gap": "20px",
        "gutter": "16px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "display": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "data-mono": ["JetBrains Mono", "monospace"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "data-mono": ["13px", { "lineHeight": "16px", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "label-caps": ["11px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "body-sm": ["12px", { "lineHeight": "18px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
