//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Login from './Login';

const theme = createTheme();

export default function CreateAccount()
{
    let navigate = useNavigate();

    function submit(event)
    {
        event.preventDefault();

        const account = Object.fromEntries(new FormData(event.currentTarget));
        console.log("Attempting to create an account: " + JSON.stringify(account));
        axios.post("/api/users/account", account)
            .then((response) => {
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response));
            navigate("/");
            })
            .catch((error) => {console.log(JSON.stringify(error.response.data.message))})
    }

    return (
    <Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginTop: "150px"}}>
          <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

          <Typography component="h1" variant="h3" style={{color: "black", marginTop: "50px"}}> Create Account </Typography>

          <Box component="form" onSubmit={submit}>

              <TextField margin="normal" fullWidth required
              label="Username" name="username" autoComplete="on"/>

              <TextField margin="normal" fullWidth required
              label="Your Name" name="name" autoComplete="on" />

              <TextField margin="normal" fullWidth required
              label="Email" type="email" name="email" autoComplete="on" />

              <TextField margin="normal" fullWidth required
              label="Password" type="password" name="password" autoComplete="on"/>

              <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
              Create Account </Button>
          </Box>
          </Box>
      </Container>
    );
}
