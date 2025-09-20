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
        stylep1: ["clamp(0.8rem, 1.2vw, 1.4rem)", { lineHeight: "1.75rem" }],
        stylep2: ["clamp(0.75rem, 1vw, 1rem)", { lineHeight: "1.5rem" }],
        stylep3: ["clamp(0.75rem, 0.8vw, 0.75rem)", { lineHeight: "1.25rem" }],

        styleh1: ["clamp(2.2rem, 4.2vw, 3rem)", { lineHeight: "3.5rem" }],
        styleh2: ["clamp(1.85rem, 3.2vw, 2.5rem)", { lineHeight: "3.2rem" }],
        styleh3: ["clamp(1.5rem, 3vw, 1.75rem)", { lineHeight: "2.5rem" }],
        styleh4: ["clamp(1rem, 2.2vw, 1.5rem)", { lineHeight: "2.25rem" }],
      },
      textColor: {
        skin: {
          color1: withOpacity("--color-text1"),
          color2: withOpacity("--color-text2"),
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
      },
      boxShadow: {
        skin: {
          light: "0 2px 4px rgba(var(--color-shadow), 0.1)",
          medium: "0 4px 6px rgba(var(--color-shadow), 0.15)",
          heavy: "0 10px 15px rgba(var(--color-shadow), 0.25)",
          inner: "inset 0 2px 4px rgba(var(--color-shadow), 0.2)",
        },
      },
      dropShadow: {
        skin: {
          soft: "0 1px 2px rgba(var(--color-shadow), 0.25)",
          glow: "0 0 8px rgba(var(--color-shadow), 0.5)",
          strong: "0 2px 6px rgba(var(--color-shadow), 0.35)",
        },
      },

      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Merriweather: ["Merriweather", "serif"],
        Oswald: ["Oswald", "sans-serif"],
        Opensans: ["Open Sans", "sansa-serif"],
      },
    },
  },
  plugins: [],
};
