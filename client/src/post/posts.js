import React from 'react'
import { TextField, Button, Typography, Paper, Grid, Card, CardActions,CardMedia, CardContent, } from "@mui/material"
import { FormPaper, FormSubmitButton, FormTextBoxes, PostCard, PostCardAction, PostCardMedia } from './styles'
import { amber, blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import { MoreHoriz } from "@mui/icons-material"
import moment from "moment"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



function posts({title,message,creator,likeCount,createdAt,likeIncrement, deletePost,image}) {
  return (
    <div> 
      <PostCard>
        <PostCardMedia component = "div" variant="h2" image={image}></PostCardMedia>
        <div style={{position: 'absolute',top: '20px',left: '20px',color: 'white',}}>
          <Typography variant='h6'>{creator}</Typography>
          <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
        </div>
        <div style={{position: 'absolute',top: '20px',right: '20px',color: 'white',}}>
          <Button>
            <MoreHoriz fontSize="default"></MoreHoriz>
          </Button>
        </div>
        <div style={{display: 'flex',justifyContent: 'space-between',margin: '20px',}}>
          <Typography variant="body2"></Typography>
        </div>
        <div style={{padding: '0 16px'}} variant="h5">
          <Typography variant="h5">{title}</Typography>
          <CardContent>
            <Typography variant="p">{message}</Typography>
          </CardContent>
          <PostCardAction>
            <Button size="small" color="primary" onClick={likeIncrement}>
            {likeCount} 
            <ThumbUpIcon fontSize="small">Like</ThumbUpIcon>
            </Button>
            <Button size="small" color="secondary" onClick={deletePost}>
              Delete
            </Button>
          </PostCardAction>
        </div>
      </PostCard>
      
    </div>
  )
}

export default posts