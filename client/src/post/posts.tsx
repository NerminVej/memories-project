import React, { MouseEventHandler } from "react";
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { amber, blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { MoreHoriz, ThumbUp as ThumbUpIcon } from "@mui/icons-material";
import moment from "moment";
import { PostCard, PostCardAction } from "./styles";

interface PostsProps {
  title: string;
  message: string;
  creator: string;
  likeCount: number;
  createdAt: string;
  likeIncrement: MouseEventHandler<HTMLButtonElement>;
  deletePost: MouseEventHandler<HTMLButtonElement>;
  image: string;
}

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

const Posts: React.FC<PostsProps> = ({
  title,
  message,
  creator,
  likeCount,
  createdAt,
  likeIncrement,
  deletePost,
  image,
}) => {
  return (
    <div>
      <PostCard>
        {/* h2 variant*/}
        <CardMedia component="img" src={image} alt="Post image" />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{creator}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
        >
          <Button>
            {/* fontsize */} <MoreHoriz />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2"></Typography>
        </div>
        <div style={{ padding: "0 16px" }}>
          <Typography variant="h5">{title}</Typography>
          <CardContent>
            <Typography>{message}</Typography>
          </CardContent>
          <PostCardAction>
            <Button size="small" color="primary" onClick={likeIncrement}>
              {likeCount}
              <ThumbUpIcon fontSize="small" />
            </Button>
            <Button size="small" color="secondary" onClick={deletePost}>
              Delete
            </Button>
          </PostCardAction>
        </div>
      </PostCard>
    </div>
  );
};

export default Posts;
