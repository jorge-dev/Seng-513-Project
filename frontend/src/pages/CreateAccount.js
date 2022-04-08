//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, TextField, Box, Typography, Container} from '@mui/material';
import axios from "axios";
import './styles/CreateAccount.css'
import {ContextStore} from "../ContextStore";
import {toast} from "react-toastify";
import {getErrorMessage} from "../utils/handleApiError";
export default function CreateAccount()
{
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // console.log(redirectInUrl);
    const redirectTo = redirectInUrl ? redirectInUrl : '/';
    // const [failure, fupdate] = useState(0);
    const {state: ctxState, setState: setCtxState} = useContext(ContextStore)
    const {userInfo} = ctxState;

    const submit = async (event) => {

        event.preventDefault();

        try {
            const {data} = await axios.post('/api/users/account', {
                username,
                password,
                name,
                email
            });
            // remove createdAt from data
            delete data.createdAt;
            console.log(data);
            // console.log(data);
            setCtxState({type: "SIGN_IN", payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate(redirectTo || '/');
        } catch (error) {
            // fupdate(error.response.data.message)
            toast.error(getErrorMessage(error), {
                theme: "colored",
                position: "top-center",
                autoClose: 2000
            });

        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirectTo);
        }
    }, [navigate, redirectTo, userInfo]);
    // function submit(event)
    // {
    //     fupdate("");
    //     event.preventDefault();
    //
    //     const account = Object.fromEntries(new FormData(event.currentTarget));
    //     console.log("Attempting to create an account: " + JSON.stringify(account));
    //     axios.post("/api/users/account", account)
    //         .then((response) => {
    //         console.log(response.data);
    //         localStorage.setItem("userinfo", JSON.stringify(response));
    //         navigate("/");
    //         })
    //         .catch((error) => { fupdate(error.response.data.message); })
    // }

    return (
        <Container className='create-acc-container'>
            <Box sx={{marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <Typography component="h1" variant="h3" className='text-center' style={{color: "black"}}> Create
                    Account </Typography>

                <Box component="form" onSubmit={submit}>

                    <TextField margin="normal" fullWidth required
                               onChange={(event) => setUsername(event.target.value)}
                               label="Username" name="username" autoComplete="on"/>

                    <TextField margin="normal" fullWidth required
                               label="Your Name" name="name" autoComplete="on"
                               onChange={(event) => setName(event.target.value)}/>
                    />

                    <TextField margin="normal" fullWidth required
                               label="Email" type="email" name="email" autoComplete="on"
                               onChange={(event) => setEmail(event.target.value)}/>
                    />

                    <TextField margin="normal" fullWidth required
                               label="Password" type="password" name="password" autoComplete="on"
                               onChange={(event) => setPassword(event.target.value)}/>
                    />

                    {/*<Alert style={{width: "100%", alignSelf: "center", display: ((failure) ? 'block' : 'none')}}*/}
                    {/*       severity="error"><h5>Error - {failure}.</h5></Alert>*/}

                    <Button type="submit" fullWidth variant="contained" color="success"
                            sx={{mt: 3, mb: 3, borderRadius: '10px'}}>
                        Create Account </Button>
                </Box>
          </Box>
      </Container>
    );
}
