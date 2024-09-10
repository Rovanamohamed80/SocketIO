const socket = io("http://localhost:3000/");
socket.on("connect",()=>{
    socket.emit("load");
})
let title = document.getElementById('title');
let description = document.getElementById('description');


function addPost(){
    let post = {
        title:title.value,
        description:description.value,
    }
    socket.emit("addPost",post);
}

socket.on("posts",(posts)=>{
    display(posts);
})

function display(posts){
 let cartona="";
 for (let i = 0; i < posts.length; i++) {
    cartona+=`
                <div class="col-md-3 mt-3">
                <div class="border p-3">
                    <h2>${posts[i].title}</h2>
                    <p>${posts[i].description}</p>
                    <button onclick="deletePost('${posts[i]._id}')" class="btn btn-danger btn-sm delete">Delete</button>
                    <button onclick="updatePost('${posts[i]._id}')"class="btn btn-success btn-sm update">Update</button>
                </div>
              </div>`
    
 }
 document.getElementById('row').innerHTML=cartona;
}

function deletePost(postId){
    socket.emit("postId",postId);
}


function updatePost(postId) {
    const newTitle = prompt("Enter the new title:");
    const newDescription = prompt("Enter the new description:"); 
    const updatedPost = {
      _id: postId,
      title: newTitle,
      description: newDescription,
    };
    socket.emit("updatePost", updatedPost);
  }



function search(value){
socket.emit("search",value);
}