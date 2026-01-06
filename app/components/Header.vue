<script setup lang="ts">
import type {ILang} from "~/types/lang.type";

const {locale, loadLocaleMessages, availableLocales} = useI18n()
const langCookie = useCookie('i18n_redirected')

const changeLanguage = async (lang: ILang) => {
  await loadLocaleMessages(lang)
  locale.value = lang
  langCookie.value = lang
}

</script>

<template>
  <header class="bg-white border-b border-gray-200 py-6 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12 flex w-full justify-between items-center">
      <h1 class="text-3xl font-black">
        Light<span class="text-red-600">Gray</span>
      </h1>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ $t(locale) }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="lang in availableLocales" :key="lang" :disabled="locale === lang" @click="changeLanguage(lang)">
              {{ $t(lang) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style scoped>

</style>