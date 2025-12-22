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
        },
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
      },
    },
  },
  plugins: [],
};
