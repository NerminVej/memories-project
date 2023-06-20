import React, { ChangeEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormPaper, FormSubmitButton, FormTextBoxes } from "./styles";
import FileBase64 from "react-file-base64";

// Define a custom type based on the theme object
type CustomTheme = typeof theme;

// Create a theme using MUI's createTheme function
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

// Define the props for the Form component
interface FormProps {
  title: string;
  message: string;
  creator: string;
  image: { base64: string } | undefined; // Update the type to allow either a string or undefined
  setImage: (image: { base64: string } | undefined) => void; // Update the type to accept a string or undefined
  titleChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  messageChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  creatorChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  addPost: () => void;
  clearForm: () => void;
}

// Define the Form component
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
            {/* Textbox for entering the creator */}
            <FormTextBoxes
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={creator}
              onChange={creatorChangeHandler}
            />
            {/* Textbox for entering the title */}
            <FormTextBoxes
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              onChange={titleChangeHandler}
              value={title}
            />
            {/* Textbox for entering the message */}
            <FormTextBoxes
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              onChange={messageChangeHandler}
              value={message}
            />
            {/* File upload component using react-file-base64 */}
            <div>
              <FileBase64
                type="file"
                multiple={false}
                onDone={
                  ({ base64 }: { base64: string }) => setImage({ base64 }) // Set the image with the base64 string when a file is selected
                }
              />
            </div>
            {/* Button for submitting the form */}
            <FormSubmitButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={addPost}
            >
              Create Post
            </FormSubmitButton>
            {/* Button for clearing the form */}
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
