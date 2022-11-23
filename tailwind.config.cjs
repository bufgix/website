module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,astro,ts,svelte}"],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        light: "#fcfefd",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
