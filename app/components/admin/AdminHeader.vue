<script setup lang="ts">
const activeIndex = ref('2');
const handleSelect = (key: string) => {
  activeIndex.value = key;
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <el-menu-item index="1" @click="$router.push(`/`)">Home</el-menu-item>
    <el-menu-item index="2" @click="$router.push(`/admin/chapters`)">Chapters</el-menu-item>
    <el-menu-item index="3" @click="$router.push(`/admin/site-info`)">Site info</el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>