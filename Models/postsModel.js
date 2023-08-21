import { ObjectId } from 'bson'
import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema(
    {
        poster: ObjectId,
        title: String,
        caption: String,
        url: String,
        likes: [ObjectId]
    }
)

const Post = new mongoose.model('Post', postSchema)

export default Post