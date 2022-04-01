//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Alert, Button, TextField, Box, Typography, Container} from '@mui/material';
import axios from "axios";

export default function CreateAccount()
{
    const [failure, fupdate] = useState(0);

    let navigate = useNavigate();

    function submit(event)
    {
        fupdate("");
        event.preventDefault();

        const account = Object.fromEntries(new FormData(event.currentTarget));
        console.log("Attempting to create an account: " + JSON.stringify(account));
        axios.post("/api/users/account", account)
            .then((response) => {
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response));
            navigate("/");
            })
            .catch((error) => { fupdate(error.response.data.message); })
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

              <Alert style={{ width: "100%", alignSelf: "center", display: ((failure) ? 'block' : 'none') }} severity="error"><h5>Error - {failure}.</h5></Alert>

              <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
              Create Account </Button>
          </Box>
          </Box>
      </Container>
    );
}
