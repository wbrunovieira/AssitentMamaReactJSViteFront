/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#A8DADC',
        softPink: '#F4A261',
        pastelGreen: '#2A9D8F',
        lightYellow: '#F4E285',
        softGray: '#F5F5F5',
        darkText: '#333333',
        highlight: '#264653',
      },
    },
  },
  plugins: [],
}
