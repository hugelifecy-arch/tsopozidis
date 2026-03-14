import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0A0A0A",
        "bg-secondary": "#111111",
        "bg-tertiary": "#1A1A1A",
        gold: "#C8A96E",
        "gold-light": "#E0CFA0",
        "gold-dark": "#8A7340",
        "text-primary": "#F5F0E8",
        "text-secondary": "#A09080",
        "text-tertiary": "#605040",
        "accent-red": "#8B2020",
        border: "#2A2420",
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideRight: "slideRight 0.5s ease-out forwards",
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
