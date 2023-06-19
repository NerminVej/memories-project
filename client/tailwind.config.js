module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#DC3545",
      },
    },
    // Define the layers for customization
    layers: {
      utilities: {
        // Enable the text color utilities
        textColor: true,
      },
    },
  },
  plugins: [],
};
