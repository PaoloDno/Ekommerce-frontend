/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgba(var(${variableName}), ${opacityValue})`
      : `rgb(var(${variableName}))`;
}

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Headings
        styleh1: ["clamp(2rem, 3vw, 2.75rem)", { lineHeight: "3.25rem" }],
        styleh2: ["clamp(1.75rem, 2.5vw, 2.25rem)", { lineHeight: "2.75rem" }],
        styleh3: ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "2.25rem" }],
        styleh4: [
          "clamp(1.125rem, 1.5vw, 1.375rem)",
          { lineHeight: "1.75rem" },
        ],
        // Paragraphs
        stylep1: ["clamp(1rem, 1.2vw, 1.25rem)", { lineHeight: "1.75rem" }],
        stylep2: ["clamp(0.95rem, 1vw, 1.125rem)", { lineHeight: "1.75rem" }],
        stylep3: ["clamp(0.875rem, 0.9vw, 1rem)", { lineHeight: "1.5rem" }],
        stylep4: [
          "clamp(0.75rem, 0.75vw, 0.875rem)",
          { lineHeight: "1.25rem" },
        ],
      },
      textColor: {
        skin: {
          color1: withOpacity("--color-text1"),
          color2: withOpacity("--color-text2"),
          color3: withOpacity("--color-text3"),
          colorHigh: withOpacity("--color-contrast"),
          colorDis: withOpacity("--color-disable"),
          colorContent: withOpacity("--color-content-text"),
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          secondary: withOpacity("--color-secondary"),
          buttonColor: withOpacity("--color-button"),
          "buttonColor-1": withOpacity("--color-button-1"),
          "buttonColor-2": withOpacity("--color-button-2"),
          "fill-1": withOpacity("--color-fill-1"),
          "fill-2": withOpacity("--color-fill-2"),
          "fill-3": withOpacity("--color-fill-3"),
          "fill-4": withOpacity("--color-fill-4"),
          "color-back": withOpacity("--color-back"),
          colorContent: withOpacity("--color-content-bg"),
          green: withOpacity("--color-green"),
          red: withOpacity("--color-red"),
          cart: withOpacity("--color-cart"),
        },
      },
      backgroundImage: {
        "gradient-primary-buttons-130":
          "linear-gradient(130deg, rgb(var(--btn-grad-start-1)) 0%, rgb(var(--btn-grad-end-1)) 35%, rgb(var(--color-primary)) 100%)",
        "gradient-primary-buttons-85":
          "linear-gradient(85deg, rgb(var(--btn-grad-start-1)) 0%, rgb(var(--btn-grad-end-1)) 45%, rgb(var(--color-primary)) 100%)",
        "gradient-primary-buttons-110":
          "linear-gradient(110deg, rgb(var(--btn-grad-start-1)) 0%, rgb(var(--btn-grad-end-1)) 95%, rgb(var(--color-primary)) 100%)",
        "gradient-primary-buttons-95":
          "linear-gradient(95deg, rgb(var(--btn-grad-start-1)) 0%, rgb(var(--btn-grad-end-1)) 95%, rgb(var(--color-primary)) 100%)",
        "gradient-back-transparent":
          "linear-gradient(0deg, rgb(var(--color-back), 0.8 ) 0%, transparent 50%, rgb(var(--color-primary), 0.5) 100%)",
      },
      borderColor: {
        skin: {
          colorBorder1: withOpacity("--color-border1"),
          colorBorder2: withOpacity("--color-border2"),
        },
      },
      gradientColorStops: {
        skin: {
          end: withOpacity("--color-content-bg"),
          start: withOpacity("--color-fill-3"),
        },
        button: {
          start: withOpacity("--btn-grad-start"),
          end: withOpacity("--btn-grad-end"),
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Vend Sans", "serif"],
        accent: ["Fraunces", "sans-serif"],
        Oswals: ["Inter", "sans-serif"],
        Opensans: ["Inter", "sans-serif"],
        Montserrat: ["Inter", "sans-serif"],
        Receipt: ["Inconsolata", "sans-serif"],
      },
    },
  },
  plugins: [],
};
