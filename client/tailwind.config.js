/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      garamond: ["Garamond", "serif"],
      geologica: ['"Geologica"', "sans-serif"],
    },
    fontSize: {
      title: [
        "67px",
        {
          fontWeight: "500",
          lineHeight: "68px",
          letterSpacing: "0.5px",
        },
      ],
      heading: [
        "40px",
        {
          fontWeight: "500",
          lineHeight: "48px",
          letterSpacing: "0.5px",
        },
      ],
      subtitle: [
        "26px",
        {
          fontWeight: "500",
          lineHeight: "26px",
          letterSpacing: "0.5px",
        },
      ],
      content: [
        "16px",
        {
          fontWeight: "400",
          lineHeight: "28px",
          letterSpacing: "0.5px",
        },
      ],
    },
    extend: {
      colors: {
        grey: "#F5F5F5",
        overlay: "rgba(0, 0, 0, 0.8)",
        "overlay-light": "rgba(0, 0, 0, 0.4)",
        "light-grey": "#C8C5C5",
        "dark-grey": "#4E4E4E",
        "light-aqua": "#EAFFFD",
        "dark-aqua": "#80E2D7",
        "light-cream": "#FFFADD",
        cream: "#FFD065",
        "bright-yellow": "#FFE01B",
        coral: "#EE8867",
        teal: "#86EAD5",
        success: "#1FCE6D",
      },
    },
  },
  plugins: [],
};
