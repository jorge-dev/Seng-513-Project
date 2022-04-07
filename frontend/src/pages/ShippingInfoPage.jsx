import React, {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Box, Button, Container, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ContextStore} from "../ContextStore";
import {Payment} from "@mui/icons-material";
import CustomStepper from "../components/CustomeStepper";


const textFieldStyle = {
    marginTop: "2rem",

    '& label': {
        color: '#fff',
        fontSize: '1rem',

    },
    '& input': {
        color: '#fff',
        fontSize: '1.2rem',

    },
    '& label.Mui-focused': {
        color: 'green',

    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: "15px",
        '& fieldset': {
            borderColor: '#CCCCCC',
            borderWidth: '3px',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
            borderWidth: '3px',

        }
    }
};

export default function ShippingInfoPage() {
    const {state: ctxState, setState: setCtxState} = useContext(ContextStore);
    const {userInfo, cart: {shippingInfo}} = ctxState;
    console.log(shippingInfo);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState(shippingInfo.fullName || "");
    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
    const [country, setCountry] = useState(shippingInfo.country || "");
    const [errorFullName, setErrorFullName] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [errorCity, setErrorCity] = useState("");
    const [errorPostalCode, setErrorPostalCode] = useState("");
    const [errorCountry, setErrorCountry] = useState("");

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        console.log("name and value: ", name, value);
        switch (name) {
            case "fullName":
                if (value.length > 0) {
                    setFullName(value);
                    setErrorFullName("");
                } else {
                    setFullName(" ");
                    setErrorFullName("Please enter your full name");
                }

                break;
            case "address":
                if (value.length > 0) {
                    setAddress(value);
                    setErrorAddress("");

                } else {
                    setAddress("");
                    setErrorAddress("Please enter your address");
                }
                break;
            case "city":
                if (value.length > 0) {
                    setCity(value);
                    setErrorCity("");

                } else {
                    setCity("");
                    setErrorCity("Please enter your city");
                }
                break;
            case "postalCode":
                if (value.length > 0) {
                    setErrorPostalCode("");

                    setPostalCode(value);
                } else {
                    setPostalCode("");
                    setErrorPostalCode("Please enter your postal code");
                }
                break;
            case "country":
                if (value.length > 0) {
                    setCountry(value);
                    setErrorCountry("");
                } else {
                    setCountry("");
                    setErrorCountry("Please enter your country");
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
            if (!userInfo) {
                navigate("/pages/Login?redirect=/shipping");
            }
        }, [userInfo, navigate]
    )


    const handleSubmit = (event) => {
        event.preventDefault();

        // const {cart} = ctxState;
        setCtxState({
            type: 'SAVE_SHIPPING_INFO',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem('shippingInfo', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country
        }));
        navigate("/paymentMethod");
    };
    return (
        <div>
            <Helmet>
                <title>Shipping Information</title>
            </Helmet>
            <CustomStepper step1/>
            <h1 className="text-center mt-4">Shipping Information</h1>

            <Container component="main" maxWidth="md"
                       style={{marginTop: '1em', borderRadius: "30px", background: '#252836', maxWidth: '600px'}}>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} textAlign='center'>

                    <Box component="form" onSubmit={handleSubmit}>

                        <TextField margin="dense" required fullWidth id="fullName"
                                   error={errorFullName !== ""}
                                   helperText={errorFullName}
                                   sx={textFieldStyle}
                                   onChange={handleOnChange}
                                   label="Full Name" name="fullName" autoFocus
                                   defaultValue={fullName}

                                   variant="outlined"/>

                        <TextField margin="dense" required fullWidth id="address" label="Address" name="address"
                                   sx={textFieldStyle}
                                   error={errorAddress !== ""}
                                   helperText={errorAddress}
                                   defaultValue={address}
                                   onChange={handleOnChange}
                        />
                        <TextField margin="dense" required fullWidth id="city" label="City" name="city"
                                   sx={textFieldStyle}
                                   error={errorCity !== ""}
                                   helperText={errorCity}
                                   defaultValue={city}
                                   onChange={handleOnChange}
                        />
                        <TextField margin="normal" required fullWidth id="postalCode" label="Postal Code"
                                   sx={textFieldStyle}
                                   error={errorPostalCode !== ""}
                                   helperText={errorPostalCode}
                                   name="postalCode"
                                   defaultValue={postalCode}
                                   onChange={handleOnChange}
                        />
                        <TextField margin="dense" required fullWidth id="country" label="Country" name="country"
                                   sx={textFieldStyle}
                                   error={errorCountry !== ""}
                                   helperText={errorCountry}
                                   defaultValue={country}
                                   onChange={handleOnChange}
                        />

                        <Button sx={{borderRadius: '15px', margin: " 2em auto", padding: '1em'}}
                                type="submit"
                                variant="contained"
                                color="primary" size='large' endIcon={<Payment/>}>
                            Proceed to Payment Method </Button>


                    </Box>
                </Box>
            </Container>
        </div>
    )
        ;
}
