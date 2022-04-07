import React, {useState, useEffect, useReducer, useContext} from "react";
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminTrans from './AdminTrans';
import fullLogo from '../../logos/fullLogo.png';
import '../styles/Admin.css';
import {ContextStore} from "../../ContextStore";
import MessageAlert from "../../components/MessageAlert";
import {Link} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";

function AdminIndex() {
    let [currentNavIndex, setCurrentNavIndex] = useState(0);
    const {state, setState: ctxDispatch} = useContext(ContextStore)
    const {userInfo} = state

    const handleSignOut = () => {
        ctxDispatch({type: 'SIGN_OUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('items');
        localStorage.removeItem('shippingInfo');
        localStorage.removeItem('paymentMethod');
    };

    return userInfo && userInfo.isAdmin ? (
        <div className="adminBox " style={{minHeight: '85vh'}}>
            <div className="adminHeader">
                <div className="adminHeaderCenter">
                    <div className="adminHeaderTit">
                        <img className="logo" src={fullLogo} alt=""/>
                    </div>

                    <div className="adminNavBox">

                        {['Users', 'Products', 'Transactions'].map((v, i) => {
                            return (
                                <div key={i} onClick={() => {
                                    setCurrentNavIndex(i)
                                }} className={`adminNav ${currentNavIndex === i ? 'adminActiveNav' : ''}`}>
                                    {v}
                                </div>
                            );
                        })}
                        <div className='bg-danger adminNav' onClick={handleSignOut}>
                            <Link to='/' className='text-white'>
                                Sign out
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            <div className="middleBox">
                {currentNavIndex === 0 && (
                    <AdminUsers/>
                )}
                {currentNavIndex === 1 && (
                    <AdminProducts/>
                )}
                {currentNavIndex === 2 && (
                    <AdminTrans/>
                )}
            </div>
        </div>

    ) : (<MessageAlert variant={"danger"} custStyle={{marginTop: '1.5em'}}><h1>You do not have admin access</h1> <br/>
        <Link style={{color: 'black'}} to={'/'}>Please sign with an admin account
            to access this page<ArrowForward/></Link>
    </MessageAlert>)
}
export default AdminIndex;