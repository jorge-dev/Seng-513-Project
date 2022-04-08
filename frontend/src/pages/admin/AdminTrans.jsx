import {useState, useEffect, useReducer, useContext} from "react";
import {Table, Modal, Button, Form} from 'react-bootstrap';
import axios from "axios";
import '../styles/AdminTrans.css';
import {ContextStore} from "../../ContextStore";

function AdminTrans() {
    const [tableData, setTableData] = useState([]);
    const {state} = useContext(ContextStore)
    const {userInfo} = state

    const getTableData = () => {
        axios.get('/api/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
        ).then((res) => {
            console.log("res = ", res)
            setTableData(res.data.orders)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <div className="adminTransBox">
            <div className="breadTitBox">
                <div className="breadTit">
                    Transactions
                </div>
            </div>

            <Table borderless={true} bordered={false} responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((v, i) => {
                        let sty = {};
                        if (v.paymentStatus === 'Pending') {
                            sty = {
                                background: 'linear-gradient(to Right, rgb(255, 145, 0), rgb(255, 115, 0))'
                            }
                        }
                        if (v.paymentStatus === 'Paid') {
                            sty = {
                                background: 'linear-gradient(133deg, rgba(28,156,0,1) 27%, rgba(47,163,186,1) 91%)'
                            }
                        }
                        if (v.paymentStatus === 'Declined') {
                            sty = {
                                background: 'linear-gradient(to Right, rgb(255, 0, 55), rgb(255, 0, 149))'
                            }
                        }
                        return (
                            <tr key={v._id}>
                                <td align="center">{i + 1}</td>
                                <td>{v.user}</td>
                                <td>{v.createdAt}</td>
                                <td>${v.totalPrice}</td>
                                <td>
                                    <div style={{
                                        ...sty
                                    }} className="paymentStatus">
                                        {v.paymentStatus}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div >
    );
}

export default AdminTrans;
