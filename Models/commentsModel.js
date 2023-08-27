import { ObjectId } from 'bson'
import mongoose from 'mongoose'
// import UsersSchema from './usersModel.js'


export let commentSchema = new mongoose.Schema(
    {
        commentAuthor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        commentText: {
            type: String,
            require: true
        },
        whatPost: mongoose.Schema.Types.ObjectId,
        likes: Array
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref : LikesSchema
        // }
    }
)

let CommentsSchema = mongoose.model('Comments', commentSchema)

export default CommentsSchema