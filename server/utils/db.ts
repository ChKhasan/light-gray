import mongoose from 'mongoose'

interface MongooseGlobal {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: MongooseGlobal
}

let cached: MongooseGlobal = global.mongoose || { conn: null, promise: null }

export const connectDB = async () => {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI!, {
            bufferCommands: false
        }).then((mongoose) => {
            console.log('✅ MongoDB connected')
            return mongoose
        })
    }

    cached.conn = await cached.promise
    global.mongoose = cached
    return cached.conn
}
