import mongoose from "mongoose";

export const dbConnection = mongoose.connect(`mongodb://127.0.0.1:27017/socketIO`).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("failed",err);
})