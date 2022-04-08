import React, {useContext, useEffect, useReducer, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './styles/HomePage.css';
import LoadingScreen from "../components/LoadingScreen";
import {Col, Container, Row, ListGroup} from "react-bootstrap";
import './styles/ProductPage.css';
import Ratings from "../components/Rating";
import {Card} from "react-bootstrap";
import {Button, Rating} from "@mui/material";
import {AddShoppingCart, ArrowForward} from "@mui/icons-material";
import {Badge} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import MessageAlert from "../components/MessageAlert";
import {getErrorMessage} from "../utils/handleApiError";
import {ContextStore} from "../ContextStore";
import {Badge as BSBadge} from "react-bootstrap";
import {Accordion} from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from '@mui/system';
import {toast} from "react-toastify";


// Init a reducer Hook to handle the data from the API
const reducerHook = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {...state, loading: true};
        case "FETCH_DATA_SUCCESS":
            return {...state, product: action.payload, loading: false};
        case "FETCH_DATA_FAILURE":
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REVIEW_REQUEST':
            return {loading: true};
        case 'CREATE_REVIEW_SUCCESS':
            return {loading: false, success: true};
        case 'CREATE_REVIEW_FAIL':
            return {loading: false, error: action.payload};
        case 'CREATE_REVIEW_RESET':
            return {};
        default:
            return state;
    }
};

