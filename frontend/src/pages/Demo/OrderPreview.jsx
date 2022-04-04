import React, {useContext, useEffect, useReducer} from 'react';
import {Helmet} from "react-helmet-async";
import CustomStepper from "../../components/Demo/CustomeStepper";
import {Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {ContextStore} from "../../ContextStore";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {getErrorMessage} from "../../utils/handleApiError";
import {toast} from "react-toastify";
import axios from "axios";
import LoadingScreen from "../../components/Demo/LoadingScreen";
import './styles/PlaceOrderStyles.css';
import {Edit} from "@mui/icons-material";

const TAX_RATE = 0.15;

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_ORDER_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CREATE_ORDER_SUCCESS':
            return {
                ...state,
                loading: false,

            };
        case 'CREATE_ORDER_FAILURE':
            return {
                ...state,
                loading: false,

            };

        default:
            return state;
    }
}

export default function OrderPreview() {
    const navigate = useNavigate();
    const [{loading, error}, dispatch] = useReducer(reducer, {
        loading: false,
        error: ''
    });
    const {state, setState: ctxDispatch} = useContext(ContextStore);


    const roundTo2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const {
        cart, userInfo
    } = state;


    cart.itemsPrice = roundTo2(cart.items.reduce((a, b) => a + b.quantity * b.price, 0));
    // console.log(cart);
    cart.shippingPrice = cart.itemsPrice > 50 ? roundTo2(0) : roundTo2(9.99);
    cart.taxPrice = roundTo2(cart.itemsPrice * TAX_RATE);
    cart.totalPrice = roundTo2(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

    // console.log("This is the shipping info", cart.shippingInfo);
    const placeOrder = async () => {
        try {
            dispatch({type: 'CREATE_ORDER_REQUEST'});
            const {data} = await axios.post('/api/orders', {
                    items: cart.items,
                    shippingAddress: cart.shippingInfo,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingFee: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userInfo.token}`
                    }
                }
            );
            ctxDispatch({type: 'EMPTY_CART'});
            dispatch({type: 'CREATE_ORDER_SUCCESS'});
            toast.success('Order placed successfully', {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            });
            localStorage.removeItem('items');
            navigate(`/orders/${data.newOrder._id}`);


        } catch (e) {
            dispatch({type: 'CREATE_ORDER_FAILURE'});
            // console.log(e.response)
            toast.error(getErrorMessage(e), {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            });

        }
    }
    useEffect(() => {
            if (!cart.paymentMethod) {
                navigate('/paymentMethod');
            }
        }, [cart]
    );
    return (
        <div>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <CustomStepper step1 step2 step3/>
            <h1 className="text-center mt-4">Preview Order</h1>
            <Container
                style={{marginTop: '1em', borderRadius: "30px", background: '#252836', paddingTop: '10px'}}>
                < Row style={{marginTop: '1em', background: 'transparent'}}>
                    <Col md={4}><Card className='mb-3'
                                      style={{
                                          background: 'transparent',
                                          borderRadius: '10px',
                                          border: '1px solid white',
                                      }}>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant={"flush"}>
                                <ListGroup.Item style={{borderBottom: '1px dashed gray'}}>
                                    <Row className='align-items-center'>
                                        <Col md={6}>Subtotal:</Col>
                                        <Col md={6}>{cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item style={{borderBottom: '1px dashed gray'}}>
                                    <Row className='align-items-center'>
                                        <Col md={6}>Shipping:</Col>
                                        <Col
                                            md={6}>{cart.shippingPrice > 0 ? cart.shippingPrice.toFixed(2) : "Free"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item style={{borderBottom: '1px solid white'}}>
                                    <Row className='align-items-center'>
                                        <Col md={6}>Tax</Col>
                                        <Col md={6}>{cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item style={{borderBottom: 'none'}}>
                                    <Row className='align-items-center'>
                                        <Col md={6}><span
                                            style={{
                                                color: '#4ef50c',
                                                fontSize: '1.5em',
                                                fontWeight: "bolder"
                                            }}>Order Total:</span></Col>
                                        <Col md={6}><span
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#4ef50c',
                                                fontSize: '1.2em'
                                            }}>$ {cart.totalPrice}</span></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Container className="text-center mt-3">

                                        <Button sx={{

                                            borderRadius: '15px'
                                        }} className="text-center align-middle" variant="contained" size="large"
                                                onClick={placeOrder}
                                        >
                                            <span className="btn-text"> Place Order</span>
                                        </Button>
                                    </Container>
                                    {loading && <LoadingScreen open={loading}/>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>

                    </Card></Col>

                    < Col md={8}>
                        <Card className='mb-3'
                              style={{background: 'transparent', border: '1px solid white', borderRadius: '10px'}}>
                            <Card.Body>
                                <Card.Title>Shipping Summary</Card.Title>
                                <Card.Text>
                                    <strong>Name: </strong> {cart.shippingInfo.fullName}<br/>
                                    <strong>Address: </strong> {cart.shippingInfo.address}{' '}
                                    {cart.shippingInfo.postalCode}, {cart.shippingInfo.city}, {cart.shippingInfo.country}<br/>

                                </Card.Text>
                                <Link to='/shipping' className='edit-info'>
                                    <Button variant="contained" size="small"
                                            style={{borderRadius: '15px', color: 'white', fontSize: '.7rem'}}
                                            startIcon={<Edit/>}>
                                        <span className="btn-text">Edit</span>
                                    </Button>
                                </Link>
                            </Card.Body>

                        </Card>
                        <Card className='mb-3'
                              style={{background: 'transparent', border: '1px solid white', borderRadius: '10px'}}>
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong>Method: </strong> {cart.paymentMethod}{cart.paymentMethod === "PayPal" ?
                                    <i
                                        className="fa-brands fa-paypal mx-2" style={{fontSize: '1.3em'}}/> : <i
                                        className="fa-brands fa-stripe mx-2" style={{fontSize: '1.3em'}}/>}

                                </Card.Text>
                                <Link to='/paymentMethod' className='edit-info'>
                                    <Button variant="contained" size="small"
                                            style={{borderRadius: '15px', color: 'white', fontSize: '.7rem'}}
                                            startIcon={<Edit/>}>
                                        <span className="btn-text">Edit</span>
                                    </Button>
                                </Link>
                            </Card.Body>

                        </Card>
                        <Card className='mb-3'
                              style={{background: 'transparent', border: '1px solid white', borderRadius: '10px'}}>
                            <Card.Body>
                                <Card.Title>Items In cart</Card.Title>
                                <Card.Text>
                                    <Link to='/shoppingCart' className='edit-info'>
                                        <Button variant="contained" size="small"
                                                style={{borderRadius: '15px', color: 'white', fontSize: '.7rem'}}
                                                startIcon={<Edit/>}>
                                            <span className="btn-text">Edit</span>
                                        </Button>
                                    </Link>
                                </Card.Text>
                                <ListGroup variant={"flush"} className='border-top'>
                                    {cart.items.map((item, index) => {
                                        // check if item is last one
                                        let last = index === cart.items.length - 1;
                                        const style = {borderBottom: '1px dashed white'};
                                        return (
                                            <ListGroup.Item key={index} style={!last ? style : {}}>
                                                <Row className='align-items-center'>
                                                    <Col md={6}>
                                                        <Image src={item.image}
                                                               className=" mt-1 mb-1 mx-1" fluid
                                                               style={{width: '100px', height: '100px'}}/>
                                                        <Link className='edit-info'
                                                              to={`/product/slug/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={3}>{item.quantity}</Col>
                                                    <Col md={3}>{item.price}</Col>


                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })}

                                </ListGroup>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}