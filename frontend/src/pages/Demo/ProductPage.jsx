import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import './styles/ProductPage.css';
import Ratings from "../../components/Demo/Rating";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";


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

function ProductPage(params) {
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
                const response = await axios.get(`/api/products/${slug}`);
                dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });

                // setProductsList(response.data.products);
            } catch (error) {
                dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
            }
        };
        fetchProducts();
    }, [slug]);


    return (
        loading ? <LoadingScreen open={loading} /> : error ? <h2 className="error">{error}</h2> :

            <Container fluid className="main-container">
                <Row >
                    <Col md={6} style={{}} >
                        <div className="mt-4 row align-items-center" style={{ border: "1px solid #252836", height: "30em", borderRadius: "30px" }} >
                            <img src={product.image} alt={product.name} style={{ width: "100%" }} />
                        </div>

                    </Col>
                    <Col md={6} className="mt-4" >
                        <Card style={{ background: "#252836", border: "none", borderRadius: "30px", height: "30em" }}>
                            <Card.Body style={{ padding: "0", }} >
                                <ListGroup variant="flush" style={{ borderRadius: "30px" }}>
                                    <ListGroup.Item className="text-center" >
                                        <Helmet>
                                            <title>{product.name}</title>
                                        </Helmet>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-center text-muted" > <h2>{product.description}</h2></ListGroup.Item>
                                    <ListGroup.Item > <Ratings isDark={true} ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} readOnly={true} />  </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row className="mt-1 mb-1">
                                            <Col className="text-center" >Status</Col>
                                            <Col className="text-center">
                                                {
                                                    product.inStock ?
                                                        <Badge bg="success">In Stock</Badge> :
                                                        <Badge bg="danger">Out Stock</Badge>
                                                }
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-center mb-1 mt-1"> <h4> Price: ${product.price}</h4></ListGroup.Item>
                                    <ListGroup.Item>
                                        <Container className="text-center mt-4">
                                            <Button className="text-center" variant="contained" size="large" >
                                                <span className="btn-text"> Add to Card</span> <ShoppingCart />
                                            </Button>
                                        </Container>
                                    </ListGroup.Item>

                                </ListGroup>

                            </Card.Body>

                        </Card>
                    </Col>





                </Row >
            </Container >


    );
}

export default ProductPage;
