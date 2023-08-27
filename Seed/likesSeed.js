import connection from '../Connection/connection.js'
import mongoose from 'mongoose'
import usersSchema from '../Models/usersModel.js'
import sampleUserData from './userPseudoData.json'assert{type: 'json'}

try{
    await usersSchema.insertMany(sampleUserData)
    console.log("Done!")
    mongoose.disconnect()
}catch(error){console.log(error.message)}