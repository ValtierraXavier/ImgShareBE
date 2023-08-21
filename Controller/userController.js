import Users from '../Models/usersModel.js'

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

export const postUser = async (req, res)=>{
    try{
        const newUser =  new Users(req.body)
        await Users.save(newUser)
        await res.send(`Added:\b\b${newUser}`)
    }catch(error){console.log(error)}
}

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const {body} = req.body
        const originalUser = await Users.findById(id)
        const userEdit = await Users.findByIdAndUpdate(id, body)
        await userEdit.save()
        await res.send(`${originalUser}\b\b was changed to\b\b ${userEdit}`)
    }catch(error){console.log(error)}
}

export const deleteUser = async (req, res)=>{
    try{
        const {id} = req.params
        const deleteing = Users.findById(id)
        await Users.findByIdAndDelete(id)
        await res.send(`Deleted:\b\b ${deleteing}`)
    }catch(error){console.log(error)}
}