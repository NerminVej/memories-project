import Post from "./post/posts";
import axios from "axios"
import { useEffect, useState } from "react";
import Form from "./form/forms";
import { Typography, Container, AppBar, Grow, Grid } from "@mui/material"
import memories from "./images/memories.png"
import { styled } from "@mui/system"
import { MemoryHeader } from "./styles"
import { MyAppBar } from "./styles"







const api = axios.create({
  baseURL: "http://localhost:5000/posts/"
})

function App() {

  const [posts,setPosts] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [title,setTitle] = useState("")
  const [message,setMessage] = useState("")
  const [creator,setCreator] = useState("")
  const [image,setImage] = useState("")
  const [date,setDate] = useState(new Date())



  const hook = () =>{
    api.get("/")
    .then((res) =>{
      const data = res.data
      setPosts(data)
      console.log("Data has been received")
      setIsLoading(true)
    })
    .catch(() =>{
      console.log("An error happend")
    })
  }
  useEffect(hook,[])

  if(isLoading == false){
    return <div>Fetching Data please wait</div>
  }

  const likeIncrement = (id) =>{
    let post = posts.filter(postitem => postitem._id === id)
    post[0].likeCount = post[0].likeCount + 1
    const likeCounter = post[0].likeCount
    console.log(post[0].likeCount);
    api.post(`/${id}`,{
      likeCount: likeCounter
    })
    
    window.location.reload(true)
  }
  // console.log(posts[0].likeCount);

  const deletePost = (id) =>{
    let decision = window.prompt("Do you really want to delete this entry? Type yes")
    if(decision !== "yes"){
        window.alert("invalid input")
    }
    else if(decision.toLowerCase() === "yes"){
      api.delete(`/${id}`)
      window.location.reload(true)
    }
    else if(decision === null){
      window.alert("Delete was canceled")
    }
    
  }
  
  const titleChangeHandler = (e) =>{
    setTitle(e.target.value)
  }
  const messageChangeHandler = (e) =>{
    setMessage(e.target.value)
  }
  const creatorChangeHandler = (e) =>{
    setCreator(e.target.value)
  }

  const addPost = () =>{
    setDate(new Date())
    if(posts.find(post => post.title === title && post.creator === creator)){
      const updateChoice = window.confirm("A Post with the same creator and title is already in the List do you want to update the message?")
      if(updateChoice === false){
        window.alert("Update got Canceled")
      }
      else if(updateChoice === true){
        const updatedPost = posts.filter(post => post.title === title)
        console.log(updatedPost[0]._id);
        window.alert("Post got updated")
        api.post(`/${updatedPost[0]._id}` ,{
        message:message,
        //If I wanted to cchange the Image aswell
        //selectedFile:image.base64,
        //createdAt: date
          
        })
        window.location.reload(true)
      }
    }
    else{
      api.post("/" ,{
        title:title,
        message:message,
        creator:creator,
        selectedFile:image.base64,
        createdAt: date
      })
      .then(response =>{
        console.log(response);
      })
      .catch(error =>{
        console.log(error.message)
      })
      window.location.reload(true)

    }
    
  }

  const clearForm = () =>{
    setTitle("")
    setMessage("")
    setCreator("")
    setImage("")
  }


  return (
    <div>
      <Container>
        <MyAppBar position="static" color="inherit">
          <MemoryHeader variant="h2" align="center">Memory</MemoryHeader>
          <img src={memories} alt="memories" height={60} ></img>
        </MyAppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                {posts.map((post,index) =>
                  <Grid key = {post._id}>
                    <Post 
                      key={index}
                      title={post.title}
                      message={post.message}
                      creator={post.creator}
                      likeCount={post.likeCount}
                      createdAt={post.createdAt}
                      image={post.selectedFile}
                      likeIncrement={() => likeIncrement(post._id)}
                      deletePost={() => deletePost(post._id)}
                  /> 
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form title={title} titleChangeHandler={titleChangeHandler}
                      message={message} messageChangeHandler={messageChangeHandler}
                      addPost={addPost}
                      creator={creator} creatorChangeHandler={creatorChangeHandler}
                      image={image}
                      setImage={setImage}
                      clearForm={clearForm}
                      />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
