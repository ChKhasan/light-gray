import axios, {type AxiosResponse} from "axios";
import api from "~/composable/api";
import type {IChapterDto, IChapterWithNextPrevDto} from "~/services/chapter/chapter.dto";
import type {IBaseResponse} from "~/types/api.type";

const getChapters = (): Promise<IBaseResponse<IChapterDto[]>> => {
    return  axios.get('/api/chapter')
};

const getChapterById = async (id: string | undefined | string[]): Promise<IBaseResponse<IChapterWithNextPrevDto>> => {
    return axios.get(`/api/chapter/${id}`)
}

const postChapter = async (body: IChapterDto): Promise<IBaseResponse<IChapterDto>> => {
    return await api.post('/api/chapter',body)
}

const deleteChapter = async (id: string) => {
    return await api.delete(`/api/chapter/${id}`)
}

const patchChapter = async (id: string, body: IChapterDto): Promise<IBaseResponse<IChapterDto>>  => {
    return await api.put(`/api/chapter/${id}`,body)
}

export { getChapters, postChapter, deleteChapter, patchChapter, getChapterById }