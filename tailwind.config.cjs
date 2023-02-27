/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#df1a31',
        'lightGrey': '#dcdcdc',
        'quizName': '#778687',
        'pinkishRed': '#fd4759'
      },
    },
  },
  plugins: [],
};
