<template>
  <div class="min-h-screen bg-gray-900" v-loading="isLoading">
    <nav class="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <House class="w-5 h-5"/>
          <span class="font-bold uppercase tracking-wider text-sm hidden sm:block">
            {{ $t('back_to_home') }}
          </span>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <h1 class="font-bold text-white hidden sm:block">
            {{ $t('chapter') }} {{ chapter?.number }}: {{ chapter?.title[locale] }}
          </h1>
          <div class="bg-red-600 px-3 py-1 rounded text-sm font-bold text-white">
            {{ totalPages }} {{ $t('pages') }}
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-3 py-5 md:px-4 md:py-8">
      <div class="space-y-2">
        <div
            v-for="(page, index) in chapter?.images || []"
            :key="index"
            class="relative group"
        >
          <div class="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-bold z-10">
            {{ index + 1 }} / {{ totalPages }}
          </div>

          <img
              :src="page.url"
              :alt="`Page ${index + 1}`"
              class="w-full h-auto shadow-2xl"
              loading="lazy"
          />
        </div>
      </div>

      <div class="mt-12 text-center py-12 border-t-2 border-gray-800">
        <h2 class="text-2xl font-black text-white mb-4">
          {{ $t('end_of_chapter') }} {{ chapter?.number }}
        </h2>
        <p class="text-gray-400 mb-8">{{ $t('thanks_for_reading') }}</p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
              @click="$router.push(`/chapter/${prevId}`)"
              :disabled="!prevId"
              :class="{ 'opacity-50 pointer-events-none': !prevId }"
              class="px-8 py-3 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            {{ $t('prev_chapter') }}
          </button>
          <button
              @click="$router.push(`/chapter/${nextId}`)"
              :disabled="!nextId"
              :class="{ 'opacity-50 pointer-events-none': !nextId }"
              class="px-8 py-3 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            {{ $t('next_chapter') }}
          </button>
        </div>
        <div class="flex justify-center w-full mt-4">
          <NuxtLink
              to="/"
              class="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
          >
            {{ $t('back_to_chapters') }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 z-50"
        aria-label="Scroll to top"
    >
      <ArrowUp class="w-6 h-6"/>
    </button>
    <div class="fixed bottom-0 left-0 right-0 h-1 bg-gray-800 z-50">
      <div
          class="h-full bg-red-600 transition-all duration-150"
          :style="{ width: progress + '%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {useRoute} from '#imports'
import {House, ArrowUp} from '@element-plus/icons-vue'
import {getChapterById} from "~/services/chapter/chapter.service";

const { locale } = useI18n()
const route = useRoute()
const id: string | undefined | string[] = route.params.id
const nextId = ref<string | null | undefined>(null);
const prevId = ref<string | null | undefined>(null);
const showScrollTop = ref(false)
const scrollY = ref(0)

const onScroll = () => {
  scrollY.value = window.scrollY
  showScrollTop.value = scrollY.value > 500
}

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

const progress = computed(() => {
  const height =
      document.documentElement.scrollHeight - window.innerHeight
  return height > 0 ? (scrollY.value / height) * 100 : 0
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const {data: chapter, isLoading} = useQuery({
  queryKey: [`${getChapterById.name}_${id}`],
  queryFn: () => getChapterById(id),
  select: (data) => {
    prevId.value = data?.data?.prev;
    nextId.value = data?.data?.next;
    return data?.data?.chapter
  }
})
const totalPages = computed(() => chapter.value?.images?.length)

</script>
