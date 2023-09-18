import Comments from '../Models/commentsModel.js'


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
    const id = req.params.id
    const body = req.body.edited
    try{
        const commentEdit = await Comments.findByIdAndUpdate(id, body)
        await commentEdit.save()
        const newComment = await Comments.findById(id)
        res.send(newComment)
    }catch(error){console.log(error)}
}

export const deleteComment = async (req, res)=>{
    const id = req.params.id
    try{
        const deleteing = Comments.findById(id)
        await Comments.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}

export const handleCommentLike = async(req, res)=>{
    const id = req.params.id
    const body = req.body.userId
    try{
        const comment = await Comments.findById(id)
        const index = comment.likes.indexOf(body)
        if(index === -1){
        comment.likes.push(body)
        await comment.save()
        const newComment = await Comments.findById(id)
        res.status(200).send(newComment)
    }else if(index > -1){
        comment.likes.splice(index, 1)
        await comment.save()
        const newComment = await Comments.findById(id)
        res.status(200).send(newComment)
    }
    }catch(error){error.message}
}