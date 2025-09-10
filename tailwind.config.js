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
        stylep1: ["clamp(0.8rem, 1.2vw, 1rem)", { lineHeight: "1.75rem" }],
        stylep2: ["clamp(0.75rem, 1vw, 0.8rem)", { lineHeight: "1.5rem" }],
        stylep3: ["clamp(0.75rem, 0.9vw, 0.875rem)", { lineHeight: "1.25rem" }],

        styleh1: ["clamp(2rem, 4.2vw, 3rem)", { lineHeight: "3.5rem" }],
        styleh2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "3rem" }],
        styleh3: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "2.5rem" }],
        styleh4: ["clamp(0.8rem, 2.3vw, 1.15rem)", { lineHeight: "2.25rem" }],
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
          end: withOpacity("--color-back"),
        }
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Merriweather: ["Merriweather", "serif"],
        Oswald: ["Oswald", "sans-serif"],
        Opensans: ["Open Sans", "sansa-serif"]
      },
    },
  },
  plugins: [],
};
