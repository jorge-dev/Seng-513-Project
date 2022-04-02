import { AddCircle, ArrowForward, Delete, RemoveCircle, RemoveCircleOutline } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { useContext } from "react"
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { red, grey } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom"
import MessageAlert from "../../components/Demo/MessageAlert"
import { ContextStore } from "../../ContextStore"
import "./styles/CartStyles.css"
export default function CartPage() {
    const { state: ctxState, setState: setCtxState } = useContext(ContextStore)
    const { cart: { items } } = ctxState
    const navigate = useNavigate()

    const updateCartHandler = (item, quantities) => {
        setCtxState({
            type: "ADD_TO_CART", payload: { ...item, quantities }
        });
    }
    const removeItemHandler = (item) => {
        setCtxState({
            type: "REMOVE_FROM_CART", payload: item
        });
    }

    const getSubtotal = () => {
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantities, 0)
        return Math.round(subtotal * 100) / 100
    }


    return (
        <div className="vh-100" style={{ marginTop: "8em" }}>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1 className="text-center">Shopping Cart</h1>
            <Row style={{ margin: "0 20px" }} >
                <Col md={8}>
                    {items.length === 0 ? (<MessageAlert custStyle={{ marginTop: '1.5em' }} ><h1>The Cart Is Empty</h1> <br />
                        <Link style={{ color: 'black' }} to={'/'}>Checkout some of our featured products <ArrowForward /></Link>
                    </MessageAlert>) : (
                        <ListGroup style={{ background: '#252836', borderRadius: '30px' }}>
                            {items.map(item => (
                                <ListGroup.Item key={item._id} >
                                    <Row className="align-items-center">
                                        <Col md={7}>
                                            <Image src={item.image} className=" mt-1 mb-1 mx-1 img-thumbnail" fluid />

                                            {" "}
                                            <Link to={`/product/slug/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} style={{ color: 'white' }}>
                                            <IconButton aria-label="add" onClick={() => updateCartHandler(item, item.quantities + 1)} >
                                                <AddCircle sx={{ color: grey[50] }} />
                                            </IconButton> {" "}
                                            {item.quantities}
                                            {item.quantities === 1 ?
                                                (
                                                    <IconButton aria-label="remove" disabled>
                                                        <RemoveCircleOutline sx={{ color: grey[500] }} />
                                                    </IconButton>
                                                ) :
                                                (
                                                    <IconButton aria-label="remove" onClick={() => updateCartHandler(item, item.quantities - 1)} >
                                                        <RemoveCircle sx={{ color: grey[50] }} />
                                                    </IconButton>
                                                )
                                            }
                                        </Col>
                                        <Col md={2}>
                                            <span className="h4">${item.price}</span>
                                        </Col>
                                        <Col md={1}>
                                            <IconButton aria-label="delete" onClick={() => removeItemHandler(item)}>
                                                <Delete sx={{ color: red[800] }} />
                                            </IconButton>
                                        </Col>


                                    </Row>
                                </ListGroup.Item>)
                            )}
                        </ListGroup>
                    )
                    }
                </Col>
                <Col md={4}>
                    <Card style={{ background: '#252836', borderRadius: '30px' }}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="border-bottom-0">
                                    <Row className="align-items-center">
                                        <Col md={7}>
                                            <h5>Total Items in Cart:</h5>
                                        </Col>
                                        <Col md={5}>
                                            <h5>{items.reduce((acc, item) => acc + item.quantities, 0)}</h5>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-bottom-0">
                                    <Row className="align-items-center">
                                        <Col md={7}>
                                            <h5>Subtotal</h5>
                                        </Col>
                                        <Col md={5}>
                                            <h4 >$ <span style={{ color: '#6cf542' }}>{getSubtotal()}</span></h4>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item className="border-bottom-0">
                                    <Container className="text-center d-grid">
                                        {items.length === 0 ? null :
                                            <Button className="text-center align-middle" variant="contained" size="large" onClick={() => navigate('/signin?redirect=/shipping')}  >
                                                Proceed to Checkout
                                            </Button>
                                        }
                                    </Container>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </div >
    )
}
