import {model,Schema} from "mongoose";

const schema =new Schema({
    title:String,
    description:String,
})

export const Post =model("Post",schema);