import mongoose from 'mongoose'
import UsersSchema from './usersModel.js'

export let postSchema = new mongoose.Schema(
    {
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: String,
        caption: String,
        url: String,
        likes: [mongoose.Schema.Types.ObjectId]
    }
)

let PostsSchema = mongoose.model('Post', postSchema)

export default PostsSchema