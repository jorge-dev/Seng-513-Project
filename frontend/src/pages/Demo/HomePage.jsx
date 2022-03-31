import { useEffect, useReducer } from "react";

import axios from "axios";
import logger from "use-reducer-logger"
import Carousel from 'react-elastic-carousel'
import './styles/HomePage.css';
import { Helmet } from "react-helmet-async";
import { Spinner } from "react-bootstrap";
import Product from "../../components/Demo/Product";
import { Skeleton } from "@mui/material";

import MainCarousel from "../../components/Demo/MainCarousel";
import { Stack } from "@mui/material";
import CardSkeleton from "../../components/Demo/CardSkeleton";
import MessageAlert from "../../components/Demo/MessageAlert";

var count = 0;

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
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, },
        { width: 998, itemsToShow: 2, },
        { width: 1200, itemsToShow: 4, itemPadding: [0, 5] }
    ];
    const generateKey = (pre) => {
        count++;
        return `${pre}${count}_${new Date().getTime()}`;
    }



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
    const skeleton = []
    for (let i = 0; i < 4; i++) {
        skeleton.push(
            <CardSkeleton key={generateKey("skeleton")} />
        )
    }


    return (


        <div className="home-page">

            <Helmet>
                <title>DotCom Store</title>
                <meta name="description" content="Home Page" />
            </Helmet>
            <MainCarousel />
            <div><h1 className="featured">FEATURED PRODUCTS</h1>
            </div>

            <Carousel breakPoints={breakPoints} >
                {loading ?
                    skeleton.map(item =>
                        <div>{item}</div>
                    )

                    : error ? <MessageAlert variant="danger">{error}</MessageAlert>
                        :

                        products.slice(0, 10).map(product => (

                            <Product key={generateKey(product.id)} product={product}
                                loading={loading} onSale={true} discountPercent={30} />

                        ))

                }
            </Carousel>



            <div><h1 className="featured">STAFF RECOMMENDATIONS</h1>
            </div>

            <Carousel breakPoints={breakPoints} >
                {loading ?
                    skeleton.map(item =>
                        <div>{item}</div>
                    )

                    : error ? <MessageAlert variant="danger">{error}</MessageAlert>
                        :

                        products.slice(0, 10).map(product => (

                            <Product key={generateKey(product.name)} product={product}
                                loading={loading} onSale={false} discountPercent={30} />

                        ))

                }
            </Carousel>

        </div >


    );
}

export default HomePage;
