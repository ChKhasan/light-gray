import type {IUploadedImage} from "~/services/upload/upload.dto";

export interface IChapterDto {
    _id?: string;
    title: {
        en: string;
        ru: string;
    };
    number?: number | null;
    text?: {
        en: string;
        ru: string;
    };
    images: IUploadedImage[];
    imagesCount?: number;
    viewCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IChapterWithNextPrevDto {
    next?: string | null;
    prev?: string | null;
    chapter: IChapterDto
}