<template>
  <div class="select-none max-w-xs md:max-w-md bg-green-600">
    <h1 class="pb-2">Welcome to Daroach.net</h1>
    <div>
      <NuxtImage class="object-scale-down" src="/donuts.gif" />
      <div class="text-sm text-gray-100 text-right">Gagan Daroach</div>
    </div>
    <div class="text-base my-4 space-y-2 text-white">
      <p>
        You have used the power of the internet to connect to my personal
        website, running on a web server in my apartment.
      </p>
      <p>Help yourself to some milk and donuts :)</p>
    </div>
    <div class="m-6">
      <NuxtLink to="/" class="dnet-button"> enter daroach.net </NuxtLink>
    </div>
    <!-- <div class="text-base">
      <HitCount :prefix="hitCountText" :debug="false" />
    </div> -->
  </div>
</template>

