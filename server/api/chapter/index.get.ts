import { connectDB } from '../../utils/db'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler(async () => {
    await connectDB()
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
