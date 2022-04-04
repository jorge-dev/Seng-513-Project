import React, {useContext, useEffect, useReducer} from "react";
import LoadingScreen from "../../components/Demo/LoadingScreen";
import MessageAlert from "../../components/Demo/MessageAlert";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";
import {ContextStore} from "../../ContextStore";
import {getErrorMessage} from "../../utils/handleApiError";
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {Badge, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ORDER":
            return {...state, loading: true, error: ''};
        case "FETCH_ORDER_SUCCESS":
            return {...state, loading: false, order: action.payload, error: ''};
        case "FETCH_ORDER_FAILURE":
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default function OrderPage() {
    const params = useParams()
    const {id: orderId} = params;
    const navigate = useNavigate();

    const {state} = useContext(ContextStore);
    const {userInfo} = state;
    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',

    });


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({type: "FETCH_ORDER"});
                const {data} = await axios.get(`/api/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                // console.log(data);
                dispatch({type: "FETCH_ORDER_SUCCESS", payload: data.order});
            } catch (e) {
                dispatch({type: "FETCH_ORDER_FAILURE", payload: getErrorMessage(e)});
            }
        }
        if (!userInfo) {
            return navigate('/pages/Login');
        }
        // if (!order._id || (order._id && order._id !== orderId)) {
        fetchOrder();
        // }
    }, [userInfo, orderId, navigate]);


    return loading ? <LoadingScreen open={loading}/> : error ?
        (
            <MessageAlert variant='warning' custStyle={{marginTop: '1.5em'}}><h1
                className='text-capitalize'>This order number
                does
                not exist</h1> <br/>
                <Link style={{color: 'black'}} to={'/pages/AccountManagement'}>Check your orders, and verify the
                    number<ArrowForward/></Link>
            </MessageAlert>) :
        (
            <div>
                <Helmet>
                    <title>Order #{orderId}</title>
                </Helmet>
                <h1 className="text-center mt-4">Order #{orderId}</h1>
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
                                            <Col md={6}>{order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{borderBottom: '1px dashed gray'}}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>Shipping:</Col>
                                            <Col
                                                md={6}>{order.shippingPrice > 0 ? order.shippingPrice.toFixed(2) : "Free"}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{borderBottom: '1px solid white'}}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>Tax</Col>
                                            <Col md={6}>{order.taxPrice.toFixed(2)}</Col>
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
                                                }}>$ {order.totalPrice}</span></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/*<ListGroup.Item>*/}
                                    {/*    <Container className="text-center mt-3">*/}

                                    {/*        <Button sx={{*/}

                                    {/*            borderRadius: '15px'*/}
                                    {/*        }} className="text-center align-middle" variant="contained"*/}
                                    {/*                size="large"*/}
                                    {/*                onClick={placeOrder}*/}
                                    {/*        >*/}
                                    {/*            <span className="btn-text"> Place Order</span>*/}
                                    {/*        </Button>*/}
                                    {/*    </Container>*/}
                                    {/*    {loading && <LoadingScreen open={loading}/>}*/}
                                    {/*</ListGroup.Item>*/}
                                </ListGroup>
                            </Card.Body>

                        </Card></Col>

                        < Col md={8}>
                            <Card className='mb-3'
                                  style={{
                                      background: 'transparent',
                                      border: '1px solid white',
                                      borderRadius: '10px'
                                  }}>
                                <Card.Body>
                                    <Card.Title>Shipping Summary</Card.Title>
                                    <Card.Text>
                                        <strong>Name: </strong> {order.shippingAddress.fullName}<br/>
                                        <strong>Address: </strong> {order.shippingAddress.address}{' '}
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country}<br/>

                                    </Card.Text>
                                    {/*<Link to='/shipping' className='edit-info'>*/}
                                    {/*    <Button variant="contained" size="small"*/}
                                    {/*            style={{*/}
                                    {/*                borderRadius: '15px',*/}
                                    {/*                color: 'white',*/}
                                    {/*                fontSize: '.7rem'*/}
                                    {/*            }}*/}
                                    {/*            startIcon={<Edit/>}>*/}
                                    {/*        <span className="btn-text">Edit</span>*/}
                                    {/*    </Button>*/}
                                    {/*</Link>*/}
                                </Card.Body>

                            </Card>
                            <Card className='mb-3'
                                  style={{
                                      background: 'transparent',
                                      border: '1px solid white',
                                      borderRadius: '10px'
                                  }}>
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Text>
                                        <strong>Method: </strong> {order.paymentMethod}{order.paymentMethod === "PayPal" ?
                                        <i
                                            className="fa-brands fa-paypal mx-2" style={{fontSize: '1.3em'}}/> :
                                        <i
                                            className="fa-brands fa-stripe mx-2" style={{fontSize: '1.3em'}}/>}
                                        <br/>
                                        <strong>Status: </strong> {
                                        order.paymentStatus === "Pending" ?
                                            <Badge bg="warning text-black">Pending</Badge> :
                                            order.paymentStatus === "Processed" ?
                                                <Badge bg="success text-black">Processed</Badge> :
                                                <Badge bg="danger">Failed</Badge>

                                    }

                                    </Card.Text>
                                    {/*<Link to='/paymentMethod' className='edit-info'>*/}
                                    {/*    <Button variant="contained" size="small"*/}
                                    {/*            style={{*/}
                                    {/*                borderRadius: '15px',*/}
                                    {/*                color: 'white',*/}
                                    {/*                fontSize: '.7rem'*/}
                                    {/*            }}*/}
                                    {/*            startIcon={<Edit/>}>*/}
                                    {/*        <span className="btn-text">Edit</span>*/}
                                    {/*    </Button>*/}
                                    {/*</Link>*/}
                                </Card.Body>

                            </Card>
                            <Card className='mb-3'
                                  style={{
                                      background: 'transparent',
                                      border: '1px solid white',
                                      borderRadius: '10px'
                                  }}>
                                <Card.Body>
                                    <Card.Title>Items In cart</Card.Title>
                                    <Card.Text>
                                        {/*<Link to='/shoppingCart' className='edit-info'>*/}
                                        {/*    <Button variant="contained" size="small"*/}
                                        {/*            style={{*/}
                                        {/*                borderRadius: '15px',*/}
                                        {/*                color: 'white',*/}
                                        {/*                fontSize: '.7rem'*/}
                                        {/*            }}*/}
                                        {/*            startIcon={<Edit/>}>*/}
                                        {/*        <span className="btn-text">Edit</span>*/}
                                        {/*    </Button>*/}
                                        {/*</Link>*/}
                                    </Card.Text>
                                    <ListGroup variant={"flush"} className='border-top'>
                                        {order.items.map((item, index) => {
                                            // check if item is last one
                                            let last = index === order.items.length - 1;
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
        )

}