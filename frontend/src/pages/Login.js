//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {ContextStore} from "../ContextStore";
import {toast} from "react-toastify";
import {getErrorMessage} from "../utils/handleApiError";
import {Container} from "react-bootstrap";
import './styles/Login.css';

export default function Login() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    // console.log(redirectInUrl);
    const redirectTo = redirectInUrl ? redirectInUrl : '/';
    // console.log(redirectTo);

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failure, fupdate] = useState(0);
    const {state: ctxState, setState: setCtxState} = useContext(ContextStore)
    const {userInfo} = ctxState;

    const submit = async (event) => {

        event.preventDefault();

        try {
            const {data} = await axios.post('/api/users/login', {
                username: userName,
                password: password
            });
            // console.log(data);
            setCtxState({type: "SIGN_IN", payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate(redirectTo || '/');
        } catch (error) {
            // fupdate(error.response.data.message)
            toast.error(getErrorMessage(error), {
                theme: "colored",
                autoClose: 2000
            });

        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirectTo);
        }
    }, [navigate, redirectTo, userInfo]);
// const [failure, fupdate] = useState(0);
//
// let navigate = useNavigate();
// function submit(event)
// {
//     fupdate("")
//     event.preventDefault();


//     const login = Object.fromEntries(new FormData(event.currentTarget));
//     console.log("Attempting to login with: " + JSON.stringify(login))
//     axios.post("/api/users/login", login)
//         .then((response) => {
//         console.log(response.data);
//         localStorage.setItem("token", JSON.stringify(response));
//         navigate("/");
//         })
//         .catch((error) => { fupdate(error.response.data.message); })
// }

// function create()
// {
//     console.log("Hello!")
//     navigate('../pages/CreateAccount')
// }
//
// if (localStorage.getItem('token'))
//     return <Navigate to="../pages/AccountManagement"/>
//
// else

    return (
        <Container className='login-container'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Box sx={{marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <Typography component="h1" variant="h3" style={{color: "black"}}> Sign
                    in </Typography>

                <Box component="form" onSubmit={submit}>

                    <TextField margin="normal" required fullWidth id="username"
                               onChange={(event) => setUsername(event.target.value)}
                               label="Username" name="username" autoFocus autoComplete="username"/>

                    <TextField margin="normal" required fullWidth name="password"
                               onChange={(event) => setPassword(event.target.value)}
                               label="Password" type="password" id="password" autoComplete="current-password"/>
                    {/*<Alert style={{width: "100%", alignSelf: "center", display: ((failure) ? 'block' : 'none')}}*/}
                    {/*       severity="error"><h5>Error - {failure}.</h5></Alert>*/}

                    <Button type="submit" fullWidth variant="contained" color="success" sx={{mt: 3, mb: 2}}>
                        Sign In </Button>

                    <Link to={`/pages/CreateAccount?redirect${redirectTo}`}>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 3, borderRadius: '10px'}}>
                            Create Account </Button>
                    </Link>

                </Box>
        </Box>
    </Container>
    );
}
