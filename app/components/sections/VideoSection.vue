<script setup lang="ts">

import {VideoPlay} from "@element-plus/icons-vue";

const videos = [
  {
    id: 1,
    title: 'Official Trailer',
    duration: '2:34',
    thumbnail: 'https://placehold.co/640x360/DC2626/ffffff/png',
    videoUrl: '#'
  },
  {
    id: 2,
    title: 'Characters',
    duration: '5:12',
    thumbnail: 'https://placehold.co/640x360/1a1a1a/ffffff/png',
    videoUrl: '#'
  },
  {
    id: 3,
    title: 'Behind the Scenes',
    duration: '8:45',
    thumbnail: 'https://placehold.co/640x360/374151/ffffff/png',
    videoUrl: '#'
  },
]
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="mb-10">
        <h2 class="text-3xl font-bold mb-2">{{$t('overview_videos')}}</h2>
        <p class="text-gray-600">{{ $t('video_subtitle')}}</p>
      </div>

      <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <a
            v-for="(video, i) in videos"
            :key="video.id"
            :href="video.videoUrl"
            target="_blank"
            class="group block"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
        >
          <div class="relative aspect-video bg-gray-200 overflow-hidden rounded-lg">
            <img
                :src="video.thumbnail"
                :alt="video.title"
                class="w-full h-full object-cover"
            />

            <div
                class="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center"
            >
              <div
                  class="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <VideoPlay class="w-8 h-8 text-white fill-white"/>
              </div>
            </div>

            <div
                class="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded"
            >
              {{ video.duration }}
            </div>
          </div>

          <h3
              class="mt-3 font-semibold text-lg group-hover:text-red-600 transition-colors"
          >
            {{ video.title }}
          </h3>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>