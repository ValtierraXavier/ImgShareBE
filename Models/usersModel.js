import mongoose from 'mongoose'
import CommentSchema from './commentsModel.js'
export let userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            select: true
        },
        name: {
            type: String,
            select: true
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            select: true
        },
        userSince: String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        postLikes: [mongoose.Schema.Types.ObjectId],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }],        
        commentLikes: [mongoose.Schema.Types.ObjectId],
        following: [mongoose.Schema.Types.ObjectId],
        encPassword: {
            type: String,
            required: true,
            select: false
        }
    }
)

let UsersSchema = mongoose.model('User', userSchema)

export default UsersSchema