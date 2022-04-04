import React from 'react'
import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger"
import { Container, Col, Row, Dropdown, DropdownButton, Button } from "react-bootstrap";
import GridSystem from "../components/GridSystem"
import Product from "../components/Demo/Product";
import "./styles/Collection.css"

// Init a reducer Hook to handle the data from the API
const reducerHook = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, loading: true };
        case "FETCH_DATA_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_DATA_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function SubCollection(params) {
    const [{ products, loading, error }, dispatch] = useReducer(logger(reducerHook), {
        products: [],
        loading: true,
        error: ''
    });

    // States
    const [currentListedProducts = products, setProducts] = useState();
    const [currentSelectedFilter = `No selected filter`, setFilter] = useState();
    const [numberOfProducts = currentListedProducts.length, setNumberProducts] = useState();

    // Fetch all products for API
    const { slug1, slug2 } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: "FETCH_DATA" });
            try {
                const result = await axios.get(`/api/products/category/${slug1}/${slug2}`);
                dispatch({ type: "FETCH_DATA_SUCCESS", payload: result.data.products });

                // setProductsList(response.data.products);
            } catch (error) {
                dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
            }
        };
        fetchProducts();
    }, [slug1, slug2]);

    // Content data
    const pageTitleString = `Collections/${slug1.charAt(0).toUpperCase() + slug1.slice(1)}/${slug2.charAt(0).toUpperCase() + slug2.slice(1)}`;
    const mainCategoryTitle = slug1.toUpperCase();

    // Grab individual products
    const Item = (props) => {
        const {productObject, onSaleValue, discountPercentValue} = props;
        return (
            <Product product={productObject} loading={loading} onSale={onSaleValue} discountPercent={discountPercentValue} />
        )
    }

    // Price filter
    const PriceFilter = (range) => {
        const rangeValues = range.split(',');
        if (rangeValues.length === 2) {
            setFilter(`Price filter: $${rangeValues[0]} - $${rangeValues[1]}`);
            let productsWithFilter = products.filter(function (product) {
                return (product.price >= rangeValues[0] && product.price <= rangeValues[1])
            }).map(function (product) {
                return product;
            });
            setProducts(productsWithFilter);
            setNumberProducts(productsWithFilter.length)
        }
        else if (rangeValues.length === 1) {
            setFilter(`Price filter: $${rangeValues[0]}+`);
            let productsWithFilter = products.filter(function (product) {
                return (product.price >= rangeValues[0])
            }).map(function (product) {
                return product;
            });
            setProducts(productsWithFilter);
            setNumberProducts(productsWithFilter.length)
        }
    }

    // Brand Filter
    const BrandFilter = (brand) => {
        const brandName = brand.split(',')[0];
        setFilter(`Brand filter: ${brandName} products only`);
        let productsWithFilter = products.filter(function (product) {
            return (product.vendor === brandName)
        }).map(function (product) {
            return product;
        });
        setProducts(productsWithFilter);
        setNumberProducts(productsWithFilter.length)
    }

    // Ratings Filter
    const RatingFilter = (stars) => {
        const rating = stars.split(',')[0];
        setFilter(`Rating filter: ${rating} ★s and up`);
        let productsWithFilter = products.filter(function (product) {
            return (product.rating >= rating)
        }).map(function (product) {
            return product;
        });
        setProducts(productsWithFilter);
        setNumberProducts(productsWithFilter.length)
    }

    // Return
    return (
        <Container className="collection-page" fluid>
            <Row className="page-title">
                {pageTitleString}
            </Row>
            <Row className="main-category-title">
                {mainCategoryTitle}
                <hr/>
            </Row>
            <Row>
                <Col md={3}>
                    <p>(Showing {numberOfProducts} products)</p>
                    <p>{currentSelectedFilter}</p>
                    <Button className="reset-filter-button" variant="secondary" onClick={function(evt){setFilter("No selected filter"); setProducts(products);}}>Reset Filter</Button>

                    {/* Price */}
                    <DropdownButton className="dropdown" size='lg' variant="primary" title="Price" onSelect={function(evt){PriceFilter(evt);}}>
                        <Dropdown.Item as="button" eventKey={[0, 24.99]}>$0 - $24.99</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={[25, 49.99]}>$25 - $49.99</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={[50, 99.99]}>$50 - $99.99</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={[100]}>$100+</Dropdown.Item>
                    </DropdownButton>

                    {/* Rating */}
                    <DropdownButton className="dropdown" size='lg' variant="primary" title="Rating" onSelect={function(evt){RatingFilter(evt);}}>
                        <Dropdown.Item as="button" eventKey={4}>★★★★☆ and up</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={3}>★★★☆☆ and up</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={2}>★★☆☆☆ and up</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={2}>★☆☆☆☆ and up</Dropdown.Item>
                    </DropdownButton>

                    {/* Brand */}
                    <DropdownButton className="dropdown" size='lg' variant="primary" title="Brand" onSelect={function(evt){BrandFilter(evt);}}>
                        <Dropdown.Item as="button" eventKey={"AIAIAI"}>AIAIAI</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Ducky"}>Ducky</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Corsair"}>Corsair</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Glorious"}>Glorious</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Havit"}>Havit</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"HyperX"}>HyperX</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Keychron"}>Keychron</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Logitech"}>Logitech</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Razer"}>Razer</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"Tai-Hao"}>Tai-Hao</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={"XRTFY"}>XRTFY</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <GridSystem colCount={3} md={6}>
                        {
                            currentListedProducts.length > 0 ? currentListedProducts.map(item => <Item key={item.id} productObject={item} onSaleValue={false} discountPercent={0} />) : [<h1>No product here</h1>]
                        }
                    </GridSystem>
                </Col>
            </Row>
        </Container>
    );
}

export default SubCollection;
