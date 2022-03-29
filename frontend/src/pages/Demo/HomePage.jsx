import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger"
import './styles/HomePage.css';
import LoadingScreen from "../../components/Demo/LoadingScreen";

// Init a rreducer Hook to handle the data from the API
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
            <div className="products">
                {
                    loading ? <LoadingScreen open={loading} /> : error ? <h2 className="error">{error}</h2> :

                        products.slice(5, 10).map(product => (
                            <div className="single-product" key={product.slug}>
                                <div className="img-div">
                                    <Link to={`/product/${product.slug}`}>
                                        <img src={product.image} alt={product.name} />
                                    </Link>
                                </div>
                                <div className="product-info">
                                    <Link to={`/product/${product.slug}`}>
                                        <p>{product.name}</p>
                                    </Link>

                                    <p><strong>{product.price}</strong></p>
                                    <button>Add to Cart</button>
                                </div>

                            </div>
                        ))
                }
            </div></div>
    );
}

export default HomePage;
