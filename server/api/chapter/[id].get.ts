import { connectDB } from '../../utils/db'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler(async (event) => {
    await connectDB()
    const id = event.context.params!.id

    const chapter = await Chapter.findById(id)
    if (!chapter) {
        throw createError({ statusCode: 404, message: 'Chapter not found' })
    }

    const next = await Chapter.findOne({
        mangaId: chapter.mangaId,
        _id: { $gt: chapter._id }
    }).sort({ _id: 1 })

    const prev = await Chapter.findOne({
        mangaId: chapter.mangaId,
        _id: { $lt: chapter._id }
    }).sort({ _id: -1 })

    return {
        chapter,
        prev: prev?._id || null,
        next: next?._id || null
    }
})
