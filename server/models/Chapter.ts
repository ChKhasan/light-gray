import mongoose from 'mongoose'

const ChapterSchema = new mongoose.Schema({
    title: {
        ru: {
            type: String,
            default: '',
            required: true
        },
        en: {
            type: String,
            default: '',
            required: true
        }
    },
    number: {
        type: Number,
        default: 1,
        required: true
    },
    text: {
        ru: {
            type: String,
            default: '',
            required: true
        },
        en: {
            type: String,
            default: '',
            required: true
        }
    },
    viewCount: { type: Number, default: 0 },
    images: {
        type: [
            {
                url: {
                    type: String,
                    required: true
                },
                filename: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: {
            validator: (arr: any[]) => arr.length <= 40,
            message: 'Max 40 ta rasm'
        }
    }
}, {timestamps: true})

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema)
