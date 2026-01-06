<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import {postRegister} from "~/services/auth/auth.service";
const formRef = ref<FormInstance>()
const form = reactive({
  username: "",
  password: ""
})
const rules = {
  username: {
    required: true,
    message: "",
    trigger: 'change'
  },
  password: {
    required: true,
    message: "",
    trigger: 'change'
  }
}
const { mutate: registerSubmit, isPending } = useMutation({
  mutationFn: () => postRegister(form),
  onSuccess: (data) => {
    console.log(data)
  },
})

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return
    registerSubmit()
  })
}
</script>

<template>
  <div>
    <div class="flex flex-col justify-center items-center h-[100vh]">
      <div class="w-full max-w-[300px]">
        <h1 class="text-center">Log In</h1>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="w-full">
          <el-form-item label="Login" prop="username">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password"/>
          </el-form-item>
        </el-form>
        <el-button class="w-full" type="primary" :loading="isPending" @click="submit">Register</el-button>
      </div>
    </div>
  </div>

</template>