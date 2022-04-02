import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Image, Col, Container, ListGroup, Row, Button, Badge, Card, Accordion } from 'react-bootstrap';
import Rating from '../components/Rating'
import ContextAwareToggle from '../components/ContextAwareToggle'
import './styles/Product.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Product() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  return (
      <>
        { /* Product page */}
        <div className='Product'>
          <header>
            { /* TODO: temp navbar used as reference, remove later */}
            <Navbar bg="dark" variant="dark"> </Navbar>
          </header>
          <main>
            <Container fluid="md">
              <Row>
                <br></br>
              </Row>
              <Row>
                <Col md={6}>
                  <Image
                    className='img-large'
                    src='https://res.cloudinary.com/cloud-513/image/upload/v1648333662/compfest/Keyboards/mech/wireless/61NrWLtBXFL._AC_SL1500__rb4qok.jpg'
                    alt=''
                    rounded
                    thumbnail
                  />
                </Col>
                <Col md={6}>
                  <ListGroup variant='flush' className='product-info'>
                    <ListGroup.Item className='product-info-item'>
                      <h1 className='product-name-label'> Product name </h1>
                      <Button className='product-category-button' variant="secondary">Keyboards</Button>{' '}
                    </ListGroup.Item>
                    <ListGroup.Item className='product-info-item'>
                      <Rating rating='4.5' numberOfReviews='25'> </Rating>
                      <br></br>

                      <h1 className='product-price-label'> Price </h1>
                      <p className='product-price'>&emsp;$129.99</p>
                      <br></br>

                      <Row>
                        <Col className="product-status-indicator" md={3}>
                          <Badge bg="success">In stock</Badge>{' '}
                          <Badge bg="secondary">Out of stock</Badge>{' '}
                        </Col>
                        <Col>
                          <Button className='add-to-cart-button' variant="primary">Add to Cart</Button>{' '}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Accordion defaultActiveKey="0">
                  <Card className='product-description-card'>
                    <Card.Header className='description-toggle'>
                      <ContextAwareToggle eventKey="1">Description</ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body className='description-body'> Description of the product goes here</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Row>
            </Container>
          </main>
        </div>
      </>
  )
}
