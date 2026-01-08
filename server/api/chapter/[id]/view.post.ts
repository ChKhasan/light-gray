// server/api/chapters/[id]/view.post.ts
import { connectDB } from '../../../utils/db'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler(async (event) => {
    await connectDB()
    const id = event.context.params!.id

    const chapter = await Chapter.findById(id)
    if (!chapter) throw createError({ statusCode: 404, message: 'Chapter not found' })

    chapter.viewCount = (chapter.viewCount || 0) + 1
    await chapter.save()

    return { ok: true, viewCount: chapter.viewCount }
})
