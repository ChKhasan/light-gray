// server/api/chapters/[id]/view.post.ts
import { connectDB } from '../../../utils/db'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler(async (event) => {
    await connectDB()
    const id = event.context.params!.id

    const chapter = await Chapter.findByIdAndUpdate(
        id,
        { $inc: { viewCount: 1 } },
        { new: true, projection: { viewCount: 1 } }
    )
    if (!chapter) throw createError({ statusCode: 404, message: 'Chapter not found' })

    return { ok: true, viewCount: chapter.viewCount }
})
