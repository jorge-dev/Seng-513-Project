//This code is heavily inspired (but not verbatim copied) from: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, CssBaseline, TextField, Box, Typography,
Container, Grid, Card, CardContent, List, ListItemText} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

var currentUsername = "MyCurrentUsername"

document.body.style.backgroundColor = "#ebebeb"
//order#, cost, timestamp, list of items

var orders = [ //Dummy data for now.
{
    id: 1111,
    cost: 1000.50,
    timestamp: "2022-03-25 5:30PM UTC",
    items: [ "Super Gaming Keyboard", "Programmer's Mice", "Ultra Gamer's Monitor 8k", "Audiophile Headphones PRO"]
},
{
    id: 2222,
    cost: 22.54,
    timestamp: "2022-03-25 5:30PM UTC",
    items: ["USB-C Power Hub"]
},
{
    id: 3333,
    cost: 117.25,
    timestamp: "2022-03-25 5:30PM UTC",
    items: ["USB 3.0 Extension Cable", "USB 3.0 Extension Cable", "USB Microphone MicStar Model 14MICA"]
}
]

export default function AccountManagement()
{

    function changeUsername(event)
    {
        event.preventDefault();
        const u = new FormData(event.currentTarget).get("username");
        console.log(u);
    }

    function changePassword(event)
    {
        event.preventDefault();
        const u = new FormData(event.currentTarget).get("password");
        console.log(u);
    }

    return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography component="h1" variant="h3"> Account Info </Typography>

        <Box component="form" onSubmit={changeUsername} sx={{marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TextField required fullWidth id="changeUsername" label="Change Your Username" name="username"
        autoFocus defaultValue={currentUsername} />
        <Button variant="contained" type="submit">Change</Button>
        </Box>

        <Box component="form" onSubmit={changePassword} sx={{marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TextField margin="normal" fullWidth id="changePassword" label="Change Your Password" name="password"
        autoFocus />
        <Button variant="contained" type="submit" required>Change</Button>
        </Box>

        <Typography component="h1" variant="h3"> List of Purchases </Typography>

        <Grid container direction="column" spacing={4} alignItems="center" justifyContent="center">
        {orders.map(o => {return (
            <Grid item sx={{ width: "150%", marginBottom: 5}}>
            <Card>
                <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>Order #{o.id}</Typography>
                <Typography variant="h4" component="div">${o.cost}</Typography>
                <Typography variant="h5" color="text.secondary">{o.timestamp}</Typography>
                <Typography variant="body1">
                    <List>
                    {o.items.map(i => {return (<ListItemText>{i}</ListItemText>)})}
                    </List>
                </Typography>
                </CardContent>
            </Card>
            </Grid>)})}
        </Grid>

        </Box>
    </Container>
    </ThemeProvider>
    )
}