// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,html}" // Optional but good practice
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
