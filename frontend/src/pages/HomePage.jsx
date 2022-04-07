import { useEffect, useReducer } from "react";

import axios from "axios";
import Carousel from 'react-elastic-carousel'
import './styles/HomePage.css';
import { Helmet } from "react-helmet-async";
import Product from "../components/Product";

import MainCarousel from "../components/MainCarousel";
import CardSkeleton from "../components/CardSkeleton";
import MessageAlert from "../components/MessageAlert";

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
    const [{ products, loading, error }, dispatch] = useReducer(reducerHook, {
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
                // Handle error codes
                console.log(error.response.message);
                if (error.response.status === 404) {
                    dispatch({ type: "FETCH_DATA_FAILURE", payload: "Product not found" });
                } else if (error.response.status === 500) {
                    dispatch({ type: "FETCH_DATA_FAILURE", payload: "Internal server error" });
                } else if (error.response.status === 403) {
                    dispatch({ type: "FETCH_DATA_FAILURE", payload: "Forbidden" });
                } else if (error.response.status === 400) {
                    dispatch({ type: "FETCH_DATA_FAILURE", payload: "No data found due to Bad request" });

                }

            }
        };
        fetchProducts();
    }, []);
    const skeleton = []
    for (let i = 0; i < 4; i++) {
        skeleton.push(
            <CardSkeleton />
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

            <Carousel breakPoints={breakPoints} isRTL={false}>
                {loading ?
                    skeleton.map(item =>
                        <div key={generateKey("skeleton")}>{item}</div>
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

            <Carousel breakPoints={breakPoints} isRTL={false} className="mb-4">
                {loading ?
                    skeleton.map(item =>
                        <div key={generateKey("skeleton")}>{item}</div>
                    )

                    : error ? <MessageAlert variant="danger">{error}</MessageAlert>
                        :

                        products.slice(11, 20).map(product => (

                            <Product key={generateKey(product.name)} product={product}
                                     loading={loading} onSale={false} discountPercent={30}/>

                        ))

                }
            </Carousel>

        </div >


    );
}

export default HomePage;
