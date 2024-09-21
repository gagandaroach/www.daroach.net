/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'hsu-purp': '#c131d6',
        'hsu-red': '#CF161C',
        'tv-gray': '#292524'
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(red|green|blue|purple|yellow)-(100|200|300|400|500|600|700|800|900)/,
      pattern: /(table)-(auto|fixed)/,
      pattern: /(border)-(collapse|separate)/,
      pattern: /list-(disc|inside|decimal)/
    },
  ]
}
