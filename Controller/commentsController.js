import Comments from '../Models/commentsModel.js'
import Users from '../Models/usersModel.js'
import Posts from '../Models/postsModel.js'

export const getComments = async (req, res)=>{
    try{
        const comments = await Comments.find({})
        await res.json(comments)
    }catch(error){console.log(error)}
}

export const getComment = async (req, res)=>{
    const {id} = req.params.id
    try{
        const comment = await Comments.findById(id)
        if(comment){
            await res.json(comment)
        }else if(!comment){
            await res.send('Record Does Not Exist... =(')
        }
    }catch(error){console.log(error)}
}

export const postComment = async (req, res)=>{
    try{
        const body = req.body
        const newComment =  new Comments(body)
        await newComment.save()
        res.send(newComment._id)
    }catch(error){console.log(error)}
}

export const updateComment = async(req, res)=>{
    try{
        const {id} = req.params
        const {body} = req.body
        const originalComment = await Comments.findById(id)
        const commentEdit = await Comments.findByIdAndUpdate(id, body)
        await commentEdit.save()
        await res.send(`${originalComment}\b\b was changed to\b\b ${commentEdit}`)
    }catch(error){console.log(error)}
}

export const deleteComment = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Comments.findById(id)
        await Comments.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}