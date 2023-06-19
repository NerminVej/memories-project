import React, { ChangeEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormPaper, FormSubmitButton, FormTextBoxes } from "./styles";
//import FileBase64 from 'react-file-base64';
type CustomTheme = typeof theme;
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

interface FormProps {
  title: string;
  message: string;
  creator: string;
  setImage: (image: any) => void;
  titleChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  messageChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  creatorChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  addPost: () => void;
  clearForm: () => void;
}

const Form: React.FC<FormProps> = ({
  title,
  message,
  creator,
  setImage,
  titleChangeHandler,
  messageChangeHandler,
  creatorChangeHandler,
  addPost,
  clearForm,
}) => {
  return (
    <div>
      <ThemeProvider theme={theme as CustomTheme}>
        <FormPaper>
          <form autoComplete="off" noValidate>
            <Typography variant="h6">Creating a Memory</Typography>
            <FormTextBoxes
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={creator}
              onChange={creatorChangeHandler}
            />
            <FormTextBoxes
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              onChange={titleChangeHandler}
              value={title}
            />
            <FormTextBoxes
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              onChange={messageChangeHandler}
              value={message}
            />
            <div>
              {/* <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImage({ base64 })}
              />*/}
            </div>
            <FormSubmitButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={addPost}
            >
              Create Post
            </FormSubmitButton>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={clearForm}
            >
              Clear
            </Button>
          </form>
        </FormPaper>
      </ThemeProvider>
    </div>
  );
};

export default Form;
