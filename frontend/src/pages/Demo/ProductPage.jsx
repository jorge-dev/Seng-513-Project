import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import './styles/ProductPage.css';
import Ratings from "../../components/Demo/Rating";
import { Card } from "react-bootstrap";


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
                    <Col md={6} style={{ borderRadius: "30px" }} >
                        <img src={product.image} alt={product.name} style={{ width: "100%", backgroundColor: '#dbdbdb', border: '2px solid #252836', borderRadius: "30px" }} />
                    </Col>
                    <Col md={6} className="mt-4" >
                        <Card style={{ background: "transparent", border: "none", borderRadius: "30px" }}>
                            <Card.Body style={{ padding: "0", }} >
                                <ListGroup variant="flush" style={{ borderRadius: "30px" }}>
                                    <ListGroup.Item > <h1>{product.name}</h1></ListGroup.Item>
                                    <ListGroup.Item> <Ratings isDark={true} ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} readOnly={true} />  </ListGroup.Item>
                                    <ListGroup.Item className="text-muted"> <h3>${product.description}</h3></ListGroup.Item>
                                </ListGroup>

                            </Card.Body>

                        </Card>
                    </Col>




                </Row >
            </Container >


    );
}

export default ProductPage;
