/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], 
  theme: {
    extend: {
      colors: {
        "nb-black": "#131112", 
        "nb-darkblue": "#154C7A", 
        "nb-lightblue": "#279AF1", 
        "nb-yellow": "#FFEA47", 
        "nb-white": "#F5F5F5", 
      }, 
    },
  },
  plugins: [require("daisyui")], 
}
