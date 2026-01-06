import SiteInfo from '~~/server/models/SiteInfo'
import {connectDB} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    await connectDB()
    const body = await readBody(event)

    const siteInfo = await SiteInfo.findOneAndUpdate(
        {},
        { $set: body },
        {
            new: true,
            upsert: true
        }
    )

    return siteInfo
})
