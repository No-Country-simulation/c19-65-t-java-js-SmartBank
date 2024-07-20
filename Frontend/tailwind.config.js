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
        'root-background': 'var(--bgColor)',
        'root-bg-card': 'var(--bgCards)',
        'root-bg-card2': 'var(--bgCards2)',
        'root-bg-card2Hover': 'var(--bgCards2Hover)',
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
