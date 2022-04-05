import React from 'react'
import { Col, Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import "./styles/Contact.css"

// Init a reducer Hook to handle the data from the API
const reducerHook = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, loading: true };
        case "FETCH_DATA_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_DATA_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default function Contact() {
    return (
        <Container className="contact-content"  fluid>
            <Row>
                <h1 className="title">Contact Us</h1>
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col>
                    <p className='body'>
                        If you would like to contact us for more product information or any other issues you are experiencing
                        with the site or products, please provide your name and email address and we will contact you as soon
                        as we can.
                    </p>
                </Col>
                <Col md={2}></Col>

            </Row>
            <Row className='new-row'>
                <Col></Col>
                <Col >
                    <InputGroup>
                        <FormControl placeholder="Full Name*" aria-describedby="basic-addon1"/>
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup>
                        <FormControl placeholder="Email*" aria-describedby="basic-addon1"/>
                    </InputGroup>
                </Col>
                <Col></Col>
            </Row>
            <Row className='new-row'>
                <Col></Col>
                <Col >
                    <InputGroup>
                        <FormControl size="lg" placeholder="Message" as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col className="send-button"><Button variant="primary" size='lg' onClick={() => window.location.reload(false)}>✉️ Send</Button></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
