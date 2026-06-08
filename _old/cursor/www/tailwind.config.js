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
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-code)', ...defaultTheme.fontFamily.mono],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'tiles': 'shiftTiles 120s linear infinite'
      },
      keyframes: {
        shiftTiles: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '1920px 1080px' }
        }
      },
      borderRadius: {
        DEFAULT: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
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
