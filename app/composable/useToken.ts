import {useConstants} from "@/composable/useConstants";

export const useToken = () => {
    const {ACCESS_TOKEN} = useConstants();
    const setAccessToken = (token: string) => {
        useCookie(ACCESS_TOKEN).value = token;
    };
    const getAccessToken = () => {
        return useCookie(ACCESS_TOKEN).value;
    };
    const clearTokens = () => {
        useCookie(ACCESS_TOKEN).value = "";
    };

    return {
        setAccessToken,
        getAccessToken,
        clearTokens,
    };
};
