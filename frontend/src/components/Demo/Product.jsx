import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Ratings from "./Rating";

function Product(props) {
    const { product } = props;
    return (
        <Card key={product.slug} className="h-100">

            <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" alt="product-image" style={{ height: '20em', width: "25em" }} src={product.image} />
            </Link>
            <Card.Body className="d-flex flex-column">

                <Link to={`/product/${product.slug}`}>
                    <Card.Title style={{ color: 'black' }}>{product.name}</Card.Title>
                </Link>
                <Card.Subtitle className="text-muter mb3">
                    {product.description}
                </Card.Subtitle>
                <Ratings ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} />
                < Card.Text >
                    ${product.price}
                </Card.Text>
                <Button variant="primary">Add to cart</Button>

            </Card.Body>

        </Card >
    );

}
export default Product;
