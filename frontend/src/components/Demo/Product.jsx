import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Ratings from "./Rating";
import Button from '@mui/material/Button';
import './styles/Product.css';
import Skeleton from '@mui/material/Skeleton';

import { ShoppingCart } from '@mui/icons-material';



function Product(props) {
    const { product, loading } = props;
    return (

        <Card className="main-card" key={product.slug} style={{ borderRadius: "30px", height: '25em', width: '18em' }} >
            {loading ? <Skeleton variant="rect" width={'100%'} height={'10em'} /> :
                <Link to={`/product/${product.slug}`}>
                    <Card.Img variant="top" alt="product-image" style={{ height: '10em', width: '100%', background: '#d1d1d1', borderRadius: "30px 30px 0 0" }} src={product.image} />
                </Link>
            }
            <Card.Body className="d-flex flex-column mt-auto">
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'} /> :
                    <Link to={`/product/${product.slug}`}>
                        <Card.Title className="mt-auto" style={{ color: 'black', fontSize: '1em' }}>{product.name}</Card.Title>
                    </Link>
                }
                {/* <Card.Subtitle className=" mt-auto text-muted" style={{ fontSize: '.8em' }}>
                    {product.description}
                </Card.Subtitle> */}
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'} /> :
                    < div className="mt-auto" >
                        <Ratings ratingReceived={product.rating} numberOfReviews={product.numberOfReviews} readOnly={true} isDark={false} />
                    </div>
                }
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'} /> :
                    < div className="mt-auto" style={{ color: 'black' }}>
                        ${product.price}
                    </div>
                }
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'} /> :
                    <Button className="mt-auto " variant="contained" endIcon={<ShoppingCart />}>
                        Add to Card
                    </Button>
                }
                {/* <Button className="mt-auto" variant="primary">Add to cart</Button> */}

            </Card.Body>

        </Card >
    );

}
export default Product;
