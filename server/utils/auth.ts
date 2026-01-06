import { verifyToken } from './jwt'

export default defineEventHandler(async (event) => {
    const auth = getHeader(event, 'authorization')
    if (!auth) {
        throw createError({ statusCode: 401, statusMessage: 'Auth required' })
    }

    const token = auth.split(' ')[1]
    const user = await verifyToken(token)

    event.context.user = user
})
