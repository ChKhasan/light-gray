import sharp from 'sharp'
import { supabase } from '../../utils/supabase'
import dayjs from 'dayjs'

function slugify(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    const file = formData?.find(f => f.name === 'file')

    if (!file) {
        throw createError({ statusCode: 400, message: 'File topilmadi' })
    }

    if (!file.type?.startsWith('image/')) {
        throw createError({ statusCode: 400, message: 'Faqat rasm yuklash mumkin' })
    }

    const optimizedBuffer = await sharp(file.data)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer()

    const originalName = file.filename || 'image'
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')

    // 🔹 faqat birinchi "-" gacha papka
    const dashIndex = nameWithoutExt.indexOf('-')
    const folderRaw = dashIndex !== -1
        ? nameWithoutExt.slice(0, dashIndex)
        : nameWithoutExt

    const folderName = slugify(folderRaw)
    const fileBaseName = slugify(nameWithoutExt)

    const timestamp = dayjs().format('DD-MM-YYYY_HH-mm-ss')

    const filePath = `${folderName}/${fileBaseName}-${timestamp}.webp`

    const { error } = await supabase.storage
        .from('uploads')
        .upload(filePath, optimizedBuffer, {
            contentType: 'image/webp',
            upsert: false
        })

    if (error) {
        throw createError({ statusCode: 500, message: error.message })
    }

    const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

    return {
        url: data.publicUrl,
        filename: filePath
    }
})
