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
        forest: {
          DEFAULT: "#1B4332",
          light: "#2D6A4F",
          dark: "#0B2920",
          50: "#E8F5EE",
          100: "#C8E6D5",
          200: "#95CCA9",
          300: "#52A56F",
          400: "#2D7A4F",
          500: "#1B4332",
          600: "#163828",
          700: "#0F2B1E",
          800: "#0B2920",
          900: "#071A14",
        },
        cream: {
          DEFAULT: "#FFFDF7",
          dark: "#F5F0E8",
          100: "#FEFCF3",
          200: "#FBF7EC",
          300: "#F5F0E8",
        },
        saffron: {
          DEFAULT: "#E8772E",
          light: "#F0944F",
          dark: "#C45E1A",
          50: "#FFF3E8",
          100: "#FFE0C2",
          200: "#FFCA96",
          300: "#F0944F",
          400: "#E8772E",
          500: "#C45E1A",
          600: "#A04D16",
        },
        charcoal: "#2C2C2C",
        muted: "#6B7280",
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
        gujarati: ["var(--font-noto-gujarati)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
