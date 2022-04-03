import { useState, useEffect, useReducer } from "react"; 
import {Table, Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import '../styles/AdminProducts.css';

function AdminProducts() {
    const [show, setShow] = useState(false);
    const [currentOperation, setCurrentOperation] = useState('ADD');
    const [currentItem, setCurrentItem] = useState(null);
    const [tabledata, setTabledata] = useState([]);
    const [formdata, setFormdata] = useState({
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
    if (currentOperation) == 'ADD') {
        //add products
        axios.post('/api/products', formModel).then((res) => {
            alert(res.data.message)
            setShow(false);
            getTableData()
        }).catch((err) => {
            console.log("err = ", err)
            alert('Error')
        })
    } else {
        //edit products
        axios.put('/api/products/' + currentItem._id, formModel).then((res) => {
            alert(res.data.message)
            setShow(false);
            getTableData()
        }).catch((err) => {
            console.log("err = ", err)
            alert('Error')
        })
    }
}