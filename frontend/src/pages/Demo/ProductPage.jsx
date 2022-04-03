import {useContext, useEffect, useReducer} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";
import {Col, Container, Row, ListGroup} from "react-bootstrap";
import './styles/ProductPage.css';
import Ratings from "../../components/Demo/Rating";
import {Card} from "react-bootstrap";
import {Button} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import {Badge} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import MessageAlert from "../../components/Demo/MessageAlert";
import {getErrorMessage} from "../../utils/handleApiError";
import {ContextStore} from "../../ContextStore";
import {Badge as BSBadge} from "react-bootstrap";
import {Accordion} from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// Init a reducer Hook to handle the data from the API
const reducerHook = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, loading: true };
        case "FETCH_DATA_SUCCESS":
            return { ...state, product: action.payload, loading: false };
        case "FETCH_DATA_FAILURE":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

function ProductPage() {
    const navigate = useNavigate();
    const [{ product, loading, error }, dispatch] = useReducer(reducerHook, {
        product: {},
        loading: true,
        error: ''
    });
    const { slug } = useParams();
    // fetch all products for API
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: "FETCH_DATA" });
            try {
                const response = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });

                // setProductsList(response.data.products);
            } catch (error) {

                dispatch({ type: "FETCH_DATA_FAILURE", payload: getErrorMessage(error) });
            }
        };
        fetchProducts();
    }, [slug]);

    const { state: ctxState, setState: setCtxState } = useContext(ContextStore)
    const { cart } = ctxState
    const addToCartHandler = () => {
        // check if the product is already in the cart
        const isInCart = cart.items.find(item => item._id === product._id)
        const quantities = isInCart ? isInCart.quantities + 1 : 1;
        console.log(isInCart)
        // const { data } = await axios.get(`/api/products/${product._id}`);
        if (!product.inStock) {
            window.alert("This product is out of stock")
        }

        setCtxState({
            type: "ADD_TO_CART", payload: { ...product, quantities }
        });
        navigate("/shoppingCart")
    }


    return (
        loading ? <LoadingScreen open={loading}/> : error ?
            <MessageAlert style={{marginTop: '3em'}} variant="danger"> {error}</MessageAlert> :

            <Container fluid className="main-container">
                <Row>
                    <Col className='mt-4' md={6}
                         style={{border: "1px solid #252836", height: "30em", borderRadius: "30px"}}>

                        <img src={product.image} alt={product.name} style={{width: "100%", height: '30em'}}/>


                    </Col>
                    <Col md={6}>
                        <Card className="mt-4" style={{ background: "transparent", border: "none", borderRadius: "30px", height: "35em" }}>
                            <Card.Body style={{ padding: "0", }} >
                                <ListGroup variant="flush" style={{ marginTop: "3em" }}>
                                    <ListGroup.Item className="border-bottom-0" >
                                        <Helmet>
                                            <title >{product.name}</title>
                                        </Helmet>
                                        <h3 className="text-uppercase">{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0 text-capitalize"> <BSBadge pill bg="secondary">Category: {product.mainCategory}</BSBadge></ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0">
                                        <Accordion className="w-57" style={{ background: "#252836", borderRadius: '10px' }} TransitionProps={{ unmountOnExit: true }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="descriptions"
                                                id="panel1a-header" style={{ background: "#252836", borderRadius: '10px' }}
                                            >
                                                <Typography style={{ color: 'white' }}>Description</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ color: 'white' }} >
                                                    {product.description}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0" > <Ratings align="left" isDark={true} ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} readOnly={true} />  </ListGroup.Item>
                                    <ListGroup.Item className="row h-100 border-bottom-0">
                                        <Row className="mt-1 mb-1">
                                            <Col md={2} >Status</Col>
                                            <Col md={1}>
                                                {
                                                    product.inStock ?
                                                        <Badge bg="success">In Stock</Badge> :
                                                        <Badge bg="danger">Out Stock</Badge>
                                                }
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                    <ListGroup.Item className=" mb-1 mt-1 border-bottom-0"> <h4> Price: ${product.price}</h4></ListGroup.Item>
                                    {/* <ListGroup.Item style={{ marginTop: '1em' }}> */}
                                    <Container className="text-center">
                                        {product.inStock ?
                                            <Button sx={{

                                                borderRadius: '15px'
                                            }} className="text-center align-middle" variant="contained" size="large"
                                                    onClick={addToCartHandler}
                                            >
                                                <span className="btn-text"> Add to Cart</span> <AddShoppingCart/>
                                            </Button> :
                                            <Button sx={{

                                                borderRadius: '15px'
                                            }} className="text-center" variant="contained" size="large" disabled>
                                                <span className="btn-text"> Add to Card</span> <AddShoppingCart/>
                                            </Button>
                                        }
                                    </Container>

                                    {/* </ListGroup.Item> */}

                                </ListGroup>

                            </Card.Body>

                        </Card>
                    </Col>





                </Row  >


            </Container >


    );
}

export default ProductPage;
