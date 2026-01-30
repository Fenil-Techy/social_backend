import { Schema,model } from "mongoose";

const postScehma=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:String,
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const postModel=model("Post",postScehma)