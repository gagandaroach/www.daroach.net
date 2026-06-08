<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutNavBar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
