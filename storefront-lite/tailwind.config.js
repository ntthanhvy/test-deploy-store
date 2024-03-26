/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        grid: 1400,
        "8xl": "100rem",
      },
      space: {
        3.5: 15,
        4.5: 18,
      },
      width: {
        product: "calc(1440px * 0.1722)",
      },
      borderRadius: {
        default: 20,
        small: 10,
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        WildMango: ["WildMango"],
        WildMango2: ["WildMango 2", "sans-serif"],
        Monsterrat: ["Montserrat"],
      },
      fontSize: {
        "hero-title": "5rem",
        subtitle: 15,
        review: 11,
        "2xs": 10,
        "1.5xl": "22px",
      },
      lineHeight: {
        "hero-title": "4.5rem",
      },
      dropShadow: {
        hero: "0 8px 0px #dcc1e0",
        card: "0 4px 0px #dcc1e0",
      },
      boxShadow: {
        card: "0 4px 4px #ccc",
      },
      colors: {
        primary: {
          50: "#faf2f9",
          75: "#FAD9E0",
          100: "#dcc1e0",
          700: "#5C2157",
          800: "#903D7E",
          900: "#5D2258",
        },
      },

      backgroundImage: {
        "hero-pattern": 'url("/assets/images/backgrounds/bg-hero.png")',
        "hero-pattern-mobile":
          'url("/assets/images/backgrounds/bg-hero.svg")  no-repeat center center fixed',
        "hero-mobile": 'url("/assets/images/backgrounds/hero-mobile.png")',
        "policy-pattern": 'url("/assets/images/backgrounds/bg-policy.svg")',
        hero: 'url("/assets/images/backgrounds/hero.png")',
        footer: 'url("/assets/images/backgrounds/bg-footer.svg")',
        collection: 'url("/assets/images/backgrounds/collection.png")',
        basket: 'url("/assets/images/backgrounds/bg-basket.svg")',
        checkout: 'url("/assets/images/backgrounds/bg-checkout.svg")',
        order: 'url("/assets/images/backgrounds/bg-order.png")',
      },
      backgroundSize: {
        curve: "1280px auto",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
