import connection from '../Connection/connection.js'
import mongoose from 'mongoose'
import postsSchema from '../Models/postsModel.js'
import samplePostsData from './postPseudoData.json'assert{type: 'json'}

try{
    await postsSchema.insertMany(samplePostsData)
    console.log("Done!")
    mongoose.disconnect()
}catch(error){console.log(error.message)}