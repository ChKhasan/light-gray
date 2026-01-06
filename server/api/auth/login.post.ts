import User from '../../models/User'
import bcrypt from 'bcrypt'
import { connectDB } from '../../utils/db'
import { signToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
    await connectDB()
    const { username, password } = await readBody(event)

    const user = await User.findOne({ username })
    if (!user) throw createError({ statusCode: 400, message: 'User not found' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw createError({ statusCode: 400, message: 'Wrong password' })

    return { access_token: signToken({ id: user._id }) }
})
