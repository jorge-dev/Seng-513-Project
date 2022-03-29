import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
    // fetch all products for API
    const [productsList, setProductsList] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("/api/products");
            console.log(response.data.products);
            setProductsList(response.data.products);
        };
        fetchProducts();
    }, []);
    console.log("Printing productList", productsList);

    return (
        <div><h1 className="featured">FEATURED PRODUCTS</h1>
            <div className="products">
                {

                    productsList.slice(5, 10).map(product => (
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
