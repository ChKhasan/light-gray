import {ref} from "vue";
import {defineStore} from "pinia";
import {useConstants} from "@/composable/useConstants";
import {useToken} from "~/composable/useToken";

export const useUserStore = defineStore("user", () => {
    const {IS_AUTHENTICATED} = useConstants();
    const { clearTokens } = useToken();
    const isAuthenticated = ref(false);

    function setUserLogin(value: boolean, callback?: () => void) {
        isAuthenticated.value = value;
        useCookie(IS_AUTHENTICATED).value = value.toString();
        if (callback) callback();
    }

    function clearUser(callback?: () => void) {
        clearTokens();
        setUserLogin(false);
        if (callback) callback();
    }

    return {
        isAuthenticated,
        clearUser,
        setUserLogin
    };
});
