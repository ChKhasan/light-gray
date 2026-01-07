import sharp from 'sharp'
import { supabase } from '../../utils/supabase'
import dayjs from 'dayjs';

function slugifyFilename(name: string) {
    return name
        .toLowerCase()
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-z0-9]+/g, '-')
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
    const safeName = slugifyFilename(originalName)
    const timestamp = dayjs().format('DD-MM-YYYY_HH-mm-ss')
    const filename = `${safeName}-${timestamp}.webp`

    const { error } = await supabase.storage
        .from('uploads')
        .upload(filename, optimizedBuffer, {
            contentType: 'image/webp',
            upsert: false
        })

    if (error) {
        throw createError({ statusCode: 500, message: error.message })
    }

    const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filename)

    return {
        url: data.publicUrl,
        filename
    }
})
