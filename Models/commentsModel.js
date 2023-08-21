import { ObjectId } from 'bson'
import mongoose from 'mongoose'

export const commentSchema = new mongoose.Schema(
    {
        commentAuthor: ObjectId,
        commentText: String,
        whatPost: ObjectId,
        likes: [ObjectId],
    }
)

const Comments = mongoose.model('Comments', commentSchema)

export default Comments