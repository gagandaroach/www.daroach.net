const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)'
      },
      fontFamily: {
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        code: ['var(--font-code)', ...defaultTheme.fontFamily.mono]
      },
      animation: {
        tiles: 'shiftTiles 120s linear infinite'
      },
      keyframes: {
        shiftTiles: {
          '0%': { backgroundPosition: '0 0, 40px 40px' },
          '100%': { backgroundPosition: '1920px 1080px, 1960px 1120px' }
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      },
      transitionTimingFunction: {
        'emphasized': 'var(--ease-emphasized)'
      },
      transitionDuration: {
        'md': 'var(--duration-md)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ]
}
