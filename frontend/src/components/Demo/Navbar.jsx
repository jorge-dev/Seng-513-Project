
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, NavLink, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import LogoImage from "../../logos/fullLogo.png";
import "./styles/Navbar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faShoppingCart, faUser, faKeyboard, faComputerMouse, faHeadphones, faPlus } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    return (
        <Navbar className='header' collapseOnSelect expand="lg" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand ><img className="brand" src={LogoImage} alt="logo" /></Navbar.Brand>
            </LinkContainer>

            <Dropdown as={NavItem}>
                <Dropdown.Toggle className='arrowDown' as={NavLink} >Products</Dropdown.Toggle>
                <Dropdown.Menu className="large-dropdown-menu">
                    <div className="dropdown-menu-wrapper">
                        <div>
                            <ul>
                                <li className="dropdown-header">
                                    <div className="menu-icon-wrapper">

                                        <div><NavDropdown.Item href="#keyboards"><b className='dropDownTitle'><FontAwesomeIcon icon={faKeyboard} />KeyBoards</b></NavDropdown.Item></div>
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
                                <li className="job-sub-tabs"><NavDropdown.Item >
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

                                        <div><NavDropdown.Item href="#headphone"><b className='dropDownTitle'><FontAwesomeIcon icon={faHeadphones} />HeadPhones</b></NavDropdown.Item></div>
                                    </div>
                                </li>
                                <li className="job-sub-tabs"><NavDropdown.Item >
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

            <Link className='NavLinks non-product' to="/contact">Contact</Link>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" activeKey={window.location.pathname}>


                </Nav>
                <Nav>
                    <Nav.Item className='NavLinks nav-icons' >

                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </Nav.Item>
                    <Nav.Item className='NavLinks nav-icons' ><Link to="/account"><FontAwesomeIcon icon={faUser} /> </Link></Nav.Item>
                    <Nav.Item className='NavLinks nav-icons' ><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /> </Link></Nav.Item>


                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default NavBar;
