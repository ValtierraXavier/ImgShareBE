import Users from '../Models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
let TOKEN_KEY = process.env.TOKEN_KEY

if(process.env.NODE_ENV === 'production'){
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
  TOKEN_KEY = process.env.TOKEN_KEY
}

const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 30)

export const getUsers = async (req, res)=>{
  try{
        const users = await Users.find({})
        await res.json(users)
    }catch(error){console.log(error)}
}

export const getUser = async (req, res)=>{
  const id = req.params.id
  try{
      const user = await Users.findById(id)
      if(user){
          await res.json(user)
      }else if(!user){
          await res.send('Record Does Not Exist... =(')
      }
  }catch(error){console.log(error.message, 'from userController(getUser)')}
}

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const {body} = req.body
        const originalUser = await Users.findById(id)
        const userEdit = await Users.findByIdAndUpdate(id, body)
        await res.send(`${originalUser}\b\b was changed to\b\b ${userEdit}`)
    }catch(error){console.log(error)}
}

export const insertComment = async (req,res)=>{
  const id = req.params.id
  const body = req.body.newCommentId
  try{
    const whichUser = await Users.findById(id)
    whichUser.comments.push(body)
    whichUser.save()
    const EditedUser = await Users.findById(id).populate({path:"comments"})
    await res.send(EditedUser)
}catch(error){console.log(error.message)}
}

export const unlinkCommentFromUser = async (req, res)=>{
  const id = req.params.id
  const body = req.body.commentId
  try{    
    const user = await Users.findById(id)
    const useridIndex = user.comments.indexOf(body)
    if(useridIndex > -1){
      user.comments.splice(useridIndex, 1)
      user.save()
      res.status(200).send('Unlinked Comment')
    }
  }catch(error){console.log(error.message)}
}

export const deleteUser = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Users.findById(id)
        await Users.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}

export const userSignUp = async (req,res) =>{
    try{
        const {email, userName, password} = req.body
        const encPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const newUser = new Users({
            email,
            userName,
            encPassword
        })
        await newUser.save()
        const payload = {
            id: newUser._id,
            username: newUser.userName,
            email: newUser.email,
            exp: parseInt(exp.getTime() / 1000),
          }
      
          const token = jwt.sign(payload, TOKEN_KEY)
          res.status(201).json({ token })
        } catch (error) {
          console.log(error.message)
          res.status(400).json({ error: error.message })
        }
    
} 

export const userSignIn = async (req,res) =>{
  const{email, password} = req.body.credentials
    try{
        const user = await Users.findOne({ email: email }).select(
            'userName email encPassword'
          )
          if (await bcrypt.compare(password, user.encPassword)) {
            const payload = {
              id: user._id,
              username: user.userName,
              email: user.email,
              exp: parseInt(exp.getTime() / 1000),
            }
            const token = jwt.sign(payload, TOKEN_KEY)
            res.status(201).json({ token })
          } else {
            res.status(401).json({message:'Invalid Credentials'})
          }
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: error.message })
        }
}

export const linkPostToUser = async (req, res) => {
  const id = req.params.id
  const postId = req.body.newPostId
  try{
    const user = await Users.findById(id)
    user.posts.push(postId)
    user.save()
    res.send(user)
  }catch(error){
    console.log(error.message)
  }
}

export const getUserPosts = async (req, res) =>{
  const id = req.params.id
  try{
      const userPosts = await Users.findById(id).populate({path: 'posts', populate:'poster'})
      res.status(200).send(userPosts)    
    }catch(error){console.log(error.message)
    }
}

export const handlePostLike = async(req, res)=>{
  const id = req.params.id
  const body = req.body.post_id
  try{
    const user = await Users.findById(id)
    const index = user.postLikes.indexOf(body)
    if(index=== -1){      
      user.postLikes.push(body)
      await user.save()
      const newUser = await Users.findById(id)
      await res.status(200).send(newUser)
    }else if(index > -1){      
      user.postLikes.splice(index, 1)
      await user.save()
      const newUser = await Users.findById(id)
      await res.status(200).send(newUser)
    }
    
  }catch(error){error.message}
}



export const handleCommentLike = async(req, res)=>{
  const id = req.params.id
  const body = req.body.commentId
  try{
    const user = await Users.findById(id)
    const index = user.commentLikes.indexOf(body)
    if(index === -1){
      user.commentLikes.push(body)
      await user.save()
      const newUser = await Users.findById(id)
      await res.status(200).send(newUser)
    }else if(index > -1){
      user.commentLikes.splice(index, 1)
      await user.save()
      const newUser = await Users.findById(id)
      await res.status(200).send(newUser)}
    }catch(error){error.message}
}

export const follow = async (req, res)=>{
  const id = req.params.id
  const body = req.body.follower
  try{
    const userToFollow = await Users.findById(id)
    const followerIndex = userToFollow.followers.indexOf(body)
    const userFollowing = await Users.findById(body)
    const userToFollowIndex = userFollowing.following.indexOf(id)
    if(followerIndex < 0){
      userToFollow.followers.push(body)
      await userToFollow.save()
    }
    if(userToFollowIndex < 0){
      userFollowing.following.push(id)
      await userFollowing.save()
    }   
  }catch(error){console.log(error.message)}
}

export const unfollow = async (req, res)=>{
  const id =req.params.id
  const body = req.body.unfollower
  console.log(id, '||', body)
  try{
    const userToUnfollow = await Users.findById(id)
    const unFollowerIndex = userToUnfollow.followers.indexOf(body)
    const userUnfollowing = await Users.findById(body)
    const userToUnfollowIndex = userUnfollowing.following.indexOf(id)
    if(unFollowerIndex >= 0){
      userToUnfollow.followers.splice(unFollowerIndex, 1)
      userToUnfollow.save()
    }
    if(userToUnfollowIndex >= 0){
      userUnfollowing.following.splice(userToUnfollowIndex, 1)
      userUnfollowing.save()
    }
  }catch(error){console.log(error.message)}
}