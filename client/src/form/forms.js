import { TextField, Button, Typography, Paper } from "@mui/material"
import { FormPaper, FormSubmitButton, FormTextBoxes } from './styles'
import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import FileBase64 from 'react-file-base64';


const theme = createTheme({
    palette: {
      primary: blue,
      secondary: red,
      
      }
      
})


function form({title,message,titleChangeHandler,messageChangeHandler,addPost,creatorChangeHandler
,creator,setImage,clearForm}) {
  
  
  return (
    <div>
      <ThemeProvider theme={theme}>
      <FormPaper>
        <form autoComplete='off' noValidate >
        <Typography variant="h6">Creating a Memory</Typography>
        <FormTextBoxes 
          name="creator"
          variant='outlined'
          label="Creator"
          fullWidth
          value={creator}
          onChange={creatorChangeHandler}
          >
        </FormTextBoxes>
        <FormTextBoxes 
          name="title"
          variant='outlined'
          label="Title"
          fullWidth
          onChange={titleChangeHandler}
          value={title}
          >
        </FormTextBoxes>
        <FormTextBoxes 
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          onChange={messageChangeHandler}
          value={message}
          >
        </FormTextBoxes>
        <div>
          <FileBase64
          type="file"
          multiple={false}
          onDone={({base64}) => setImage({base64})}>
          </FileBase64>
        </div>
        <FormSubmitButton variant="contained" color="primary" size="large"  fullWidth
        onClick={addPost}>
          Create Post
        </FormSubmitButton>
        <Button variant="contained" color="secondary" size="large" fullWidth onClick={clearForm}>
          Clear
        </Button>
        </form>
      </FormPaper>
      </ThemeProvider>
    </div>
  )
}

export default form