import mongoose from 'mongoose'

const SiteInfoSchema = new mongoose.Schema({
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
    author_note: {
        ru: {
            type: String,
            default: ''
        },
        en: {
            type: String,
            default: ''
        }
    },
    about_history: {
        ru: {
            type: String,
            default: ''
        },
        en: {
            type: String,
            default: ''
        }
    },
    description: {
        ru: {
            type: String,
            default: ''
        },
        en: {
            type: String,
            default: ''
        }
    },
    author: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export default mongoose.models.SiteInfo || mongoose.model('SiteInfo', SiteInfoSchema)
