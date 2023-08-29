import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema(
    {
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: String,
        caption: String,
        url: String,
        likes: [mongoose.Schema.Types.ObjectId],
        postComments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]
    }
)

const PostsSchema = mongoose.model('Post', postSchema)

export default PostsSchema