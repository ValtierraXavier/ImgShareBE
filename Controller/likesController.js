import Users from '../Models/usersModel.js'
import Likes from '../Models/likesModel.js'

export const getLikes = async (req, res)=>{
    try{
        const comments = await Likes.find({})
        await res.json(comments)
    }catch(error){console.log(error)}
}

export const getLike = async (req, res)=>{
    const {id} = req.params
    try{
        const comment = await Likes.findById(id)
        if(comment){
            await res.json(comment)
        }else if(!comment){
            await res.send('Record Does Not Exist... =(')
        }
    }catch(error){console.log(error)}
}

export const postLike = async (req, res)=>{
    try{
        const body = req.body
        const newComment =  new Likes(body)
        await newComment.save()
        res.send(newComment._id)
    }catch(error){console.log(error)}
}

export const putLike = async(req, res)=>{
    try{
        const {id} = req.params
        const {body} = req.body
        const originalComment = await Likes.findById(id)
        const commentEdit = await Likes.findByIdAndUpdate(id, body)
        await commentEdit.save()
        await res.send(`${originalComment}\b\b was changed to\b\b ${commentEdit}`)
    }catch(error){console.log(error)}
}

export const deleteLike = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Likes.findById(id)
        await Likes.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}

export const linkComment = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Likes.findById(id)
        await Likes.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}

// export const linkPost = async (req, res)=>{
//     try{
//         const {id} = req.params
//         const deleteing = Likes.findById(id)
//         await Likes.findByIdAndDelete(id)
//         await res.send(`Deleted:\b\b ${deleteing}`)
//     }catch(error){console.log(error)}
// }