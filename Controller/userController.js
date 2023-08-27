import Users from '../Models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 11
const TOKEN_KEY = '242013'

if (process.env.NODE_ENV === 'production') {
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
    try{
        const {id} = req.params
        const user = await Users.findById(id)
        if(user){
            await res.json(user)
        }else if(!user){
            await res.send('Record Does Not Exist... =(')
        }
    }catch(error){console.log(error)}
}

// export const createUser = async (req, res)=>{
//     try{
//         const newUser =  new Users(req.body)
//         await newUser.save()
//         await res.send(`Added:\b\b${newUser}`)
//     }catch(error){console.log(error)}
// }

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const {body} = req.body
        const originalUser = await Users.findById(id)
        const userEdit = await Users.findByIdAndUpdate(id, body)
        // await userEdit.comments.save()
        await res.send(`${originalUser}\b\b was changed to\b\b ${userEdit}`)
    }catch(error){console.log(error)}
}

export const insertComment = async (req,res)=>{
  try{
    const id = req.params.id
    const body = req.body.newCommentId
    const whichUser = await Users.findById(id)
    whichUser.comments.push(body)
    whichUser.save()
    const EditedUser = await Users.findById(id).populate({path:"comments"})
    await res.send(EditedUser)
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
    try{
        const{email, password} = req.body
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
            res.status(401).send('Invalid Credentials')
          }
        } catch (error) {
          console.log(error.message)
          res.status(500).json({ error: error.message })
        }
}