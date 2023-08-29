import { model } from 'mongoose'
import Posts from '../Models/postsModel.js'

export const getPosts = async (req, res)=>{
    try{
        const posts = await Posts.find({})
        await res.json(posts)
    }catch(error){console.log(error)}
}

export const getPost = async (req, res)=>{
    const {id} = req.params
    try{
        const post = await Posts.findById(id)
        if(post){
            await res.json(post)
        }else if(!post){
            await res.send('Record Does Not Exist... =(')
        }
    }catch(error){console.log(error)}
}

export const postPost = async (req, res)=>{
    try{
        // res.send(req.body)
        const newPost =  new Posts(req.body)
        await newPost.save()
        // res.status(200).send("Sucessfully added post.")
        res.send(newPost)
    }catch(error){res.send(error.message)}
}

export const putPost = async(req, res)=>{
    try{
        const {id} = req.params
        const body = req.body
        const postEdit = await Posts.findByIdAndUpdate(id, body)
        await postEdit.save()
        await res.send(`${originalPost}\b\b was changed to\b\b ${postEdit}`)
    }catch(error){console.log(error)}
}

export const deletePost = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Posts.findById(id)
        await Posts.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
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

export const postWithComments = async(req,res)=>{
    try{
        const id = req.params.id
        const thePostandComments = await Posts.findById(id).populate([{path: 'postComments',populate:"commentAuthor"}])
        res.json(thePostandComments)
        
     }catch(error){console.log(error.message)}
}

export const userPosts = async (req, res) =>{
    try{
       const id = req.params.id
        const posts = await Posts.find({poster: `${id}`})
        res.send(posts)
    }catch(error){console.log(error.message)}
}