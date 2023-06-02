import styled from "@emotion/styled";
import { Button, Card, CardActions, CardMedia, Paper, TextField } from "@mui/material";



export const PostCard = styled(Card)(() =>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    margin:"20px",
}))

export const PostCardAction = styled(CardActions)(() =>({
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
}))

export const PostCardMedia = styled(CardMedia)(() =>({
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
}))