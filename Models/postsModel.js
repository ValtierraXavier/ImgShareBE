import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema(
    {
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        title: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 30,
        },

        caption: String,
        url: {
            type: String,
            require: true
        },
        likes: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        postComments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]
    }
)

const PostsSchema = mongoose.model('Post', postSchema)

export default PostsSchema