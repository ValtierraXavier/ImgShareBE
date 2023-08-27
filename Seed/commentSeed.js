import connection from '../Connection/connection.js'
import mongoose from 'mongoose'
import commentsSchema from '../Models/commentsModel.js'
import sampleCommentData from './commentPseudoSeed.json'assert{type: 'json'}

try{
    await commentsSchema.insertMany(sampleCommentData)
    console.log("Done!")
    mongoose.disconnect()
}catch(error){console.log(error.message)}