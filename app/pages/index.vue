<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header/>
    <!-- Video Section -->
<!--    <VideoSection/>-->
    <!-- Synopsis -->
    <AboutSection/>
    <!-- Chapters -->
    <ChaptersSection/>
    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import VideoSection from "~/components/sections/VideoSection.vue";
import ChaptersSection from "~/components/sections/ChaptersSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWorkSeries",
        "name": "Light Gray",
        "genre": ["Action", "Fantasy", "Drama"],
        "url": "https://www.light-gray.art"
      })
    }
  ]
})

</script>
