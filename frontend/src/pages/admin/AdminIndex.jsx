import { useState, useEffect, useReducer } from "react";
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminTrans from './AdminTrans';
import fullLogo from '../../logos/fullLogo.png';
import '../styles/Admin.css';

function AdminIndex() {
    let [currentNavIndex, setCurrentNavIndex] = useState(0);
    
    return(
        <div className="adminBox">
            <div className="adminHeader">
                <div className="adminHeaderCenter">
                    <div className="adminHeaderTit">
                        <img className="logo" src={fullLogo} alt="" srcset="" />
                    </div>

                    <div className="adminNavBox">
                        {['Users', 'Products', 'Transactions'].map((v, i) => {
                            return(
                                <div key={i} onClick={() => {
                                    setCurrentNavIndex(i);
                                }} className={`adminNav ${currentNavIndex === i ? 'adminActiveNav' : ''}`}>
                                    {v}
                                    </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}