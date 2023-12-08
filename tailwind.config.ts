module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        mainGray: "#D9D9D9",
        darkGray: "#545556",
        lightGray: "#E9ECEF",
        black: "#303031",
        darkYellow: "#FFDC4C",
        mainYellow: "#E5EB9F",
        primary: "#9484F6",
        darkBlue: "#002C69",
        lightBlue: "#A0BBE2",
        mainOrange: "#F69B30",
        mainGreen: "#34B441",
      },
      boxShadow: {
        button: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },

  plugins: [],
};
