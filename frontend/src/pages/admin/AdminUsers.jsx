import {useState, useEffect, useReducer, useContext} from "react";
import {Table, Modal, Button, Form} from 'react-bootstrap';
import axios from "axios";
import '../styles/AdminUsers.css';
import {ContextStore} from "../../ContextStore";

function AdminUsers() {
    const [tableData, setTableData] = useState([]);
    const {state} = useContext(ContextStore)
    const {userInfo} = state

    const getTableData = () => {
        axios.get('/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setTableData(res.data.users)
            })
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <div className="adminUsersBox">
            <div className="breadTitBox">
                <div className="breadTit">
                    Users
                </div>
            </div>

            <Table borderless={true} bordered={false} responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>username</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((v, i) => {
                        return (
                            <tr key={v._id}>
                                <td align="center">{i + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.email}</td>
                                <td>{v.username}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div >
    );
}

export default AdminUsers;
