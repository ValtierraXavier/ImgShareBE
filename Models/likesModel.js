import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema(
    {
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        },
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]

    }
)

const LikesSchema = mongoose.model("Likes", likesSchema)

export default LikesSchema