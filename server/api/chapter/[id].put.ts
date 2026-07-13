import { connectDB } from '../../utils/db'
import auth from '../../utils/auth'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler({
    onRequest: [auth],
    handler: async (event) => {
        await connectDB()
        const body = await readBody(event)

        return await Chapter.findByIdAndUpdate(
            event.context.params!.id,
            body,
            { new: true, runValidators: true }
        )
    }
})
