import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

import {Helmet} from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Rating from '../components/Rating';
// import LoadingBox from '../components/LoadingBox';
// import MessageAlert from '../components/MessageAlert';
import Button from 'react-bootstrap/Button';
// import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import {Rating} from "@mui/material";
import LoadingScreen from "../../components/Demo/LoadingScreen";
import MessageAlert from "../../components/Demo/MessageAlert";
import Product from "../../components/Demo/Product";
import {getErrorMessage} from "../../utils/handleApiError";

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
        name: '$1 to $50',
        value: '1-50',
    },
    {
        name: '$51 to $200',
        value: '51-200',
    },
    {
        name: '$201 to $1000',
        value: '201-1000',
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

export default function SearchScreen() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const sp = new URLSearchParams(search); // /search?mainCategory=Shirts
    const mainCategory = sp.get('mainCategory') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [{loading, error, products, pages, countProducts}, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&mainCategory=${mainCategory}&price=${price}&rating=${rating}&order=${order}`
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
    }, [mainCategory, error, order, page, price, query, rating]);

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
        return `/search?mainCategory=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };
    return (
        <div>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <Row>
                <Col md={3}>
                    <h3>Department</h3>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === mainCategory ? 'text-bold' : ''}
                                    to={getFilterUrl({mainCategory: 'all'})}
                                >
                                    Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        className={c === mainCategory ? 'text-bold' : ''}
                                        to={getFilterUrl({mainCategory: c})}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === price ? 'text-bold' : ''}
                                    to={getFilterUrl({price: 'all'})}
                                >
                                    Any
                                </Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link
                                        to={getFilterUrl({price: p.value})}
                                        className={p.value === price ? 'text-bold' : ''}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl({rating: r.rating})}
                                        className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                    >
                                        <Rating readOnly value={r.rating}/> {' & up'}
                                        {/*<Rating caption={' & up'} rating={r.rating}></Rating>*/}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to={getFilterUrl({rating: 'all'})}
                                    className={rating === 'all' ? 'text-bold' : ''}
                                >
                                    <Rating readOnly value={0}/> {' & up'}
                                    {/*<Rating caption={' & up'} rating={0}></Rating>*/}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <LoadingScreen open={loading}/>
                    ) : error ? (
                        <MessageAlert variant="danger">{error}</MessageAlert>
                    ) : (
                        <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
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
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    Sort by{' '}
                                    <select
                                        value={order}
                                        onChange={(e) => {
                                            navigate(getFilterUrl({order: e.target.value}));
                                        }}
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="lowest">Price: Low to High</option>
                                        <option value="highest">Price: High to Low</option>
                                        <option value="toprated">Avg. Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && (
                                <MessageAlert variant='info'>No Product Found</MessageAlert>
                            )}

                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                        <Product key={product.slug} product={product}
                                                 loading={loading} onSale={false}/>
                                    </Col>
                                ))}
                            </Row>

                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({page: x + 1})}
                                    >
                                        <Button
                                            className={Number(page) === x + 1 ? 'text-bold' : ''}
                                            variant="light"
                                        >
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
}