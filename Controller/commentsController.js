import Comments from '../Models/commentsModel.js'

export const getComments = async (req, res)=>{
    try{
        const comments = await Comments.find({})
        await res.json(comments)
    }catch(error){console.log(error)}
}

export const getComment = async (req, res)=>{
    const {id} = req.params
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
        const newComment =  new Comments(req.body)
        await Comments.save(newComment)
        await res.send(`Added:\b\b${newComment}`)
    }catch(error){console.log(error)}
}

export const putComment = async(req, res)=>{
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