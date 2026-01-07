import type {IBaseResponse} from "~/composable/useImageUpload";
import axios, {type AxiosResponse} from "axios";
import type {ISiteInfoDto} from "~/services/site-info/site-info.dto";

const getSiteInfo = (): Promise<AxiosResponse<IBaseResponse<ISiteInfoDto>>> => {
    return axios.get('/api/site-info')
}

const postSiteInfo = async (body: ISiteInfoDto): Promise<AxiosResponse<IBaseResponse<ISiteInfoDto>>> => {
    return await axios.post('/api/site-info', body)
}

export {getSiteInfo, postSiteInfo}