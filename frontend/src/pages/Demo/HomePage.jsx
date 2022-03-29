import { useEffect, useReducer } from "react";

import axios from "axios";
import logger from "use-reducer-logger"
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../../components/Demo/Product";

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



function HomePage() {
    const [{ products, loading, error }, dispatch] = useReducer(logger(reducerHook), {
        products: [],
        loading: true,
        error: ''
    });
    // fetch all products for API
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: "FETCH_DATA" });
            try {
                const response = await axios.get("/api/products");
                dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data.products });

                // setProductsList(response.data.products);
            } catch (error) {
                dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
            }
        };
        fetchProducts();
    }, []);


    return (
        <div><h1 className="featured">FEATURED PRODUCTS</h1>
            <Container fluid>
                {
                    loading ? <LoadingScreen open={loading} /> : error ? <h2 className="error">{error}</h2> :
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {products.slice(0, 10).map(product => (
                                <Col key={product.slug} sm={6} md={4} lg={3} className="mb3" >
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                }
            </Container>
        </div>
    );
}

export default HomePage;
