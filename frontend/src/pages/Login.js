//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

document.body.style.backgroundColor = "#ebebeb"

export default function Login()
{
    let navigate = useNavigate();
    function submit(event)
    {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        console.log({"username": data.get("username"), "password": data.get("password")})
    }

    function create()
    {
        console.log("Hello!")
        navigate('pages/CreateAccount')
    }

    return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography component="h1" variant="h3"> Sign in </Typography>

        <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>

            <TextField margin="normal" required fullWidth id="username"
            label="Username" name="username" autoFocus  />

            <TextField margin="normal" required fullWidth name="password"
            label="Password" type="password" id="password" autoComplete="current-password" />

            <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
            Sign In </Button>

            <Button type="submit" onClick={create} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Account  </Button>

        </Box>
        </Box>
    </Container>
    </ThemeProvider>
    );
}