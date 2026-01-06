import axios from "axios";
import type {IUploadedImage} from "~/services/upload/upload.dto";
import type {IBaseResponse} from "~/composable/useImageUpload";

const postUpload = async (formData: FormData): Promise<IBaseResponse<IUploadedImage>> => {
    return await axios.post('/api/upload', formData)
}

const deleteUpload = async (filename: string) => {
    return await axios.post(`/api/upload/remove`,{ filename })
}

export { postUpload, deleteUpload }