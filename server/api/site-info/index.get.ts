import SiteInfo from '~~/server/models/SiteInfo'
import {connectDB} from "~~/server/utils/db";

export default defineEventHandler(async () => {
    await connectDB()
    const siteInfo = await SiteInfo.findOne()
    return siteInfo || null
})