/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./*.html",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'root-background': 'var(--background-color)',
        'root-text': 'var(--text-color)',
        'root-header': 'var(--header-bg)',
        'root-navBar': 'var(--navBar)'
      }
    },
  },
  plugins: [],
}