function ProductPage() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0.0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    const [{product, loading, error}, dispatch] = useReducer(reducerHook, {
        product: {},
        loading: true,
        error: ''
    });
    const {slug} = useParams();
    // fetch all products for API
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({type: "FETCH_DATA"});
            try {
                const response = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });
                setReviews([...response.data.reviews]);

                // setProductsList(response.data.products);
            } catch (error) {

                dispatch({type: "FETCH_DATA_FAILURE", payload: getErrorMessage(error)});
            }
        };
        fetchProducts();
    }, [slug]);

    // console.log(product);
    const {state: ctxState, setState: setCtxState} = useContext(ContextStore)
    const {cart, userInfo} = ctxState
    const addToCartHandler = () => {
        // check if the product is already in the cart
        const isInCart = cart.items.find(item => item._id === product._id)
        const quantity = isInCart ? isInCart.quantity + 1 : 1;
        // console.log(isInCart)
        // const { data } = await axios.get(`/api/products/${product._id}`);
        if (!product.inStock) {
            // window.alert("This product is out of stock")
            toast.warning("This product is out of stock", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                theme: "colored",

            })
        }

        setCtxState({
            type: "ADD_TO_CART", payload: {...product, quantity}
        });
        navigate("/shoppingCart")
    }

    const [{loadingReview, successReview, errorReview}, reviewDispatch] = React.useReducer(reviewReducer, {
        loading: false,
        success: false,
        error: null
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const postReview = async () => {
            if (rating === 0) {
                toast.warning("Please select a rating before submitting review", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    theme: "colored"
                });
                return
            }
            reviewDispatch({type: "CREATE_REVIEW_REQUEST"});
            try {
                const {data} = await axios.post(`/api/products/${product.slug}/review`, {
                    comment,
                    rating
                }, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                console.log(data)
                reviewDispatch({type: "CREATE_REVIEW_SUCCESS"});
                setReviews([...data.product.reviews]);
                toast.success("Review submitted successfully", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    theme: "colored"
                });
                setComment('');
                setRating(0);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 4000);
            } catch (err) {
                console.log(err.response)
                reviewDispatch({type: "CREATE_REVIEW_FAIL", payload: getErrorMessage(err)});
                if (getErrorMessage(err).toLowerCase().includes("you have already reviewed")) {
                    toast.warning("It seems you have already reviewed this product more than 3 times\n You can only add a max of 3 reviews per product", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 3000,
                        theme: "colored"
                    });
                } else {
                    toast.error(`Something went wrong:\n ${getErrorMessage(err)}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 3000,
                        theme: "colored"
                    });
                }


            }
        };
        postReview();
        // console.log(rating);
        // console.log(comment);
    }

    return (
        loading ? <LoadingScreen open={loading}/> : error ?
            <MessageAlert style={{marginTop: '3em'}} variant="danger"> {error}</MessageAlert> :

            <Container fluid className="main-container min-vh-100">
                <Row style={{margin: "0 10px"}}>
                    <Col className='mt-4' md={6}
                         style={{border: "1px solid #252836", height: "30em", borderRadius: "30px"}}>

                        <img src={product.image} alt={product.name} style={{width: "100%", height: '30em'}}/>


                    </Col>
                    <Col md={6}>
                        <Card className="mt-4"
                              style={{background: "transparent", border: "none", borderRadius: "30px", height: "35em"}}>
                            <Card.Body style={{padding: "0",}}>
                                <ListGroup variant="flush" style={{marginTop: "3em"}}>
                                    <ListGroup.Item className="border-bottom-0">
                                        <Helmet>
                                            <title>{product.name}</title>
                                        </Helmet>
                                        <h3 className="text-uppercase">{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0 text-capitalize"> <BSBadge pill
                                                                                                          bg="secondary">Category: {product.mainCategory}</BSBadge></ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0">
                                        <Accordion className="w-57"
                                                   style={{background: "#252836", borderRadius: '10px'}}
                                                   TransitionProps={{unmountOnExit: true}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="descriptions"
                                                id="panel1a-header"
                                                style={{background: "#252836", borderRadius: '10px'}}
                                            >
                                                <Typography style={{color: 'white'}}>Description</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{color: 'white'}}>
                                                    {product.description}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="border-bottom-0">
                                        <Ratings showReviews={true}
                                                 precision={0.5}
                                                 align="left" isDark={true}
                                                 ratingReceived={product.rating}
                                                 numberOfReviews={product.numberOfReviews}
                                                 readOnly={true}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item className="row h-100 border-bottom-0">
                                        <Row className="mt-1 mb-1">
                                            <Col md={2}>Status</Col>
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


                </Row>
                {/*    Add a review section*/}
                <Row className='text-center' style={{padding: "10px", borderBottom: '1px solid white'}}>
                    <Col><h1>REVIEW SECTION</h1></Col>
                </Row>

                {/*Show reviews*/}
                <Row style={{margin: "0 10px"}}>
                    <Container
                        style={{
                            marginTop: '1em',
                            borderRadius: "30px",
                            // background: '#252836',
                            background: 'transparent',
                            paddingTop: '10px'
                        }}>
                        <Row style={{margin: "0 10px"}}>
                            {/*    Reviews*/}
                            <Col md={6} className="my-4">
                                <h2 className="mb-3 text-center">Reviews</h2>
                                {reviews.length === 0 && (
                                    <MessageAlert custStyle={{marginTop: '10px'}}>No reviews</MessageAlert>
                                )}
                                {reviews.map((review) => (
                                    <div style={{borderRadius: '15px', backgroundColor: '#e8e8e8'}}
                                         key={review._id}
                                         className="mb-5 mb-md-3  p-3 shadow-sm  text-black"
                                    >
                                        <strong className='h4'>{review.name}</strong> <br/><br/>
                                        <Rating sx={{

                                            '& .MuiRating-iconHover': {
                                                color: '#ffd000',
                                            },
                                            '& .MuiRating-iconEmpty': {
                                                color: '#737373',
                                            }
                                        }}
                                                readOnly precision={0.5} value={review.rating}/> <br/> <br/>
                                        <span>{new Date(review.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",

                                        })}</span>
                                        <div className="alert alert-info mt-3">
                                            {review.comment}
                                        </div>
                                    </div>
                                ))}

                            </Col>

                            {/*    Add a review*/}
                            <Col md={6}>
                                <h2 className="mt-4 text-center">Review this product</h2>

                                {userInfo ? (

                                    <form onSubmit={submitHandler}>
                                        <div className="my-4">
                                            <h4 className='text-center'><strong>Rating</strong></h4>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flexWrap: 'wrap',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Rating

                                                    sx={{


                                                        '& .MuiRating-iconHover': {
                                                            color: '#ffd000',
                                                        },
                                                        '& .MuiRating-iconEmpty': {
                                                            color: '#737373',
                                                        }
                                                    }}
                                                    name="Rating Label"

                                                    value={rating}
                                                    precision={0.5}
                                                    size="large"
                                                    defaultValue={0}

                                                    onChange={(event, newValue) => {

                                                        setRating(newValue);

                                                    }}
                                                />
                                            </Box>
                                        </div>
                                        <div className="my-4">
                                            <h4 className='text-center'><strong>Write your review</strong></h4>
                                            <textarea
                                                rows="5"
                                                required
                                                value={comment}
                                                placeholder={'Write your review here...'}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            />
                                        </div>
                                        <div className="my-3">
                                            <Button
                                                sx={{

                                                    borderRadius: '15px'
                                                }}
                                                className="text-center align-middle" fullWidth variant="contained"
                                                size="large"
                                                type={'submit'}

                                            >
                                                <span className="btn-text"> Submit Review</span>
                                            </Button>
                                        </div>
                                    </form>
                                ) : (

                                    <MessageAlert variant='warning'
                                                  custStyle={{marginTop: '2.4em', width: '100%', borderRadius: '15px'}}>
                                        <h3 className="text-capitalize"> An account is required to post a review</h3>
                                        <h5>
                                            <Link className='info-link'
                                                  to={`/pages/Login?redirect=/product/slug/${product.slug}`}>
                                                <strong>If you have an account you can login here <ArrowForward/></strong>
                                            </Link> <br/> <br/>
                                            <Link className='info-link'
                                                  to={`/pages/CreateAccount?redirect=/product/slug/${product.slug}`}>
                                                <strong>If you are new, you can create an account here <ArrowForward/></strong>
                                            </Link>

                                        </h5>
                                    </MessageAlert>


                                )}
                            </Col>
                        </Row>


                    </Container>


                </Row>

            </Container>


    )
        ;
}

export default ProductPage;
