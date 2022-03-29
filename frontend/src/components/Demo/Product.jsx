import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Ratings from "./Rating";
import Button from '@mui/material/Button';

import { ShoppingCart } from '@mui/icons-material';
import { Container } from "react-bootstrap";

function Product(props) {
    const { product } = props;
    return (
        <Card key={product.slug} className="h-100" style={{ borderRadius: "30px" }} >

            <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" alt="product-image" style={{ height: '20em', background: '#d1d1d1', borderRadius: "30px 30px 0 0" }} src={product.image} />
            </Link>
            <Card.Body className="d-flex flex-column mt-auto">

                <Link className="mt-auto" to={`/product/${product.slug}`}>
                    <Card.Title style={{ color: 'black' }}>{product.name}</Card.Title>
                </Link>
                <Card.Subtitle className=" mt-auto text-muted mb3">
                    {product.description}
                </Card.Subtitle>

                < Card.Text className="mt-auto">
                    <Ratings ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} update={true} />
                    ${product.price}
                </Card.Text>
                <Button className="mt-auto" variant="contained" endIcon={<ShoppingCart />}>
                    Add to card
                </Button>
                {/* <Button className="mt-auto" variant="primary">Add to cart</Button> */}

            </Card.Body>

        </Card >
    );

}
export default Product;
