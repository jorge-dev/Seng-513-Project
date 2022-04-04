import React, {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import CustomStepper from "../../components/Demo/CustomeStepper";
import {Box, Button, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ContextStore} from "../../ContextStore";
import {Form,} from "react-bootstrap";

export default function PayMethodPage() {

    const navigate = useNavigate();
    const {state, setState: ctxDispatch} = useContext(ContextStore);
    const {
        cart: {shippingInfo, paymentMethod},
    } = state;
    console.log(paymentMethod);
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );

    useEffect(() => {
        if (!shippingInfo.address) {
            navigate('/shipping');
        }
    }, [shippingInfo, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(paymentMethodName);
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeOrder');
    }
    return (
        <div>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <CustomStepper step1 step2/>
            <h1 className="text-center mt-4">Payment Method</h1>

            <Container component="main" maxWidth="md"
                       style={{marginTop: '1em', borderRadius: "30px", background: '#252836', maxWidth: '375px'}}>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                     textAlign='center'>

                    <Form onSubmit={submitHandler}>
                        <div className="mt-3">
                            <Form.Check style={{fontSize: '2em'}}

                                        type="radio"
                                        id="PayPal"
                                        label={<>Paypal <i
                                            className="fa-brands fa-paypal mx-4"/></>}
                                        value="PayPal"
                                        checked={paymentMethodName === 'PayPal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>
                        <div className="mb-t">
                            <Form.Check
                                style={{fontSize: '2em'}}
                                type="radio"
                                id="Stripe"
                                label={<>Stripe <i
                                    className="fa-brands fa-stripe mx-4"/></>}
                                value="Stripe"
                                checked={paymentMethodName === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Button sx={{borderRadius: '15px', margin: " 2em auto", padding: '1em'}}
                                    type="submit"
                                    variant="contained"
                                    color="primary" size='large'>
                                <span className="btn-text"> Proceed to Order</span>
                            </Button>
                        </div>
                    </Form>


                </Box>
            </Container>
        </div>
    )
}