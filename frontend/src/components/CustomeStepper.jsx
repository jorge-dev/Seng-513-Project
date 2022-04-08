import React from "react";
import {Col, Row} from "react-bootstrap";
import "./styles/CustomeStepper.css";

export default function CustomStepper(props) {
    const {step1, step2, step3} = props
    return (
        <Row className='main-stepper mx-3'>
            <Col className={step1 ? 'active text-center' : 'text-center'}>Shipping</Col>
            <Col className={step2 ? 'active text-center' : 'text-center'}>Payment Method</Col>
            <Col className={step3 ? 'active text-center' : 'text-center'}>Place Order</Col>
        </Row>
    );
}
