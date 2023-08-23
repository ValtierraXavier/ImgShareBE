import { ObjectId } from 'bson'
import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema(
    {
        email: String,
        userName: String,
        userSince: Date,
        posts: [ObjectId],
        postLikes: [ObjectId],
        comments: [ObjectId],        
        commentLikes: [ObjectId],
        following: [ObjectId],
        encPassword: String
    }
)

const User = new mongoose.model('User', userSchema)

export default User