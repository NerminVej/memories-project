import styled from "@emotion/styled";
import { AppBar, Typography } from "@mui/material";

export const MyAppBar = styled(AppBar)(() => ({
    borderRadius:15,
    margin:"30px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    padding:"20px",
    marginLeft: '15px',
    
}))

export const MemoryHeader = styled(Typography)(() => ({
    color: 'rgba(0,122,255, 1)',
}))


