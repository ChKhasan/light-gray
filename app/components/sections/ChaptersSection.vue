<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {getChapters} from "~/services/chapter/chapter.service";

const { locale } = useI18n()
const {data: chapters, isLoading} = useQuery({
  queryKey: [getChapters.name],
  queryFn: getChapters,
  select: (data) => data?.data
})
</script>

<template>
  <section class="py-10 md:py-20 bg-gray-50 border-t border-gray-200" v-loading="isLoading">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <h2 class="text-4xl font-black mb-5 md:mb-10">{{$t('chapters')}}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="(chapter, i) in chapters"
            :key="i"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
        >
          <NuxtLink
              :to="`/chapter/${chapter._id}`"
              class="block p-6 bg-white border-2 hover:border-black transition rounded-lg"
          >
            <div class="flex justify-between">
              <div>
                  <span class="text-2xl font-black text-red-600">
                    #{{ chapter.number }}
                  </span>
                <h3 class="font-bold mt-2"> {{ chapter.title[locale] }} </h3>
                <p class="text-sm text-gray-500">
                  {{ chapter.imagesCount }} {{$t('pages')}}
                </p>
              </div>
              <ArrowRight class="w-5 h-5 text-gray-400"/>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>