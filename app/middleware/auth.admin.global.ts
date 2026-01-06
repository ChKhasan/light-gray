import {useUserStore} from "~/store/auth";
import {useConstants} from "~/composable/useConstants";

const publicPages = ['/admin', '/admin/register']

export default defineNuxtRouteMiddleware((to, from) => {
    const { IS_AUTHENTICATED } = useConstants()
    const userStore = useUserStore()
    if (!to.path.startsWith('/admin')) return
    if (publicPages.includes(to.path)) return
    const isAuthenticated = computed(() => userStore.isAuthenticated || useCookie(IS_AUTHENTICATED).value)
    if (!isAuthenticated.value) {
        return abortNavigation({
            statusCode: 404,
            statusMessage: 'Page not found'
        })
    }
})
