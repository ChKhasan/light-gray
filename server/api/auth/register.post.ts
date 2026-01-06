import User from '../../models/User'
import { connectDB } from '../../utils/db'
import { signToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
    await connectDB()
    const body = await readBody(event)

    const user: any = await User.create(body)
    const access_token = signToken({ id: user._id })

    return { access_token }
})
