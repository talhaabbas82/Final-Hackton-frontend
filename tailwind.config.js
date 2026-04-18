/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f7f3",
        canvasAlt: "#eef3ed",
        ink: "#1f2933",
        inkSoft: "#5f6974",
        card: "#fbfaf5",
        cardDark: "#1d303a",
        surface: "#ffffff",
        surfaceMuted: "#f5f7f3",
        primary: "#16b8a9",
        primaryDeep: "#0d8f91",
        line: "#dde5de",
        mint: "#e4f2ed",
        heroStart: "#173139",
        heroMid: "#1e3a44",
        heroEnd: "#202c35",
        successBg: "#e4f5ea",
        successText: "#3e8d5c",
        dangerBg: "#fae9e6",
        dangerText: "#c86558",
      },
      borderRadius: {
        xl2: "1.4rem",
      },
      boxShadow: {
        glow: "0 12px 26px rgba(22, 184, 169, 0.22)",
        card: "0 10px 24px rgba(24, 38, 36, 0.06)",
      },
    },
  },
  plugins: [],
};
