// useTheme — thin wrapper over @nuxtjs/color-mode (§5.5).
//
// v1 is dark-only-polished, but the toggle is wired now so adding a light
// theme later is purely additive. color-mode is configured with
// `classSuffix: ''` so it toggles the `.dark` class that Tailwind v4's
// `@custom-variant dark` keys off of (see app/assets/css/main.css).
export function useTheme() {
  const colorMode = useColorMode()

  // `value` is the *resolved* mode ('dark' | 'light'); `preference` is what the
  // user picked ('system' | 'dark' | 'light'). We flip the preference.
  const isDark = computed(() => colorMode.value === 'dark')

  function toggle() {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  function set(mode: 'light' | 'dark' | 'system') {
    colorMode.preference = mode
  }

  return { colorMode, isDark, toggle, set }
}
