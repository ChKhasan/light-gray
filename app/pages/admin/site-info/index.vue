<script setup lang="ts">
import type {FormInstance} from "element-plus";
import type {IBaseResponse} from "~/types/api.type";
import {useRouter} from "#imports";
import {Plus} from "@element-plus/icons-vue"
import {useQueryClient} from "@tanstack/vue-query";
import type {FormRules} from 'element-plus'
import type {ISiteInfoDto} from "~/services/site-info/site-info.dto";
import {getSiteInfo, postSiteInfo} from "~/services/site-info/site-info.service";
import type {ILang} from "~/types/lang.type";

const router = useRouter()
const route = useRoute();
const activeLang = ref('en')
const queryClient = useQueryClient()
const formRef = ref<FormInstance>();
const form = reactive<ISiteInfoDto>({
  title: {
    ru: "",
    en: "",
  },
  author_note: {
    ru: "",
    en: "",
  },
  about_history: {
    ru: "",
    en: "",
  },
  description: {
    ru: "",
    en: "",
  },
  author: ""
})


const rules: FormRules = {
  title: [
    {
      validator: (_, __, callback) => {
        if (!form.title[activeLang.value as ILang]) {
          callback(new Error('Пожалуйста, введите заголовок сайта'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],

  author_note: [
    {
      validator: (_, __, callback) => {
        if (!form.author_note[activeLang.value as ILang]) {
          callback(new Error('Пожалуйста, введите примечание автора'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  about_history: [
    {
      validator: (_, __, callback) => {
        if (!form.about_history[activeLang.value as ILang]) {
          callback(new Error('Пожалуйста, заполните историю'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  description: [
    {
      validator: (_, __, callback) => {
        if (!form.description[activeLang.value as ILang]) {
          callback(new Error('Пожалуйста, введите описание сайта'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],

  author: [
    {
      required: true,
      message: 'Пожалуйста, укажите автора',
      trigger: 'change',
    },
  ],
}

const {isLoading} = useQuery({
  queryKey: [getSiteInfo.name],
  queryFn: getSiteInfo,
  select: (data: IBaseResponse<ISiteInfoDto>) => {
    Object.keys(form).forEach((item) => {
      const key = item as keyof ISiteInfoDto
      const value = data.data[key];
      if (!['', undefined, null].includes(value as any)) {
        (form[key] as any) = value
      }
    })
  },
})

const {mutate: postSiteInfoSubmit, isPending} = useMutation<IBaseResponse<ISiteInfoDto>, Error, void>({
  mutationFn: () => postSiteInfo(form),
  onSuccess: () => {
    ElMessage.success({
      message: "Данные сохранены"
    });
    router.push('/admin/chapters')
  }
})

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return
    postSiteInfoSubmit()
  })
}
</script>

<template>
  <div class="flex flex-col max-w-[800px] mt-10 mx-auto w-full" v-loading="isLoading">
    <el-tabs v-model="activeLang" class="demo-tabs">
      <el-tab-pane label="English" name="en"></el-tab-pane>
      <el-tab-pane label="Russian" name="ru"></el-tab-pane>
    </el-tabs>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="w-full">
      <el-form-item label="Заголовок сайта" prop="title">
        <el-input v-model="form.title[activeLang as ILang]" />
      </el-form-item>

      <el-form-item label="Примечание автора" prop="author_note">
        <el-input type="textarea" :rows="6" v-model="form.author_note[activeLang as ILang]" />
      </el-form-item>

      <el-form-item label="История" prop="about_history">
        <el-input type="textarea" :rows="6" v-model="form.about_history[activeLang as ILang]" />
      </el-form-item>

      <el-form-item label="Описание сайта" prop="description">
        <el-input type="textarea" :rows="6" v-model="form.description[activeLang as ILang]" />
      </el-form-item>

      <el-form-item label="Автор" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>
    </el-form>
    <div class="flex justify-between">
      <el-button type="info" @click="$router.push('/admin/chapters')">Назад</el-button>
      <el-button type="primary" @click="submit" :loading="isPending" :icon="Plus">Сохранять</el-button>
    </div>
  </div>
</template>

<style scoped>
</style>
