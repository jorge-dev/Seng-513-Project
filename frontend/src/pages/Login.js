//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import {useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

export default function Login()
{
    let navigate = useNavigate();
    function submit(event)
    {
        event.preventDefault();

        const login = Object.fromEntries(new FormData(event.currentTarget));
        console.log("Attempting to login with: ")
        console.log(login);
        axios.post("/api/users/login", login)
            .then((response) => {
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response));
            navigate("/");
            })
            .catch((error) => {console.log(JSON.stringify(error.response.data.message))})
    }

    function create()
    {
        console.log("Hello!")
        navigate('../pages/CreateAccount')
    }

    console.log(localStorage.getItem("token"));
    if (localStorage.getItem('token'))
        return <Navigate to="../pages/AccountManagement"/>

    else
    
    return (
        <Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginTop: "150px"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography component="h1" variant="h3" style={{color: "black", marginTop: "50px"}}> Sign in </Typography>

        <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>

            <TextField margin="normal" required fullWidth id="username"
            label="Username" name="username" autoFocus autoComplete="username"/>

            <TextField margin="normal" required fullWidth name="password"
            label="Password" type="password" id="password" autoComplete="current-password" />

            <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
            Sign In </Button>

            <Button type="submit" onClick={create} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Account  </Button>

        </Box>
        </Box>
    </Container>
    );
}
