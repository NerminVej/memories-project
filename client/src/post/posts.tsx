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

// Define the props for the Posts component
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

// Create a theme using MUI's createTheme function
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

// Define the Posts component
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
    <div className="container">
      {/* Card component */}
      <Card className="card relative">
        {/* CardMedia component */}
        <CardMedia component="img" src={image} />

        {/* Creator and timestamp */}
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col absolute top-2 left-2">
            <Typography
              variant="h6"
              className="creator text-xl font-semibold mb-1"
            >
              {creator}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {moment(createdAt).fromNow()}
            </Typography>
          </div>
          <div className="absolute top-2 right-2">
            <Button className="text-gray-500">
              <MoreHoriz />
            </Button>
          </div>
        </div>

        <div className="flex justify-between m-5">
          {/* Additional content */}
          <Typography variant="body2"></Typography>
        </div>
        <div className="p-0.5">
          {/* Title */}
          <Typography variant="h5" className="text-xl">
            {title}
          </Typography>
          {/* CardContent component */}
          <CardContent>
            {/* Message */}
            <Typography className="message">{message}</Typography>
          </CardContent>
          {/* CardActions component */}
          <PostCardAction className="flex space-x-2">
            {/* Like button */}
            <Button
              className="like-button"
              size="small"
              color="primary"
              onClick={likeIncrement}
              startIcon={<ThumbUpIcon fontSize="small" />}
              variant="contained"
              disableElevation
            >
              {likeCount}
            </Button>
            {/* Delete button */}
            <Button
              className="delete-button"
              size="small"
              color="secondary"
              onClick={deletePost}
              variant="outlined"
            >
              Delete
            </Button>
          </PostCardAction>
        </div>
      </Card>
    </div>
  );
};

export default Posts;
