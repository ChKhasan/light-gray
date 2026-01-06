import { mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    const file = formData?.find(f => f.name === 'file')

    if (!file) {
        throw createError({
            statusCode: 400,
            message: 'File topilmadi'
        })
    }

    if (!file.type?.startsWith('image/')) {
        throw createError({
            statusCode: 400,
            message: 'Faqat rasm yuklash mumkin'
        })
    }

    const uploadsDir = path.join(process.cwd(), 'public/uploads')
    await mkdir(uploadsDir, { recursive: true })

    const filenameBase = `${Date.now()}-${Math.random().toString(36).slice(2)}`

    const optimizedFilename = `${filenameBase}.webp`
    const filePath = path.join(uploadsDir, optimizedFilename)

    await sharp(file.data)
        .resize({ width: 2048, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(filePath)

    return {
        url: `/uploads/${optimizedFilename}`,
        filename: optimizedFilename
    }
})
