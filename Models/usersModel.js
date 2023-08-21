import { ObjectId } from 'bson'
import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema(
    {
        name: String,
        userName: String,
        userSince: Date,
        posts: [ObjectId],
        comments: [ObjectId],        
        commentLikes: [ObjectId],
        postLikes: [ObjectId],
        following: [ObjectId],
    }
)

const User = new mongoose.model('User', userSchema)

export default User