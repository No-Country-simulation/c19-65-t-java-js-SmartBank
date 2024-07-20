/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./*.html",
    "./**/*.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'root-background': 'var(--background-color)',
        'root-bg-card': 'var(--background-cards)',
        'root-bg-card2': 'var(--background-cards2)',
        'root-text': 'var(--text-color)',
        'root-header': 'var(--header-bg)',
        'root-navBar': 'var(--navBar)',
        'root-popup': 'var(--popup)'
      },
      alignItems: {
        'normal': 'normal'
      }
    },
  },
  plugins: [],
}
