import React from 'react'
import {Col, Container, Row, InputGroup, FormControl} from 'react-bootstrap'
import "./styles/Contact.css"
import {Email} from "@mui/icons-material";
import {Button} from "@mui/material";
import {toast} from "react-toastify";

export default function Contact() {
    return (
        <Container className="contact-content"
                   style={{paddingBottom: '1em', borderRadius: "30px", background: '#252836', maxWidth: '600px'}}>
            <Row>
                <h1 className="title">Contact Us</h1>
            </Row>
            <Row>

                <Col md={12}>
                    <p className='body text-center'>
                        If you would like to contact us for more product information or any other issues you are
                        experiencing
                        with the site or products, please provide your name and email address and we will contact you as
                        soon
                        as we can.
                    </p>
                </Col>


            </Row>
            <Row className='new-row'>

                <Col md={6} className='mb-3'>
                    <InputGroup>
                        <FormControl placeholder="Full Name*" aria-describedby="basic-addon1"/>
                    </InputGroup>
                </Col>
                <Col md={6} className='mb-3'>
                    <InputGroup>
                        <FormControl placeholder="Email*" aria-describedby="basic-addon1"/>
                    </InputGroup>
                </Col>

            </Row>
            <Row className='new-row'>

                <Col md={12} className='mb-4'>
                    <InputGroup>
                        <FormControl size="lg" placeholder="Message" as="textarea" aria-label="With textarea"/>
                    </InputGroup>
                </Col>

            </Row>
            <Row>

                <Col md={12} className="send-button">
                    <Button sx={{borderRadius: '15px', padding: '1em'}}
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                toast.success('Your message has been sent', {
                                    autoClose: 3000,
                                    position: toast.POSITION.TOP_CENTER,
                                    theme: 'colored'
                                });
                            }}
                            color="primary" size='large' endIcon={<Email/>}>
                        Send message </Button>

                </Col>

            </Row>
        </Container>
    );
}
