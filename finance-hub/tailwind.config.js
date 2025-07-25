/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'primary-50': '#eff6ff',
        'primary-100': '#dbeafe',
        'primary-500': '#3b82f6',
        'primary-600': '#2563eb',
        'primary-700': '#1d4ed8',
        'secondary-50': '#f8fafc',
        'secondary-100': '#f1f5f9',
        'secondary-500': '#64748b',
        'secondary-600': '#475569',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
