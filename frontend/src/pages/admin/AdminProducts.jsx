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
                <div onClick={() => {
                    setShow(true)
                    setFormModel({
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

                    })
                }} className="butn">
                    Add New product
                </div>
            </div>

            <Table borderless={true} bordered={false} responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>NumberOfReviews</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((v, i) => {
                        return (
                            <tr key={v._id}>
                                <td align="center">{i + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.mainCategory}</td>
                                <td>{v.numberOfReviews}</td>
                                <td>${v.price}</td>
                                <td>
                                    <div className="tdBtnBox">
                                        <div onClick={() => {
                                            setShow(true)
                                            setCurrentOperation('EDIT')
                                            // console.log("v = ", v)
                                            setCurrentItem(v);
                                            let { name, vendor, price, description, image, mainCategory, subCategory, inStock, rating, numberOfReviews } = v;
                                            setFormModel({
                                                name, vendor, price, description, image, mainCategory, subCategory, inStock, rating, numberOfReviews
                                            })
                                        }} className="butn butnLeft">
                                            Edit
                                        </div>
                                        <div onClick={() => {
                                            handelDelete(v)
                                        }} className="butn butnRight">
                                            Delete
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
                
    )