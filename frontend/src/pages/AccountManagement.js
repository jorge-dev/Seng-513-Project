//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    List,
    ListItemText,
    Alert
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

var orders = [ //Dummy data for now.
    {
        id: 1111,
        cost: 1000.5,
        timestamp: "2022-03-25 5:30PM UTC",
        items: [
        "Super Gaming Keyboard",
        "Programmer's Mice",
        "Ultra Gamer's Monitor 8k",
        "Audiophile Headphones PRO",
        ],
    },
    {
        id: 2222,
        cost: 22.54,
        timestamp: "2022-03-25 5:30PM UTC",
        items: ["USB-C Power Hub"],
    },
    {
        id: 3333,
        cost: 117.25,
        timestamp: "2022-03-25 5:30PM UTC",
        items: [
        "USB 3.0 Extension Cable",
        "USB 3.1 Extension Cable",
        "USB Microphone MicStar Model 14MICA",
        ],
    },
];

export default function AccountManagement()
{
    const [lastchanged, lcupdate] = useState(0);

    let navigate = useNavigate();

    if (null === localStorage.getItem("token"))
        return <Navigate to="/"/>

    var userData = JSON.parse(localStorage.getItem("token")).data;

    function logout(event)
    {
        localStorage.removeItem("token");
        navigate("/")
    }

    function updateUser(event)
    {
        event.preventDefault();
        lcupdate("");
        const u = Object.fromEntries(new FormData(event.currentTarget));

        console.log("Updating user with parameter: " + JSON.stringify(u));

        axios.put("/api/users/account", u, {"headers": {"Authorization": "Bearer " + userData.token}})
        .then((response) =>
        {
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response));

            lcupdate(Object.keys(u)[0]);
        })
        .catch((error) =>
        {
            console.log(JSON.stringify(error.response.data.message));
            lcupdate("fail-" + Object.keys(u)[0]);
        })
    }

    if (localStorage.getItem('token') === null)
        return <Navigate to="../pages/Login"/>

    return (
    <Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginTop: "150px"}}>
    <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }} >

    <Typography component="h1" variant="h3" style={{color: "black", marginTop: "50px"}}> Account Info </Typography>

    <Box
    component="form" onSubmit={updateUser} sx={{
    marginTop: 8, display: "flex", flexDirection: "row", alignItems: "center",}}>
    <TextField
    required fullWidth variant="filled"
    name="username" autoFocus defaultValue={userData.username} label="Change Username"/>
    <Button variant="contained" type="submit"> Change </Button>
    </Box>
    <Alert style={{ display: ((lastchanged === "username") ? 'block' : 'none') }} severity="success">You've successfully changed your username!</Alert>
    <Alert style={{ display: ((lastchanged === "fail-username") ? 'block' : 'none') }} severity="error">Error - failed to change username.</Alert>

    <Box
    component="form" onSubmit={updateUser} sx={{
    marginTop: 8, display: "flex", flexDirection: "row", alignItems: "center",}}>
    <TextField required fullWidth variant="filled"
    name="name" defaultValue={userData.name} label="Change Name"/>
    <Button variant="contained" type="submit"> Change </Button>
    </Box>
    <Alert style={{ display: ((lastchanged === "name") ? 'block' : 'none') }} severity="success">You've successfully changed your name!</Alert>
    <Alert style={{ display: ((lastchanged === "fail-name") ? 'block' : 'none') }} severity="error">Error - failed to change name.</Alert>

    <Box
    component="form" onSubmit={updateUser} sx={{
    marginTop: 8, display: "flex", flexDirection: "row", alignItems: "center",}}>
    <TextField required fullWidth variant="filled"
    name="email" defaultValue={userData.email} label="Change Email"/>
    <Button variant="contained" type="submit"> Change </Button>
    </Box>
    <Alert style={{ display: ((lastchanged === "email") ? 'block' : 'none') }} severity="success">You've successfully changed your email!</Alert>
    <Alert style={{ display: ((lastchanged === "fail-email") ? 'block' : 'none') }} severity="error">Error - failed to change email address.</Alert>

    <Box
    component="form" onSubmit={updateUser} sx={{
    marginTop: 8, display: "flex", flexDirection: "row", alignItems: "center",}}>
    <TextField required fullWidth variant="filled"
    name="password" label="Change Password"/>
    <Button variant="contained" type="submit"> Change </Button>
    </Box>
    <Alert style={{ display: ((lastchanged === "password") ? 'block' : 'none') }} severity="success">You've successfully changed your password!</Alert>
    <Alert style={{ display: ((lastchanged === "fail-password") ? 'block' : 'none') }} severity="error">Error - failed to change password.</Alert>

    <Box
    sx={{ marginTop: 4, marginBottom: 2, alignItems: "center",}}>
    <Button variant="contained"  onClick={logout}>Log Out</Button></Box>

    <Typography component="h1" variant="h3">
    List of Purchases
    </Typography>

    <Grid container direction="column" spacing={4} alignItems="center" justifyContent="center">
    {orders.map((o) => {
    return (
    <Grid key={o.id} item sx={{ marginBottom: 5 }}>
        <Card>
        <CardContent>

        <Typography variant="h5" color="text.secondary" gutterBottom>
            Order #{o.id}
        </Typography>
        <Typography variant="h4" component="div">
            ${o.cost}
        </Typography>
        <Typography variant="h5" color="text.secondary">
            {o.timestamp}
        </Typography>
        <List key={o.id}>
            {o.items.map((i) =>
            { return <ListItemText key={i}>{i}</ListItemText>; })}
        </List>

        </CardContent>
        </Card>
    </Grid>
    );})}
    </Grid>
    
    </Box>
    </Container>
);
}
