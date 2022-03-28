import './styles/Product.css';
import { Navbar, Image, Col, Container, ListGroup, Row, Button, Badge, Card, Accordion } from 'react-bootstrap';
import Rating from '../components/Rating'
import ContextAwareToggle from '../components/ContextAwareToggle'

export default function Product() {
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
