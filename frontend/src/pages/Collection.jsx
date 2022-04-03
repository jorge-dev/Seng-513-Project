import React from 'react'
import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger"
import { Container, Col, Row } from "react-bootstrap";
import GridSystem from "../components/GridSystem"
import MessageAlert from "../components/Demo/MessageAlert";
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

function Collection(params) {
    const [{ products, loading, error }, dispatch] = useReducer(logger(reducerHook), {
        products: [],
        loading: true,
        error: ''
    });

    // fetch all products for API
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

    console.log("printing loading: " + loading);
    console.log("print below");
    console.log(slug1);
    console.log(slug2);
    console.log(products);

    // Content data
    const pageTitleString = `Collections/${slug1.charAt(0).toUpperCase() + slug1.slice(1)}/${slug2.charAt(0).toUpperCase() + slug2.slice(1)}`;
    const mainCategoryTitle = slug1.toUpperCase()

    const Item = (props) => {
        const {productObject, onSaleValue, discountPercentValue} = props;
        return(
            <Product product={productObject} loading={loading} onSale={onSaleValue} discountPercent={discountPercentValue} />
        )
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
                <Col md={2}>
                    
                </Col>
                <Col>
                    <GridSystem colCount={3} md={6}>
                        {
                            products.length > 0 ? products.map(item => <Item key={item.id} productObject={item} onSaleValue={false} discountPercent={0} />) : [<h1>No product here</h1>]
                        }
                    </GridSystem>
                </Col>
            </Row>
        </Container>
    );
}

export default Collection;
