<template>
    <div class="flex flex-row text-sm text-stone-500 space-x-2">
        <!-- <div v-for="(_, index) in names" :key="index">
            <NuxtLink :to="names[index]"> {{ lastPath[index] }}</NuxtLink>
        </div> -->
        {{ router.currentRoute.value.path }}
    </div>
</template>



<script setup>
const router = useRouter();
// const path = ref(router.currentRoute.value.path);

// const names = ref(getParentUrls(path.value));
// const lastPath = path.split('/');

// // console.log(router.currentRoute.value.path)
// // console.log(getParentUrls(router.currentRoute.value.path))

</script>

<script>
function getParentUrls(url) {
    // Split the URL into an array of paths
    const paths = url.split('/')

    // Create an array of parent URLs
    const parentUrls = []

    // Iterate over the paths in reverse order
    for (let i = paths.length - 1; i >= 0; i--) {
        // Create a new URL with the current path and the previous paths
        const parentUrl = paths.slice(0, i + 1).join('/')

        // If the parent URL is not the root URL, add it to the parent URLs array
        if (parentUrl !== '/') {
            parentUrls.push(parentUrl)
        }
    }

    // Return the parent URLs
    return parentUrls.reverse()
}
</script>