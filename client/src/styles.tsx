import styled from "@emotion/styled";
import { AppBar, Typography } from "@mui/material";
// Styled component for the AppBar
export const MyAppBar = styled(AppBar)(() => ({
  borderRadius: 15,
  margin: "30px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "20px",
  marginLeft: "15px",
}));
// Styled component for the Typography component
export const MemoryHeader = styled(Typography)(() => ({
  color: "rgba(0, 122, 255, 1)",
}));
