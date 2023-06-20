import { styled, Theme } from "@mui/system";
import { Button, Card, CardActions, CardMedia } from "@mui/material";

// Define the props for the PostCard component
interface PostCardProps {
  theme?: any;
}

// Styled component for the post card using the Card component from MUI
export const PostCard = styled(Card)<PostCardProps>(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
  margin: "20px",
}));

// Styled component for the card actions using the CardActions component from MUI
export const PostCardAction = styled(CardActions)(() => ({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
}));

// Styled component for the card media using the CardMedia component from MUI
export const PostCardMedia = styled(CardMedia)(() => ({
  height: 0,
  paddingTop: "56.25%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
}));
