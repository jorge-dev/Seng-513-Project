import { useEffect, useReducer } from "react";

import axios from "axios";
import logger from "use-reducer-logger"
import Carousel from 'react-elastic-carousel'
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../../components/Demo/Product";
import HHyy from "../../components/Demo/MainCarousel";
import MainCarousel from "../../components/Demo/MainCarousel";

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


const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, pagination: false },
    { width: 850, itemsToShow: 2, },
    { width: 1150, itemsToShow: 3, },
    { width: 1290, itemsToShow: 4, },
    { width: 1750, itemsToShow: 4, },];


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
        <div>
            {loading ? <LoadingScreen /> : error ? <div className="error">{error}</div> :
                <div className="home-page">


                    <MainCarousel />
                    <div><h1 className="featured">FEATURED PRODUCTS</h1>
                    </div>

                    <Carousel itemsToShow={4} breakpoints={breakpoints} itemPadding={[0, 10]} >
                        {products.slice(0, 10).map(product => (
                            <Col key={product.slug}  >
                                <Product product={product} />
                            </Col>
                        ))}
                    </Carousel>

                    <div><h1 className="featured">STAFF PRODUCTS</h1>
                    </div>

                    <Carousel itemsToShow={4} breakpoints={breakpoints} itemPadding={[0, 10]} >
                        {products.slice(10, 20).map(product => (
                            <Col key={product.slug}  >
                                <Product product={product} />
                            </Col>
                        ))}
                    </Carousel>

                </div >
            }
        </div>
    );
}

export default HomePage;
