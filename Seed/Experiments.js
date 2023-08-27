import connection from "../Connection/connection.js";
import mongoose, { mongo } from "mongoose";
import UsersSchema from "../Models/usersModel.js";
import CommentsSchema from "../Models/commentsModel.js";
import PostsSchema from "../Models/postsModel.js";
import path from "path";


try{
    const users = await UsersSchema.find({"email": "xavier.v@something.com"}) 
    const getComments =  await CommentsSchema.find({"commentText": 'This is a test of nested docs'}).populate({path:'commentAuthor', strictPopulate: false, select: 'userName'})
    const comment = new CommentsSchema({
        commentAuthor: users[0]._id,
        commentText: "This is a test of nested docs"
    })
    comment.save()
    console.log(users[0]._id)
    mongoose.disconnect()
}catch(error){
    mongoose.disconnect()
    console.log(error.message)}