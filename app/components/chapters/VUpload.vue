<script setup lang="ts">
import type { UploadFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue';
import type {IUploadedImage} from "~/services/upload/upload.dto";
import {useImageUpload} from "~/composable/useImageUpload";

const props = defineProps<{
  modelValue: IUploadedImage[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IUploadedImage[]): void
}>()

const { uploadMutation, removeMutation } = useImageUpload()

const fileList = computed(() =>
    props.modelValue.map(img => ({
      name: img.filename,
      url: img.url
    }))
)
let uploadQueue = Promise.resolve()
const handleUpload: UploadProps['httpRequest'] = (options) => {
  uploadQueue = uploadQueue.then(async () => {
    try {
      const formData = new FormData()
      formData.append('file', options.file)

      const res = await uploadMutation.mutateAsync(formData)
      const data = res.data

      emit('update:modelValue', [
        ...props.modelValue,
        data
      ])
    } catch (e) {
      console.error(e)
      ElMessage.error('Upload xatolik')
    }
  })

  return uploadQueue
}

const handleRemove = async (file: UploadFile) => {
  const filename = file.name

  try {
    await removeMutation.mutateAsync(filename)
    emit(
        'update:modelValue',
        props.modelValue.filter(i => i.filename !== filename)
    )
  } catch {
    ElMessage.error('Delete xatolik')
    return false
  }
}
</script>

<template>
  <el-upload
      class="image-uploader"
      action=""
      :http-request="handleUpload"
      :file-list="fileList"
      list-type="picture-card"
      :limit="40"
      multiple
      accept="image/*"
      :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>
