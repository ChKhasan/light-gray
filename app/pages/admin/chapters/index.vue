<script setup lang="ts">
import {deleteChapter, getChapters} from "~/services/chapter/chapter.service";
import {Delete, Edit, Plus} from "@element-plus/icons-vue"
import {useQueryClient} from "@tanstack/vue-query";
import type {IBaseResponse} from "~/types/api.type";
import type {IChapterDto} from "~/services/chapter/chapter.dto";

const queryClient = useQueryClient()
const {data: chaptersList, isLoading} = useQuery({
  queryKey: [getChapters.name],
  queryFn: () => getChapters(),
  select: (data: IBaseResponse<IChapterDto[]>) => data?.data
})

const {mutate: deleteAction, isPending} = useMutation({
  mutationFn: (id: string) => deleteChapter(id),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: [getChapters.name]})
    ElMessage.success({
      message: "Глава удалена"
    })
  }
})

const deleteChapterAction = (id: string) => {
  ElMessageBox.confirm(
      'Это действие навсегда удалит главу. Продолжить?',
      'Предупреждение',
      {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }
  )
      .then(() => {
        deleteAction(id)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Удаление отменено',
        })
      })
}
</script>

<template>
  <div class="max-w-[1440px] mx-auto mt-10">
    <div class="flex justify-end">
      <el-button type="primary" @click="$router.push('/admin/chapters/create')" :icon="Plus">Создать главу</el-button>
    </div>
    <div>
      <el-table :data="chaptersList" v-loading="isLoading">
        <el-table-column prop="number" label="Номер"/>
        <el-table-column prop="title.ru" label="Заголовок"/>
        <el-table-column prop="text.ru" label="Текст"/>
        <el-table-column prop="imagesCount" label="Изображения"/>
        <el-table-column width="100px" label="Действия">
          <template #default="scope">
            <div>
              <el-button @click="$router.push(`/admin/chapters/${scope.row._id}`)" type="warning" circle plain
                         :icon="Edit"/>
              <el-button type="danger" circle plain :icon="Delete" :loading="isPending"
                         @click="deleteChapterAction(scope.row._id)"/>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
</style>
