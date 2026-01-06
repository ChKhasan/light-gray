import axios from "axios";
import type {IAuthLoginDto} from "~/services/auth/auth.dto";

const postLogin = async (body: IAuthLoginDto) => {
    return await axios.post('/api/auth/login',body)
}

const postRegister = async (body: IAuthLoginDto) => {
    return await axios.post('/api/auth/register',body)
}
export { postLogin, postRegister }