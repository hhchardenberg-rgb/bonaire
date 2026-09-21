import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: "#eefcfb",
          100: "#d3f7f3",
          200: "#a8eee7",
          300: "#71dfd6",
          400: "#3fc9bf",
          500: "#22aca4",
          600: "#188a85",
          700: "#186f6c",
          800: "#195957",
          900: "#194a49",
        },
        diepblauw: {
          50: "#eef4fb",
          100: "#d6e5f5",
          200: "#aecaeb",
          300: "#7ea9db",
          400: "#4f83c4",
          500: "#3465a6",
          600: "#264e84",
          700: "#1f3f6a",
          800: "#1c3555",
          900: "#182c47",
        },
        koraal: {
          50: "#fff3f0",
          100: "#ffe1da",
          200: "#ffc2b3",
          300: "#ff9c85",
          400: "#fb7657",
          500: "#f0563a",
          600: "#d43f26",
          700: "#b0311d",
          800: "#8f2b1c",
          900: "#76281c",
        },
        zand: {
          50: "#fdfbf3",
          100: "#faf3dd",
          200: "#f3e4b8",
          300: "#eacf87",
          400: "#e0b657",
          500: "#d29e39",
          600: "#b17e2c",
          700: "#8c6127",
          800: "#734f26",
          900: "#614223",
        },
        zon: {
          50: "#fffbeb",
          100: "#fff2c2",
          200: "#ffe285",
          300: "#ffcc47",
          400: "#ffb81c",
          500: "#f79907",
          600: "#db7502",
          700: "#b55406",
          800: "#93410c",
          900: "#7a370e",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(24, 68, 66, 0.25)",
        floating: "0 6px 20px -6px rgba(24, 68, 66, 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "dance": {
          "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
          "25%": { transform: "translateY(-5px) rotate(5deg)" },
          "50%": { transform: "translateY(0) rotate(-4deg)" },
          "75%": { transform: "translateY(-3px) rotate(7deg)" },
        },
        "flesjes-regen": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "8%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "1" },
        },
        "schud": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(5px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "pop-in": "pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        "bob": "bob 3.5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "dance": "dance 0.9s ease-in-out infinite",
        "flesjes-regen": "flesjes-regen linear infinite",
        "schud": "schud 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
