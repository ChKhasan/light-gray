import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const { filename } = await readBody(event)

    if (!filename) {
        throw createError({
            statusCode: 400,
            message: 'path required'
        })
    }

    // 🔒 Path traversal himoyasi
    if (filename.includes('..')) {
        throw createError({
            statusCode: 400,
            message: 'Invalid path'
        })
    }

    const { error } = await supabase.storage
        .from('uploads')
        .remove([filename])

    if (error) {
        throw createError({
            statusCode: 500,
            message: error.message
        })
    }

    return { success: true }
})
