//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {grey} from '@mui/material/colors';

import axios from "axios";
import {ContextStore} from "../ContextStore";
import MessageAlert from "../components/Demo/MessageAlert";
import {ArrowForward} from "@mui/icons-material";
import {Badge} from "react-bootstrap";
import './styles/AccountManagement.css';

export default function AccountManagement() {
    const [lastchanged, lcupdate] = useState("");
    const [orders, setOrders] = useState([]);
    const {state,} = useContext(ContextStore)
    const {userInfo} = state

    let navigate = useNavigate();

    function price(num) {
        return "$" + num?.toFixed(2);
    }


    useEffect(() => {
        if (userInfo) {
            axios.get("/api/orders/user", {"headers": {"Authorization": "Bearer " + userInfo.token}})
                .then((response) => {
                    console.log(response.data.orders);

                    response.data.orders.forEach(o => {
                        var n = {
                            id: o._id.toUpperCase(),
                            cost: o.totalPrice,
                            timestamp: "Order Placed on: " + new Date(o.createdAt).toLocaleString("en-US",
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                }),
                            status: o.paymentStatus,
                            items: []
                        };

                        o.items.forEach(i => {
                            var s = ""
                            if (i.quantity > 1)
                                s = "(" + i.quantity + ") " + i.name + " (" + i.quantity + " x " + price(i.price) + ")"
                            else
                                s = i.name + " (" + price(i.price) + ")"
                            n.items.push(s);
                        })

                        n.items.push("Shipping: " + price(o.shippingFee));
                        n.items.push("Taxes: " + price(o.taxPrice));
                        // check if order not already in list
                        let found = false;
                        orders.forEach(o => {
                            if (o.id === n.id)
                                found = true;
                        });
                        if (!found)
                            setOrders(orders => [...orders, n]);

                    });
                });
        } else {
            console.log("no user info")
        }
    }, [userInfo]);


    // useEffect(() => {
    //         if (!userInfo) {
    //             navigate("/pages/Login?redirect=/pages/AccountManagement");
    //         }
    //     }, [userInfo, navigate]
    // )

    // if (null === localStorage.getItem("token"))
    //     return <Navigate to="/"/>

    // var userData = JSON.parse(localStorage.getItem("token")).data;


    // function logout(event)
    // {
    //     localStorage.removeItem("token");
    //     navigate("/")
    // }

    function updateUser(event) {
        event.preventDefault();
        lcupdate("");
        const u = Object.fromEntries(new FormData(event.currentTarget));

        console.log("Updating user with parameter: " + JSON.stringify(u));

        axios.put("/api/users/account", u, {"headers": {"Authorization": "Bearer " + userInfo.token}})
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("token", JSON.stringify(response));

                lcupdate(Object.keys(u)[0]);
            })
            .catch((error) => {
                console.log(JSON.stringify(error.response.data.message));
                lcupdate("fail-" + Object.keys(u)[0]);
            })
    }

    // if (localStorage.getItem('token') === null)
    //     return <Navigate to="../pages/Login"/>

    return (
        <>
            {
                !userInfo ? (<MessageAlert custStyle={{marginTop: '1.5em'}}><h1>You are not signed In</h1> <br/>
                    <Link style={{color: 'black'}} to={'/pages/Login?redirect=/pages/AccountManagement'}>Please sign in
                        first before accessing your account <ArrowForward/></Link>
                </MessageAlert>) : (
                    <Container component="main" maxWidth="xs"
                               style={{
                                   backgroundColor: "white",
                                   marginTop: "3em",
                                   marginBottom: '3em',
                                   minWidth: "50%"
                               }}>
                        <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center",}}>

                            <Typography component="h1" variant="h3" style={{color: "black"}}> Account
                                Info </Typography>

                            <Box
                                component="form" onSubmit={updateUser} sx={{
                                marginTop: 3, display: "flex", flexDirection: "row", alignItems: "center", width: "95%"
                            }}>
                                <TextField
                                    required fullWidth variant="outlined" InputProps={{style: {fontSize: "125%"}}}
                                    InputLabelProps={{style: {fontSize: "125%"}}}
                                    name="username" autoFocus defaultValue={userInfo.username} label="Change Username"/>
                                <IconButton type="submit" color="inherit" sx={{
                                    backgroundColor: "darkgrey", transition: "background 0.5s, color 0.5s",
                                    ":hover": {backgroundColor: "black"}
                                }}>
                                    <EditIcon sx={{color: grey[50]}}/>
                                </IconButton>
                            </Box>
                            <Alert style={{width: "90%", display: ((lastchanged === "username") ? 'block' : 'none')}}
                                   severity="success">You've
                                successfully changed your username!</Alert>
                            <Alert
                                style={{width: "90%", display: ((lastchanged === "fail-username") ? 'block' : 'none')}}
                                severity="error">Error - failed to change username.</Alert>

                            <Box
                                component="form" onSubmit={updateUser} sx={{
                                marginTop: 3, display: "flex", flexDirection: "row", alignItems: "center", width: "95%"
                            }}>
                                <TextField required fullWidth variant="outlined"
                                           InputProps={{style: {fontSize: "125%"}}}
                                           InputLabelProps={{style: {fontSize: "125%"}}}
                                           name="name" defaultValue={userInfo.name} label="Change Name"/>
                                <IconButton type="submit" color="inherit" sx={{
                                    backgroundColor: "darkgrey", transition: "background 0.5s, color 0.5s",
                                    ":hover": {backgroundColor: "black"}
                                }}>
                                    <EditIcon sx={{color: grey[50]}}/>
                                </IconButton>
                            </Box>
                            <Alert style={{width: "90%", display: ((lastchanged === "name") ? 'block' : 'none')}}
                                   severity="success">You've
                                successfully changed your name!</Alert>
                            <Alert style={{width: "90%", display: ((lastchanged === "fail-name") ? 'block' : 'none')}}
                                   severity="error">Error
                                - failed to change name.</Alert>

                            <Box
                                component="form" onSubmit={updateUser} sx={{
                                marginTop: 3, display: "flex", flexDirection: "row", alignItems: "center", width: "95%"
                            }}>
                                <TextField required fullWidth variant="outlined"
                                           InputProps={{style: {fontSize: "125%"}}}
                                           InputLabelProps={{style: {fontSize: "125%"}}}
                                           name="email" defaultValue={userInfo.email} label="Change Email"/>
                                <IconButton type="submit" color="inherit" sx={{
                                    backgroundColor: "darkgrey", transition: "background 0.5s, color 0.5s",
                                    ":hover": {backgroundColor: "black"}
                                }}>
                                    <EditIcon sx={{color: grey[50]}}/>
                                </IconButton>
                            </Box>
                            <Alert style={{width: "90%", display: ((lastchanged === "email") ? 'block' : 'none')}}
                                   severity="success">You've
                                successfully changed your email!</Alert>
                            <Alert style={{width: "90%", display: ((lastchanged === "fail-email") ? 'block' : 'none')}}
                                   severity="error">Error - failed to change email address.</Alert>

                            <Box
                                component="form" onSubmit={updateUser} sx={{
                                marginTop: 3, display: "flex", flexDirection: "row", alignItems: "center", width: "95%"
                            }}>
                                <TextField required fullWidth variant="outlined"
                                           InputProps={{style: {fontSize: "125%"}}}
                                           InputLabelProps={{style: {fontSize: "125%"}}}
                                           name="password" label="Change Password"/>
                                <IconButton type="submit" color="inherit" sx={{
                                    backgroundColor: "darkgrey", transition: "background 0.5s, color 0.5s",
                                    ":hover": {backgroundColor: "black"}
                                }}>
                                    <EditIcon sx={{color: grey[50]}}/>
                                </IconButton>
                            </Box>
                            <Alert style={{width: "90%", display: ((lastchanged === "password") ? 'block' : 'none')}}
                                   severity="success">You've successfully changed your password!</Alert>
                            <Alert
                                style={{width: "90%", display: ((lastchanged === "fail-password") ? 'block' : 'none')}}
                                severity="error">Error - failed to change password.</Alert>

                            {/*<Box*/}
                            {/*    sx={{marginTop: 4, marginBottom: 2, alignItems: "center", width: "80%"}}>*/}
                            {/*    <Button variant="contained" fullWidth color="error" onClick={logout}>Log Out</Button></Box>*/}

                            <Typography component="h1" variant="h3" style={{color: "black"}}> Your Orders
                                ({orders.length}) </Typography>

                            <Grid container direction="column" spacing={4} alignItems="center" justifyContent="center"
                                  sx={{marginBottom: "50px"}}>
                                {orders.map((o) => {
                                    return (
                                        <Grid key={o.id} item sx={{width: "100%"}}>
                                            <Card sx={{backgroundColor: "#eeeeee"}}>
                                                <CardContent>

                                                    <Typography variant="h5" color="text.secondary" gutterBottom>
                                                        Order # <Link className='order-link'
                                                                      to={`/orders/${o.id}`}>{o.id} <ArrowForward
                                                        fontSize='large'/></Link>
                                                    </Typography>
                                                    <Typography variant="h4" component="div">
                                                        Total cost: {price(o.cost)}
                                                    </Typography>
                                                    <Typography variant="h5" color="text.secondary">
                                                        {o.timestamp}
                                                    </Typography>
                                                    <Typography variant="h5" color="text.secondary">
                                                        Order Status: {
                                                        o.status === "Pending" ?
                                                            <Badge bg="warning text-black">{o.status}</Badge> :
                                                            o.status === "Paid" ?
                                                                <Badge bg="success text-white">{o.status}</Badge> :
                                                                <Badge bg="danger">{o.status}</Badge>

                                                    }
                                                    </Typography>
                                                    <List key={o.id}>
                                                        {o.items.map((i, index) => {
                                                            return <ListItem
                                                                sx={{display: 'list-item', fontSize: "125%"}}
                                                                key={i + index}>⚫{i}</ListItem>;
                                                        })}
                                                    </List>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>

                        </Box>
                    </Container>
                )}
        </>
);
}
