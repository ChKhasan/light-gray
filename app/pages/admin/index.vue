<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import {postLogin} from "~/services/auth/auth.service";
import type {IAuthLoginDto} from "~/services/auth/auth.dto";
import {useToken} from "~/composable/useToken";
import {useRouter} from "#imports";
import {useUserStore} from "~/store/auth";
const formRef = ref<FormInstance>()
const { setAccessToken } = useToken();
const userStore = useUserStore()
const router = useRouter()
const form = reactive<IAuthLoginDto>({
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

const { mutate: loginSubmit, isPending } = useMutation({
  mutationFn: () => postLogin(form),
  onSuccess: (data) => {
    if(data?.data?.access_token) {
      setAccessToken(data?.data?.access_token)
      userStore.setUserLogin(true, () => {
        setTimeout(() => {
          router.push('/admin/chapters')
        },1000)
      })

    }
  },
})

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return
    loginSubmit()
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
        <el-button class="w-full" type="primary" :loading="isPending" @click="submit">Login</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>