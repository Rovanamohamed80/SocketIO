import express from 'express'
const app = express()
const port = 3000
import { dbConnection } from "./db/dbConnection.js"
import { Server } from "socket.io";
import { Post } from './db/models/post.model.js';

app.get('/', (req, res) => res.send('Hello World!'))
let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = new Server(server,{
    cors:"*",
});

io.on('connection',(socket)=>{
 socket.on("addPost",async(post) => {
    await Post.insertMany(post);
    let posts =  await Post.find();
    io.emit("posts",posts)
 })
 socket.on("load",async ()=>{
    let posts =  await Post.find();
    io.emit("posts",posts)
 
 })
 socket.on("postId",async (postId)=>{
    await Post.findByIdAndDelete(postId);
    let posts =  await Post.find();
    io.emit("posts",posts)
 
 })
 socket.on("search",async (value)=>{
    let posts =  await Post.find({title:{$regex:value, $options:"i"}});
    io.emit("posts",posts)
 
 })
 socket.on('updatePost', async (updatedPost) => {
      await Post.findByIdAndUpdate(updatedPost._id, updatedPost);
      let posts =  await Post.find();
      io.emit("posts",posts)
  });

console.log(socket.id);
console.log("user connected");
})