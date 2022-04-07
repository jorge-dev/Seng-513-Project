import React, {useEffect, useReducer, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

import {Helmet} from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Rating from '../components/Rating';
// import LoadingBox from '../components/LoadingBox';
// import MessageAlert from '../components/MessageAlert';
// import Button from 'react-bootstrap/Button';
// import Product from '../components/Product';
import {Pagination, Rating} from "@mui/material";
import LoadingScreen from "../../components/Demo/LoadingScreen";
import MessageAlert from "../../components/Demo/MessageAlert";
import Product from "../../components/Demo/Product";
import {getErrorMessage} from "../../utils/handleApiError";
import {Badge, Button, Card, Container, Form} from "react-bootstrap";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

const prices = [
    {
        name: 'Under $30',
        value: '0-29',
    },
    {
        name: '$30 - $60',
        value: '30-59',
    },
    {
        name: '$60 - $100',
        value: '60-99',
    },
    {
        name: '$100 - $200',
        value: '100-199',
    },
    {
        name: '$Above 200',
        value: '200-1000',
    },
];

export const ratings = [
    {
        name: '4stars & up',
        rating: 4,
    },

    {
        name: '3stars & up',
        rating: 3,
    },

    {
        name: '2stars & up',
        rating: 2,
    },

    {
        name: '1stars & up',
        rating: 1,
    },
];

export default function SearchPage() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const sp = new URLSearchParams(search); // /search?mainCategory=Shirts
    const mainCategory = sp.get('mainCategory') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;
    const pageSize = sp.get('pageSize') || 9;

    const [{loading, error, products, pages, countProducts}, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&mainCategory=${mainCategory}&price=${price}&rating=${rating}&order=${order}&pageSize=${pageSize}`
                );
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getErrorMessage(error),
                });
            }
        };
        fetchData();
    }, [mainCategory, error, pageSize, order, page, price, query, rating]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get(`/api/products/categoriesList`);
                setCategories(data.categories);
            } catch (err) {
                toast.error(getErrorMessage(err));
            }
        };
        fetchCategories();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.mainCategory || mainCategory;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        const filterPageSize = filter.pageSize || pageSize;
        return `/search?mainCategory=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}&pageSize=${filterPageSize}`;
    };
    return (
        <div>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <Container fluid
                       style={{
                           marginTop: '1em',
                           borderRadius: "30px",
                           background: '#252836',
                           paddingTop: '10px',
                           maxWidth: '96%'
                       }}>
                <Row style={{margin: '1em 0', background: 'transparent'}}>
                    {/*Filters*/}
                    <Col md={3}>
                        <Card className='mb-1'
                              style={{
                                  background: 'transparent',
                                  // background: '#8c8c8c',
                                  // border: 'none',
                                  borderRadius: '10px',
                                  border: '1px solid white',
                              }}>
                            {/*Categories*/}
                            <Card.Body>
                                <h4>Categories</h4>
                                <Card.Text>
                                    <Badge bg={mainCategory === 'all' ? 'primary' : 'secondary'}
                                           style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}
                                           pill>
                                        <Link

                                            to={getFilterUrl({mainCategory: 'all'})}>
                                            Any
                                        </Link>
                                    </Badge>
                                    {categories.map((category) => (
                                        <Badge bg={mainCategory === category ? 'primary' : 'secondary'}
                                               style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}

                                               pill key={category}>
                                            <Link
                                                style={{textTransform: 'capitalize'}}
                                                to={getFilterUrl({mainCategory: category})}>
                                                {category}
                                            </Link>
                                        </Badge>
                                    ))}
                                </Card.Text>

                            </Card.Body>
                        </Card>

                        {/*Price*/}
                        <Card className='mb-1'
                              style={{
                                  background: 'transparent',

                                  // border: 'none',
                                  borderRadius: '10px',
                                  border: '1px solid white',
                              }}>

                            <Card.Body>
                                <h4>Price</h4>
                                <Card.Text>
                                    <Badge bg={price === 'all' ? 'primary' : 'secondary'}
                                           style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}
                                           pill>
                                        <Link

                                            to={getFilterUrl({mainCategory: 'all'})}>
                                            Any Price
                                        </Link>
                                    </Badge>
                                    {prices.map((p) => (
                                        <Badge bg={price === p.value ? 'primary' : 'secondary'}
                                               style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}

                                               pill key={p.value}>
                                            <Link

                                                to={getFilterUrl({price: p.value})}>
                                                {p.name}
                                            </Link>
                                        </Badge>
                                    ))}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        {/*Review*/}
                        <Card className='mb-1'
                              style={{
                                  background: 'transparent',
                                  // border: 'none',
                                  borderRadius: '10px',
                                  border: '1px solid white',
                              }}>

                            <Card.Body>
                                <h4>Average Reviews</h4>
                                <Card.Text>
                                    {ratings.map((r) => (
                                        <Badge bg={Number(rating) === r.rating ? 'primary' : 'secondary'}
                                               style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}

                                               pill key={r.name}>
                                            <Link

                                                to={getFilterUrl({rating: r.rating})}>
                                                <Row>
                                                    <Col md={8} style={{paddingRight: 0}}><Rating
                                                        sx={{
                                                            '& .MuiRating-iconEmpty': {
                                                                color: '#e6e6e6',
                                                            }
                                                        }}
                                                        readOnly size="small" value={r.rating}/> </Col>
                                                    <Col md={4} style={{marginTop: '3px', paddingLeft: '3px'}}>
                                                     <span
                                                     >& Up
                                                     </span>
                                                    </Col>
                                                </Row>

                                            </Link>
                                        </Badge>
                                    ))}
                                    <Badge bg={rating === 'all' ? 'primary' : 'secondary'}
                                           style={{margin: '0 .5em .5em 0', fontSize: '.8em', padding: '5px 15px'}}
                                           pill>
                                        <Link

                                            to={getFilterUrl({rating: 'all'})}>
                                            <Row>
                                                <Col md={8} style={{paddingRight: 0}}><Rating
                                                    sx={{
                                                        '& .MuiRating-iconEmpty': {
                                                            color: '#e6e6e6',
                                                        }
                                                    }}
                                                    readOnly size="small" value={0}/> </Col>
                                                <Col md={4} style={{marginTop: '3px', paddingLeft: '3px'}}>
                                                     <span
                                                     >& Up</span>
                                                </Col>
                                            </Row>

                                        </Link>
                                    </Badge>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/*Products*/}
                    <Col md={9}>
                        {loading ? (
                            <LoadingScreen open={loading}/>

                        ) : error ? (
                            <MessageAlert variant="danger">{error}</MessageAlert>
                        ) : (
                            <>
                                <Row className="justify-content-center mb-4">
                                    <Col md={3} style={{marginTop: '7px'}}>
                                        <>
                                            {countProducts === 0 ? 'No' : countProducts} Results
                                            {query !== 'all' && ' : ' + query}
                                            {mainCategory !== 'all' && ' : ' + mainCategory}
                                            {price !== 'all' && ' : Price ' + price}
                                            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                            {query !== 'all' ||
                                            mainCategory !== 'all' ||
                                            rating !== 'all' ||
                                            price !== 'all' ? (
                                                <Button
                                                    variant="light"
                                                    onClick={() => navigate('/search')}
                                                >
                                                    <i className="fas fa-times-circle"/>
                                                </Button>
                                            ) : null}
                                        </>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <Row>
                                            <Col md={6} style={{marginTop: '7px'}}> Results Per Page</Col>
                                            <Col md={6}>

                                                <Form.Select
                                                    disabled={countProducts === 0}
                                                    value={pageSize}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        //

                                                        navigate(getFilterUrl({pageSize: e.target.value}));
                                                    }}
                                                >
                                                    // select options depending on countProducts
                                                    {[3, 6, 12, 24, 48].map((p) => (
                                                        p <= countProducts ?
                                                            (<option key={p} value={p}>
                                                                {p}
                                                            </option>) : null
                                                    ))}

                                                </Form.Select>
                                            </Col>
                                        </Row>

                                    </Col>

                                    <Col md={5} className="text-end">
                                        <Row>
                                            <Col md={6} style={{marginTop: '7px'}}> Sort by</Col>
                                            <Col md={6}>
                                                <Form.Select
                                                    value={order}
                                                    onChange={(e) => {
                                                        navigate(getFilterUrl({order: e.target.value}));
                                                    }}
                                                >
                                                    <option value="newest">Newest Arrivals</option>
                                                    <option value="lowest">Price: Low to High</option>
                                                    <option value="highest">Price: High to Low</option>
                                                    <option value="toprated">Avg. Customer Reviews</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                {products.length === 0 && (
                                    <MessageAlert variant='info'>No Product Found</MessageAlert>
                                )}
                                <Row>
                                    {products.map((product, i) => (
                                        <Col key={i}>
                                            <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                                <Product key={product.slug} product={product}
                                                         loading={loading} onSale={false}/>
                                            </Col>
                                        </Col>
                                    ))}
                                </Row>
                                <Row className='mb-4'>
                                    <h5 className='text-center'>Page {page} of {Math.ceil(countProducts / pageSize)} </h5>
                                    <Col md={{span: 6, offset: 4}}>

                                        <Pagination
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    background: '#c7c7c7',
                                                    color: 'black',
                                                    '&:hover': {
                                                        background: '#c7c7c7',
                                                        color: 'black',
                                                    },


                                                },
                                                '.Mui-selected': {
                                                    background: '#1565C0',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                },
                                            }}
                                            variant="outlined" shape="rounded"
                                            // boundaryCount={1}
                                            siblingCount={0}
                                            // color='primary'
                                            count={Math.ceil(countProducts / pageSize)}
                                            onChange={(e, pagePag) => {
                                                navigate(getFilterUrl({page: pagePag}));
                                            }}/>
                                    </Col>
                                </Row>
                            </>
                        )
                        }

                    </Col>
                </Row>
            </Container>
        </div>
    );
}