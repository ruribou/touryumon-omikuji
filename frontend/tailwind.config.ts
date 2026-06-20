import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 和風テーマ カラーパレット
        shrine: "#1a0a00", // 背景：深い夜の社
        gold: "#c9a84c", // アクセント：金色
        washi: "#f5f0e8", // テキスト：和紙色
        vermilion: "#e63946", // 大吉：朱色
        aigray: "#4a4e69", // 凶系：藍鼠
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', "serif"],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "40%": { transform: "rotate(8deg)" },
          "60%": { transform: "rotate(-6deg)" },
          "80%": { transform: "rotate(6deg)" },
        },
        "fall-in": {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "70%": { transform: "translateY(8%)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 8px 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 24px 4px rgba(201,168,76,0.8)" },
        },
      },
      animation: {
        shake: "shake 0.6s ease-in-out infinite",
        "fall-in": "fall-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-up": "fade-up 0.5s ease-out forwards",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
