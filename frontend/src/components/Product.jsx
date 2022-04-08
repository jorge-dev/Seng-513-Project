import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Ratings from "./Rating";
import Button from '@mui/material/Button';
import './styles/Product.css';
import Skeleton from '@mui/material/Skeleton';
import { Badge } from 'react-bootstrap'

import { ShoppingCart } from '@mui/icons-material';
import { useContext } from "react";
import { ContextStore } from "../ContextStore";



function applyDiscount(price, discount) {
    const discounted = price + (price * discount / 100);
    return Math.round(discounted * 100) / 100;
}



function Product(props) {
    const {product, loading, onSale, discountPercent} = props;
    const {state: ctxState, setState: setCtxState} = useContext(ContextStore)
    const {cart: {items}} = ctxState
    // const navigate = useNavigate()

    const addToCartHandler = (item) => {
        const isInCart = items.find(item => item._id === product._id)
        const quantity = isInCart ? isInCart.quantity + 1 : 1;
        setCtxState({
            type: "ADD_TO_CART", payload: {...item, quantity}
        });
    }

    return (

        <Card className="main-card" style={{ borderRadius: "30px", height: '25em', width: '18em' }} >
            {loading ? <Skeleton variant="rect" width={'100%'} height={'10em'} /> :
                <Link to={`/product/slug/${product.slug}`}>
                    {onSale ?
                        <Badge bg="danger" style={{position: 'absolute', top: '10px', left: '10px', fontSize: ".8em"}}>
                            {discountPercent}% Off
                        </Badge> : null
                    }
                    <Card.Img variant="top" alt="product-image" style={{ height: '10em', width: '100%', background: '#d1d1d1', borderRadius: "30px 30px 0 0" }} src={product.image} />
                </Link>
            }
            <Card.Body className="d-flex flex-column mt-auto">
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'}/> :
                    <Link to={`/product/slug/${product.slug}`}>
                        <Card.Title className="mt-auto"
                                    style={{color: 'black', fontSize: '1em'}}>{product.name}</Card.Title>
                    </Link>
                }

                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'}/> :
                    < div className="mt-auto">
                        <Ratings showReviews={true} align="left" ratingReceived={product.rating}
                                 numberOfReviews={product.numberOfReviews} readOnly={true} isDark={false}/>
                    </div>
                }
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'}/> :
                    < div className="mt-auto" style={{color: 'black'}}>

                        {onSale ?
                            <Row>
                                <Col sm={4} style={{paddingRight: "0"}}>
                                    <span className="text-muted"
                                          style={{textDecoration: 'line-through'}}>${applyDiscount(product.price, discountPercent)}</span>
                                </Col>
                                <Col sm={8} style={{paddingLeft: "0"}}>
                                    <p className="text-success" style={{fontWeight: 'bold'}}>${product.price}</p>
                                </Col>
                            </Row>
                            : <p className="text-success" style={{fontWeight: 'bold'}}>${product.price}</p>}
                    </div>
                }
                {loading ? <Skeleton variant="text" width={'100%'} height={'100%'} /> :

                    <Button className="mt-auto " disabled={!product.inStock} variant="contained" onClick={() => addToCartHandler(product)} endIcon={<ShoppingCart />}>
                        {product.inStock ? "Add to Card" : "Out of Stock"}
                    </Button>
                }

            </Card.Body>

        </Card >
    );

}
export default Product;
