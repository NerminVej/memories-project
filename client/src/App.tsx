import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Typography, Container, AppBar, Grow, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { MemoryHeader } from "./styles";
import { MyAppBar } from "./styles";
import Post from "./post/posts";
import Form from "./form/forms";
import memoriesPicture from "./images/memories.png";

const api = axios.create({
  baseURL: "http://localhost:5000/posts/",
});

interface Post {
  _id: string;
  title: string;
  message: string;
  creator: string;
  likeCount: number;
  createdAt: string;
  selectedFile: string;
}

function App(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse<Post[]> = await api.get("/");
        setPosts(response.data);
        console.log("Data has been received");
        setIsLoading(true);
      } catch (error) {
        console.log("An error happened:", error);
      }
    };

    fetchData();
  }, []);

  if (!isLoading) {
    return <div>Fetching Data please wait</div>;
  }

  const likeIncrement = (id: string): void => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post._id === id);
    updatedPosts[postIndex].likeCount += 1;
    const likeCounter = updatedPosts[postIndex].likeCount;
    console.log(updatedPosts[postIndex].likeCount);

    api
      .post(`/${id}`, {
        likeCount: likeCounter,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        // Handle error if the POST request fails
        console.error(error);
      });
  };

  const deletePost = (id: string): void => {
    const decision = window.prompt(
      "Do you really want to delete this entry? Type yes"
    );
    if (decision !== "yes") {
      window.alert("Invalid input");
    } else if (decision.toLowerCase() === "yes") {
      api.delete(`/${id}`);
      window.location.reload();
    } else if (decision === null) {
      window.alert("Delete was canceled");
    }
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const messageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const creatorChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCreator(e.target.value);
  };

  const addPost = (): void => {
    setDate(new Date());
    if (
      posts.find((post) => post.title === title && post.creator === creator)
    ) {
      const updateChoice = window.confirm(
        "A Post with the same creator and title is already in the List. Do you want to update the message?"
      );
      if (updateChoice === false) {
        window.alert("Update got Canceled");
      } else if (updateChoice === true) {
        const updatedPost = posts.filter((post) => post.title === title);
        console.log(updatedPost[0]._id);
        window.alert("Post got updated");
        api.post(`/${updatedPost[0]._id}`, {
          message: message,
          // If you wanted to change the Image as well:
          // selectedFile: image.base64,
          // createdAt: date
        });
        window.location.reload();
      }
    } else {
      api
        .post("/", {
          title: title,
          message: message,
          creator: creator,
          //selectedFile: image.base64,
          createdAt: date,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
      window.location.reload();
    }
  };

  const clearForm = (): void => {
    setTitle("");
    setMessage("");
    setCreator("");
    setImage("");
  };

  return (
    <div>
      <Container>
        <MyAppBar position="static" color="inherit">
          <MemoryHeader variant="h2" align="center">
            Memory
          </MemoryHeader>
          <img src={memoriesPicture} alt="memories" height={60} />{" "}
        </MyAppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                {posts.map((post) => (
                  <Grid key={post._id}>
                    <Post
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
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* image={image} got removed by me*/}
                <Form
                  title={title}
                  titleChangeHandler={titleChangeHandler}
                  message={message}
                  messageChangeHandler={messageChangeHandler}
                  addPost={addPost}
                  creator={creator}
                  creatorChangeHandler={creatorChangeHandler}
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
