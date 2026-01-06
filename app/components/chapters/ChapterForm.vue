<script setup lang="ts">
import VUpload from "~/components/chapters/VUpload.vue";
import type {FormInstance} from "element-plus";
import {getChapterById, getChapters, patchChapter, postChapter} from "~/services/chapter/chapter.service";
import type {IChapterDto} from "~/services/chapter/chapter.dto";
import type {IBaseResponse} from "~/types/api.type";
import {useRouter} from "#imports";
import {Plus} from "@element-plus/icons-vue"
import {useQueryClient} from "@tanstack/vue-query";
import type {FormRules} from 'element-plus'

const router = useRouter()
const route = useRoute();
const chapterId: string = route.params?.id as string
const queryClient = useQueryClient()
const formRef = ref<FormInstance>();
const form = reactive<IChapterDto>({
  title: "",
  number: null,
  text: "",
  description: "",
  images: []
})

const rules: FormRules = {
  title: [{required: true, message: 'Пожалуйста, введите заголовок', trigger: 'change'}],
  text: [{required: true, message: 'Пожалуйста, введите текст', trigger: 'change'}],
  number: [{required: true, message: 'Пожалуйста, введите номер', trigger: 'change'}],
  description: [{required: true, message: 'Пожалуйста, введите описание', trigger: 'change'}],
  images: [{type: 'array', required: true, message: 'Необходимо добавить изображения', trigger: 'change'}],
}

const {isLoading} = useQuery({
  queryKey: [`${getChapterById.name}_${chapterId}`],
  queryFn: () => getChapterById(chapterId),
  select: (data: IBaseResponse<IChapterDto>) => {
    Object.keys(form).forEach((item) => {
      const key = item as keyof IChapterDto
      const value = data.data[key];
      if (!['', undefined, null].includes(value as any)) {
        (form[key] as any) = value
      }
    })
  },
  enabled: !!chapterId
})

const {mutate: postChapterSubmit, isPending} = useMutation<IBaseResponse<IChapterDto>, Error, void>({
  mutationFn: () => chapterId ? patchChapter(chapterId, form) : postChapter(form),
  onSuccess: () => {
    ElMessage.success({
      message: chapterId ? "Глава обновлена" : "Глава создана"
    });
    queryClient.invalidateQueries({queryKey: [getChapters.name]})
    router.push('/admin/chapters')
  }
})

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return
    postChapterSubmit()
  })
}
</script>

<template>
  <div class="flex flex-col max-w-[500px] mt-10 mx-auto w-full" v-loading="isLoading">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="w-full">
      <el-form-item label="Заголовок" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="Номер" prop="number">
        <el-input type="number" :min="0" v-model="form.number"/>
      </el-form-item>
      <el-form-item label="Текст" prop="text">
        <el-input v-model="form.text"/>
      </el-form-item>
      <el-form-item label="Описание" prop="description">
        <el-input type="textarea" v-model="form.description"/>
      </el-form-item>
      <el-form-item label="Изображения" prop="images">
        <v-upload v-model="form.images"/>
      </el-form-item>
    </el-form>
    <div class="flex justify-between">
      <el-button type="info" @click="$router.push('/admin/chapters')">Назад</el-button>
      <el-button type="primary" @click="submit" :loading="isPending" :icon="Plus">Создать</el-button>
    </div>
  </div>
</template>

<style scoped>
</style>
