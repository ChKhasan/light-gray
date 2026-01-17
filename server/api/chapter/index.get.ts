import { connectDB } from '../../utils/db'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler(async (event) => {
    await connectDB()
    const host = getRequestHeader(event, 'host') || ''

    // faqat light-gray.art yoki localhost ruxsat
    if (!host.includes('light-gray.art') && !host.includes('localhost')) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }
    const chapters = await Chapter.aggregate([
        { $sort: { createdAt: -1 } },
        {
            $project: {
                title: 1,
                number: 1,
                description: 1,
                text: 1,
                imagesCount: { $size: "$images" },
                createdAt: 1,
                updatedAt: 1,
                viewCount: 1
            }
        }
    ])

    return chapters
})
