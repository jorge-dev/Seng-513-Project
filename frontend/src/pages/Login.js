//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useState} from "react";
import {useNavigate, Navigate } from 'react-router-dom';
import {Alert, Button, TextField, Box, Typography, Container} from '@mui/material';
import axios from 'axios';

export default function Login()
{
    const [failure, fupdate] = useState(0);

    let navigate = useNavigate();
    function submit(event)
    {
        fupdate("")
        event.preventDefault();

        const login = Object.fromEntries(new FormData(event.currentTarget));
        console.log("Attempting to login with: " + JSON.stringify(login))
        axios.post("/api/users/login", login)
            .then((response) => {
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response));
            navigate("/");
            })
            .catch((error) => { fupdate(error.response.data.message); })
    }

    function create()
    {
        console.log("Hello!")
        navigate('../pages/CreateAccount')
    }

    if (localStorage.getItem('token'))
        return <Navigate to="../pages/AccountManagement"/>

    else
    
    return (
        <Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginTop: "150px"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography component="h1" variant="h3" style={{color: "black", marginTop: "50px"}}> Sign in </Typography>

        <Box component="form" onSubmit={submit}>

            <TextField margin="normal" required fullWidth id="username"
            label="Username" name="username" autoFocus autoComplete="username"/>

            <TextField margin="normal" required fullWidth name="password"
            label="Password" type="password" id="password" autoComplete="current-password" />
            <Alert style={{ width: "100%", alignSelf: "center", display: ((failure) ? 'block' : 'none') }} severity="error"><h5>Error - {failure}.</h5></Alert>

            <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
            Sign In </Button>

            <Button type="submit" onClick={create} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Account  </Button>

        </Box>
        </Box>
    </Container>
    );
}
