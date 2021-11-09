module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1f4bff",
        secondary: "#ebeeff",
        gray: "#f5f5f5",
        red: "#ff1f26",
        green: "#086336",
        green2: "#11a05a",
      },
      textColor: {
        primary: "#1f4bff",
        green: "#0d9b54",
        red: "#ff565c",
        gray: "#8f8f8f",
        gray2: "#5c5c5c",
        red2: "#ff1f26",
      },
      placeholderColor: {
        gray: "#707070",
      },
      transitionProperty: {
        opacity: "opacity",
      },
      borderColor: {
        red: "#ff1f26",
        blue: "#1f4bff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
