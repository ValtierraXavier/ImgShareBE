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
            select: true,
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
        postLikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }],        
        commentLikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }],
        encPassword: {
            type: String,
            required: true,
            select: false
        }
    }
)

let UsersSchema = mongoose.model('User', userSchema)

export default UsersSchema