import { connectDB } from '../../utils/db'
import auth from '../../utils/auth'
import Chapter from "~~/server/models/Chapter";

export default defineEventHandler({
    onRequest: [auth],
    handler: async (event) => {
        await connectDB()
        await Chapter.findByIdAndDelete(event.context.params!.id)
        return { success: true }
    }
})
