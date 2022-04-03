import { useState, useEffect, useReducer } from "react";
import { Table, Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import '../styles/AdminProducts.css';

function AdminProducts() {
    const [show, setShow] = useState(false);
    const [currentOperation, setCurrentOperation] = useState('ADD');
    const [currentItem, setCurrentItem] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [formModel, setFormModel] = useState({
        name: '',
        vendor: '',
        price: '',
        description: '',
        image: '',
        mainCategory: '',
        subCategory: '',
        inStock: 'true',
        rating: '1',
        numberOfReviews: ''
    });

    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        if (currentOperation == 'ADD') {
            // add product
            axios.post('/api/products', formModel).then((res) => {
                alert(res.data.message)
                setShow(false)
                getTableData()
            }).catch((err) => {
                console.log("err = ", err)
                alert('Error')
            })
        } else {
            // edit product
            axios.put(`/api/products/${currentItem._id}`, formModel).then((res) => {
                alert(res.data.message)
                setShow(false)
                getTableData()
            }).catch((err) => {
                console.log("err = ", err)
                alert('Error')
            })
        }
    }

    const handleDelete = (item) => {
        axios.delete(`/api/products/${item._id}`).then((res) => {
            alert(res.data.message)
            getTableData()
        }).catch((err) => {
            console.log("err = ", err)
            alert('Error')
        })
    }

    const getTableData = () => {
        axios.get('/api/products').then((res) => {
            setTableData(res.data.data)
        }).catch((err) => {
            console.log("err = ", err)
            alert('Error')
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <div className="adminProductsBox">
            <div className="breadTitBox">
                <div className="breadTit">
                    Products
                </div>
                
    )