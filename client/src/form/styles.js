import styled from "@emotion/styled";
import { Button, Paper, TextField } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: red,
      },
})


export const FormPaper = styled(Paper)(() =>({
    padding:"20px",
}))

export const FormTextBoxes = styled(TextField)(() =>({
    marginTop:"10px",
    marginBottom:"10px"
}))

export const FormSubmitButton = styled(Button)(() => ({
    marginTop:"10px",
    marginBottom:"10px",
}))