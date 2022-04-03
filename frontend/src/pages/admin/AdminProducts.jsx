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
            
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{
                        color: 'black'
                    }}>{currentOperation == 'ADD' ? 'Add' : 'Edit'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    color: 'black'
                }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={formModel.name} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    name: e.target.value
                                })
                            }} type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Vendor</Form.Label>
                            <Form.Control value={formModel.vendor} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    vendor: e.target.value
                                })
                            }} type="text" placeholder="Enter Vendor" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={formModel.price} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    price: e.target.value
                                })
                            }} type="number" placeholder="Enter Price" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={formModel.description} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    description: e.target.value
                                })
                            }} type="textarea" placeholder="Enter Description" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control value={formModel.image} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    image: e.target.value
                                })
                            }} type="text" placeholder="Enter Image" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>MainCategory</Form.Label>
                            <Form.Control value={formModel.mainCategory} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    mainCategory: e.target.value
                                })
                            }} type="text" placeholder="Enter MainCategory" />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>SubCategory</Form.Label>
                            <Form.Control value={formModel.subCategory} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    subCategory: e.target.value
                                })
                            }} type="text" placeholder="Enter SubCategory" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>InStock</Form.Label>
                            <Form.Select value={formModel.inStock} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    inStock: e.target.value
                                })
                            }} placeholder="Select InStock">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select value={formModel.rating} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    rating: e.target.value
                                })
                            }} placeholder="Select Rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>NumberOfReviews</Form.Label>
                            <Form.Control value={formModel.numberOfReviews} onChange={(e) => {
                                setFormModel({
                                    ...formModel,
                                    numberOfReviews: e.target.value
                                })
                            }} type="number" placeholder="Enter NumberOfReviews" />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    );
}

export default AdminProducts;
