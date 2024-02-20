<template>
  <div class="select-none max-w-xs md:max-w-md m-auto dnet-card space-y-4">
    <div class="text-white space-y-4">
      <h1 class="text-3xl p-4 uppercase">Welcome to daroach.net</h1>
      <!-- <h1 class="pb-2 text-4xl text-white">www.daroach.net</h1> -->
    </div>
    <div class="flex flex-col space-y-2 m-auto">
      <nuxt-img class="mx-auto" src="/media/gagan_daroach_donuts.gif" placeholder />
      <div class="dnet-img-label">Gagan Daroach at Metro Market, Milwaukee 2018</div>
    </div>
    <div class="text-base text-white">
      <p class="dnet-p">
        You have used the power of the internet to connect to a web server in my apartment closet :)
        This website hopes to make the world a better place.
        Help yourself to some milk and donuts and enjoy exploring an expression of my spirit.
        - Gagan
      </p>
      <!-- <p>Help yourself to some milk and donuts...</p> -->
    </div>
    <div class="p-4">
      <NuxtLink to="/" class="dnet-button"> enter daroach.net </NuxtLink>
    </div>
    <!-- <div class="text-base">
      <HitCount :prefix="hitCountText" :debug="false" />
    </div> -->
  </div>
</template>

