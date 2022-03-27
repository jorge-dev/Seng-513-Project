import './styles/Product.css';
import { Navbar, Image, Col, Container, ListGroup, Row, Button } from 'react-bootstrap';
import Rating from '../components/Rating'

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
                    </ListGroup.Item>
                    <ListGroup.Item className='product-info-item'>
                      <Button className='product-category-button' variant="secondary">Keyboards</Button>{' '}
                    </ListGroup.Item>
                    <ListGroup.Item className='product-info-item'>
                      <Rating rating='4.5' numberOfReviews='25'> </Rating>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <h1>
                Description
                </h1>
              </Row>
            </Container>
          </main>
        </div>
      </>
  )
}
