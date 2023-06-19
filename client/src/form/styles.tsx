import { Paper, TextField, Button, Theme } from "@mui/material";
import { styled } from "@mui/system";

interface FormPaperProps {
  theme?: Theme; // Make the theme prop optional
}

export const FormPaper = styled(Paper)<FormPaperProps>(() => ({
  padding: "20px",
}));

interface FormTextBoxesProps {
  theme?: Theme; // Make the theme prop optional
}

export const FormTextBoxes = styled(TextField)<FormTextBoxesProps>(() => ({
  marginTop: "10px",
  marginBottom: "10px",
}));

interface FormSubmitButtonProps {
  theme?: Theme; // Make the theme prop optional
}

export const FormSubmitButton = styled(Button)<FormSubmitButtonProps>(() => ({
  marginTop: "10px",
  marginBottom: "10px",
}));
