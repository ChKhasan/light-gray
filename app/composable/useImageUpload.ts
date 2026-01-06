import {deleteUpload, postUpload} from "~/services/upload/upload.service";
import type {IUploadedImage} from "~/services/upload/upload.dto";
export interface IBaseResponse<T> {
    data: T
    message?: string
    success?: boolean
}
export const useImageUpload = () => {
    const uploadMutation = useMutation<IBaseResponse<IUploadedImage>,unknown,FormData>({
        mutationFn: postUpload
    })

    const removeMutation = useMutation<void, Error, string>({
        mutationFn: (filename: string): Promise<any> => deleteUpload(filename)
    })

    return {
        uploadMutation,
        removeMutation
    }
}
