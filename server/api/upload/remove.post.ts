import { unlink } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    const { filename } = await readBody(event)

    if (!filename) {
        throw createError({
            statusCode: 400,
            message: 'filename required'
        })
    }

    // XAVFSIZLIK: path traversal oldini olish
    if (filename.includes('..') || filename.includes('/')) {
        throw createError({
            statusCode: 400,
            message: 'Invalid filename'
        })
    }

    const filePath = path.join(
        process.cwd(),
        'public/uploads',
        filename
    )

    try {
        await unlink(filePath)
    } catch {
        throw createError({
            statusCode: 404,
            message: 'File topilmadi'
        })
    }

    return { success: true }
})
