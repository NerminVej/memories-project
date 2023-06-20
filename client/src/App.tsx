import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Typography, Container, AppBar, Grow, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { MemoryHeader } from "./styles";
import { MyAppBar } from "./styles";
import Post from "./post/posts";
import Form from "./form/forms";
import memoriesPicture from "./images/memories.png";
import "./tailwind.css";

// Create an instance of axios with the base URL for API requests
const api = axios.create({
  baseURL: "http://localhost:5000/posts/",
});

// Define the interface for a Post object
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
  // State variables for managing posts and form data
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [image, setImage] = useState<{ base64: string } | undefined>(undefined);
  const [date, setDate] = useState(new Date());

  // Fetch data from the API when the component mounts
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

  // If data is still loading, show a loading message
  if (!isLoading) {
    return <div>Fetching Data please wait</div>;
  }

  // Function to increment the like count for a post
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

  // Function to delete a post
  const deletePost = (id: string): void => {
    const decision = window.prompt(
      "Do you really want to delete this entry? Type yes"
    );
    if (decision !== "yes") {
      window.alert("Invalid input");
    } else if (decision.toLowerCase() === "yes") {
      api
        .delete(`/${id}`)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          // Handle error if the DELETE request fails
          console.error(error);
        });
    } else if (decision === null) {
      window.alert("Delete was canceled");
    }
  };

  // Event handlers for form input changes
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

  // Function to add a new post or update an existing post
  const addPost = (): void => {
    setDate(new Date());

    // Input validation
    if (title.trim() === "") {
      window.alert("Please enter a valid title.");
      return;
    }

    if (message.trim() === "") {
      window.alert("Please enter a valid message.");
      return;
    }

    if (creator.trim() === "") {
      window.alert("Please enter a valid creator name.");
      return;
    }

    if (image && image.base64) {
      const fileType = image.base64.split(",")[0].split(";")[0].split(":")[1];
      if (!["image/png", "image/jpg", "image/jpeg"].includes(fileType)) {
        window.alert("Please select a PNG, JPG, or JPEG file.");
        return;
      }
    }

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
        api
          .post(`/${updatedPost[0]._id}`, {
            message: message,
            selectedFile: image?.base64,
            createdAt: date,
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      api
        .post("/", {
          title: title,
          message: message,
          creator: creator,
          selectedFile: image?.base64,
          createdAt: date,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // Function to clear the form
  const clearForm = (): void => {
    setTitle("");
    setMessage("");
    setCreator("");
    setImage(undefined);
  };

  // Render the component
  return (
    <div>
      <Container className="py-8">
        <MyAppBar position="static" color="inherit" className="h-40">
          <MemoryHeader variant="h2" align="center">
            Memory
          </MemoryHeader>
          <img
            src={memoriesPicture}
            alt="memories"
            height={60}
            className="h-40"
          />
        </MyAppBar>
        <Grow in>
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                {posts.map((post) => (
                  <div key={post._id} className="mb-6">
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
                  </div>
                ))}
              </div>
              <div>
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
                  image={image}
                />
              </div>
            </div>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
