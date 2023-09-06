import { model } from 'mongoose'
import Posts from '../Models/postsModel.js'

export const getPosts = async (req, res)=>{
    try{
        const posts = await Posts.find({}).populate({path: 'poster'})
        await res.status(200).json(posts)
    }catch(error){console.log(error)}
}

export const getPost = async (req, res)=>{
    const {id} = req.params
    try{
        const post = await Posts.findById(id).populate({path: 'poster'})
        if(post){
            post.populate({path: 'poster'})
            await res.status(200).json(post)
        }else if(!post){
            await res.status(401).send('Record Does Not Exist... =(')
        }
    }catch(error){console.log(error)}
}

export const postPost = async (req, res)=>{
    const body = req.body
    try{
        if(body.poster && body.url){
            const newPost =  new Posts(body)
            await newPost.save()
            await res.sttus(200).send(newPost)
        }else if(!body.poster){
            await res.status(401).body("Please Login")
        }else if (body.URL = ""){
            await res.status(401).body("Add a URL")
        }
    }catch(error){res.send(error.message)}
}

export const putPost = async(req, res)=>{
    const id = req.params.id
    const body = req.body.newPost
    try{
        const postEdit = await Posts.findByIdAndUpdate(id, body)
        await postEdit.save()
        const edited = await Posts.findById(id)
        await res.status(200).send(edited)
    }catch(error){console.log(error)}
}

export const deletePost = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Posts.findById(id)
        await Posts.findByIdAndDelete(id)
        await res.status(200)
    }catch(error){console.log(error)}
}

export const linkComment= async (req,res)=>{
    try{
       const id = req.params.id
       const body = req.body.newCommentId
       const insertCommentId = await Posts.findById(id)
       insertCommentId.postComments.push(body)
       insertCommentId.save()
       res.send(insertCommentId)
    }catch(error){console.log(error.message)}
}

export const unlinkCommentFromPost = async(req, res)=>{
    const id = req.params.id
    const body = req.body.commentId
    const post = await Posts.findById(id)
    const postidIndex = post.postComments.indexOf(body)
    if(postidIndex > -1){
        post.postComments.splice(postidIndex, 1)
        post.save()
        await res.status(200)
    }
}

export const postWithComments = async(req,res)=>{
    try{
        const id = req.params.id
        const thePostandComments = await Posts.findById(id).populate([{path:'poster'},{path: 'postComments',populate:"commentAuthor"}])
        res.json(thePostandComments)
        
     }catch(error){console.log(error.message)}
}

export const userPosts = async (req, res) =>{
    const id = req.params.id
    try{
        const posts = await Posts.find({poster: `${id}`}).populate({path: 'poster'})
        res.send(posts)
    }catch(error){console.log(error.message)}
}

export const handlePostLike = async(req, res)=>{
    const id = req.params.id
    const body = req.body.userId
    try{
        const post = await Posts.findById(id)
        const index = post.likes.indexOf(body)
        if(index === -1){
            post.likes.push(body)
            await post.save()
            const newPost = await Posts.findById(id)
            res.status(200).send(newPost)
        }else if(index > -1){
            post.likes.splice(index, 1)
            await post.save()
            const newPost = await Posts.findById(id)
            res.status(200).send(newPost)
        } 
    }catch(error){error.message}
}