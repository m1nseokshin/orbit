/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./InsightDashboard.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
