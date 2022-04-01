import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Nav, Navbar, NavDropdown, NavItem, NavLink} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, IconButton} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoImage from "../../logos/fullLogo.png";
import {AccountCircle, LoginOutlined, Search, ShoppingCart} from '@mui/icons-material';
import "./styles/Navbar.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComputerMouse, faHeadphones, faKeyboard, faPlus} from '@fortawesome/free-solid-svg-icons'
import {ContextStore} from "../../ContextStore";
import {grey} from "@mui/material/colors";

function NavBar() {
    const [navColor, setNavColor] = useState(false);
    const {state, setState: ctxDispatch} = useContext(ContextStore)
    const {cart, userInfo} = state
    // const navigate = useNavigate

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setNavColor(true);
        } else {
            setNavColor(false);
        }
    }
    window.addEventListener('scroll', handleScroll);

    const handleSignOut = () => {
        ctxDispatch({type: 'SIGN_OUT'});
        localStorage.removeItem('userInfo');
        // navigate('/#signout');
        setAnchorEl(null);
    };

    return (
        <Navbar fixed="top" className={navColor ? 'main-navbar active' : 'main-navbar'} collapseOnSelect expand="lg"
                variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand><img className="brand" src={LogoImage} alt="logo"/></Navbar.Brand>
            </LinkContainer>


            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Dropdown as={NavItem}>
                    <Dropdown.Toggle className='arrowDown' as={NavLink}>Products</Dropdown.Toggle>
                    <Dropdown.Menu className="large-dropdown-menu">
                        <div className="dropdown-menu-wrapper">
                            <div>
                                <ul>
                                    <li className="dropdown-header">
                                        <div className="menu-icon-wrapper">

                                            <div><NavDropdown.Item href="#keyboards"><b
                                                className='dropDownTitle'><FontAwesomeIcon icon={faKeyboard}/>KeyBoards</b></NavDropdown.Item>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wired</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wireless</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Mechanical</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Membrane</Link>
                                    </NavDropdown.Item></li>

                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className="dropdown-header">
                                        <div className="menu-icon-wrapper">

                                            <div><NavDropdown.Item href="#mice"><b className='dropDownTitle mouse'><FontAwesomeIcon icon={faComputerMouse} />Mice </b></NavDropdown.Item></div>
                                        </div>
                                    </li>
                                    <li className="job-sub-tabs"><NavDropdown.Item>
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wired</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item>
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wireless</Link>
                                    </NavDropdown.Item></li>
                                </ul>
                            </div>
                            <div className="dropdown-items-div">
                                <ul>
                                    <li className="dropdown-header">
                                        <div className="menu-icon-wrapper">

                                            <div><NavDropdown.Item href="#headphone"><b
                                                className='dropDownTitle'><FontAwesomeIcon icon={faHeadphones}/>HeadPhones</b></NavDropdown.Item>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="job-sub-tabs"><NavDropdown.Item>
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wired</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wireless</Link>
                                    </NavDropdown.Item></li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className="dropdown-header">
                                        <div className="menu-icon-wrapper">

                                            <div><NavDropdown.Item href="#accessories"><b className='dropDownTitle'><FontAwesomeIcon icon={faPlus} />Accessories</b></NavDropdown.Item></div>

                                        </div>
                                    </li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Desk mats</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Key Caps</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Mouse Pads</Link>
                                    </NavDropdown.Item></li>
                                    <li className="job-sub-tabs"><NavDropdown.Item >
                                        <Link to="/product/logitech-h800-bluetooth-wireless-headset">Wrist Wrest</Link>
                                    </NavDropdown.Item></li>
                                </ul>
                            </div>

                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <Nav className="me-auto" activeKey={window.location.pathname}>

                    <Link className='NavLinks non-product' to="/contact">Contact</Link>
                </Nav>
                <Nav>
                    <Nav.Item className='NavLinks nav-icons'>
                        <Search fontSize="large"/>
                        {/*<FontAwesomeIcon icon={faMagnifyingGlass}/>*/}

                    </Nav.Item>
                    <Nav.Item className='NavLinks nav-icons'>
                        {!userInfo ?
                            (<Link to="/pages/Login">
                                <LoginOutlined fontSize="large"/>
                                {/*<FontAwesomeIcon icon={faRightToBracket}/>*/}
                            </Link>) : (
                                <>
                                    <IconButton aria-label="add" id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                    >
                                        <AccountCircle sx={{color: grey[50]}} fontSize="large"/>
                                    </IconButton>
                                    <Menu
                                        xs={{color: grey[500]}}
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleSignOut}><Link to="/#signout">Logout</Link></MenuItem>
                                    </Menu>
                                </>
                            )
                            // <Link to="/pages/AccountManagement">
                            //
                            //     <FontAwesomeIcon icon={faUser}/>
                            // </Link>
                        }
                    </Nav.Item>
                    <Nav.Item className='NavLinks nav-icons'>
                        <Link to="/shoppingCart">

                            < Badge color="error" badgeContent={cart.items.reduce((a, c) => a + c.quantities, 0)}>

                                <ShoppingCart fontSize="large"/>


                            </Badge>

                        </Link>
                    </Nav.Item>


                </Nav>
            </Navbar.Collapse>

        </Navbar >
    );
}

export default NavBar;
