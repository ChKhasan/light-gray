<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup >
useSeoMeta({
  title: 'Light Gray — Mortal Heroes Webcomic',
  description: 'Discover the world of Light Gray: an action-packed webcomic featuring Mortal Heroes, friendship, revenge, and survival. Read chapters online in English or Russian.',
  ogTitle: 'Light Gray – Mortal Heroes: Carousel of Valuable Frames',
  ogDescription: 'Dive into an epic webcomic with action, fantasy, and adventure. Follow the story of heroes and their struggles in Light Gray.',
  ogImage: 'https://www.light-gray.art/og-image.png', // agar rasm bo‘lsa, yo‘lini almashtir
  ogUrl: 'https://www.light-gray.art',
  twitterCard: 'summary_large_image',
  canonical: 'https://www.light-gray.art'
})

</script>