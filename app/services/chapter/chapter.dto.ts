import type {IUploadedImage} from "~/services/upload/upload.dto";

export interface IChapterDto {
    _id?: string;
    title: string;
    number?: number | null;
    description?: string;
    text?: string;
    images: IUploadedImage[];
    imagesCount?: number;
}

export interface IChapterWithNextPrevDto {
    next?: string | null;
    prev?: string | null;
    chapter: IChapterDto
}