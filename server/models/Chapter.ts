import mongoose from 'mongoose'

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        default: 1,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        required: true
    },
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
            validator: (arr: any[]) => arr.length <= 30,
            message: 'Max 30 ta rasm'
        }
    }
}, {timestamps: true})

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema)
