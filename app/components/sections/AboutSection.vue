<script setup lang="ts">
import {getSiteInfo} from "~/services/site-info/site-info.service";

const {t, locale} = useI18n()
const {data} = useQuery({
  queryKey: [getSiteInfo.name],
  queryFn: getSiteInfo,
  select: (data) => data?.data
})
const mangaData = computed(() => (
    {
      title: `${t('main_title')}: ${t('sub_title')}`,
      author: 'Light Gray',
      genres: ['action', 'drama', 'adventure', 'tragedy', 'fantasy'],
      tags: ['super_power', 'war', 'survival', 'friendship', 'revenge', 'world_saving', 'superheroes'],
    }
))
</script>

<template>
  <section class="py-20 bg-white relative overflow-hidden border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Cover -->
        <div class="sm:hidden -mt-10 sm:mt-0 ">
          <h2 class="text-3xl md:text-4xl font-black uppercase mb-2">
            {{ mangaData.title }}
          </h2>

          <p class="text-xl text-gray-500">
            {{ $t('by') }}
            <span class="text-black font-semibold border-b-2 border-red-600">
                {{ mangaData.author }}
              </span>
          </p>
        </div>

        <div
            class="lg:col-span-5"
            data-aos="fade-up"
        >
          <div class="relative aspect-[3/4] bg-gray-200">
            <img
                src="@/assets/cover/Banner_0.png"
                :alt="mangaData.title"
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border-2"
            />
            <div
                class="absolute -bottom-4 -right-4 w-full h-full border-4 border-black -z-10"
            />
          </div>
        </div>

        <!-- Text -->
        <div
            class="lg:col-span-7 pt-8"
            data-aos="fade-up"
        >
          <div class="flex flex-wrap gap-2 mb-6">
             <span class="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase">
               16+
              </span>
            <span
                v-for="genre in mangaData.genres"
                :key="genre"
                class="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase"
            >
                {{ $t('genres.' + genre) }}
              </span>
            <span
                v-for="tag in mangaData.tags"
                :key="tag"
                class="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase"
            >
                {{ $t('tags.' + tag) }}
              </span>
          </div>
          <div class="hidden sm:block">
            <h2 class="text-3xl md:text-4xl font-black uppercase mb-2">
              {{ mangaData.title }}
            </h2>

            <p class="text-xl text-gray-500 mb-8">
              {{ $t('by') }}
              <span class="text-black font-semibold border-b-2 border-red-600">
                {{ mangaData.author }}
              </span>
            </p>
          </div>


          <div class="p-6 bg-gray-50 border-l-4 border-black">
            <h3 class="font-bold uppercase tracking-wider mb-2">
              {{ $t('author_note') }}
            </h3>
            <template v-if="data?.author_note?.[locale]">
              <p class="text-md text-gray-600 italic whitespace-pre-line" v-html="data.author_note[locale]">
              </p>
            </template>

          </div>


        </div>

      </div>
      <div class="mt-10">

      </div>
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            <h1 class="font-bold !text-black uppercase text-base tracking-wider mb-2">{{ $t('about_manga') }}</h1>
          </template>
          <template v-if="data?.about_history?.[locale]">
            <p class="text-gray-800 leading-relaxed text-base" v-html="data.about_history[locale]">
            </p>
          </template>

        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <h1 class="font-bold !text-black text-base uppercase tracking-wider mb-2">{{ $t('world_summary') }}</h1>
          </template>
          <template v-if="data?.description?. [locale]">
            <p class="text-gray-800 leading-relaxed text-base" v-html="data.description[locale]"></p>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<style scoped>

</style>