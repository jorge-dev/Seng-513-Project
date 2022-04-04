import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, Divider, IconButton, Menu, MenuItem, Slide} from '@mui/material';
import LogoImage from "../../logos/fullLogo.png";
import {AccountCircle, ArrowDropDown, LoginOutlined, Logout, Person, Search, ShoppingCart} from '@mui/icons-material';
import "./styles/Navbar.css";
import {ContextStore} from "../../ContextStore";
import {grey} from "@mui/material/colors";
import CustomMenu from "../CustomMenu";
import {MegaMenu} from "../MegaMenu";


function NavBar() {
    const [navColor, setNavColor] = useState(false);
    const {state, setState: ctxDispatch} = useContext(ContextStore)
    const {cart, userInfo} = state
    // const navigate = useNavigate

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElProduct, setAnchorElProduct] = useState(null);
    const open = Boolean(anchorEl);
    const openProduct = Boolean(anchorElProduct);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickProduct = (event) => {
        setAnchorElProduct(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseProduct = () => {
        setAnchorElProduct(null);
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
        localStorage.removeItem('items');
        localStorage.removeItem('shippingInfo');
        localStorage.removeItem('paymentMethod');
        // navigate('/#signout');
        setAnchorEl(null);
    };

    return (
        <Navbar sticky="top" className={navColor ? 'main-navbar active' : 'main-navbar'} collapseOnSelect expand="lg"
                variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand><img className="brand" src={LogoImage} alt="logo"/></Navbar.Brand>
            </LinkContainer>
            <Nav>

                <div className="arrowDown" onClick={handleClickProduct}>


                    Product
                    <ArrowDropDown/>
                </div>
                <CustomMenu id="user-menu"
                            anchorEl={anchorElProduct}
                            open={openProduct}
                            onClose={handleCloseProduct}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                    <MegaMenu clickMe={handleCloseProduct}/>
                </CustomMenu>

            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="me-auto">

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
                                        sx={
                                            {
                                                '& .MuiPaper-root': {
                                                    marginTop: "1.5em",
                                                    borderRadius: 5,

                                                    // minWidth: 180,

                                                    background: "#858585ef",
                                                    color:
                                                        'white',
                                                    boxShadow:
                                                        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                                                    '& .MuiMenu-list': {
                                                        padding: '0',
                                                    },
                                                    '& .MuiMenuItem-root': {

                                                        // justifyContent: "center",

                                                        '& .MuiSvgIcon-root': {
                                                            // justifyContent: "center",
                                                            fontSize: "1.5em",
                                                            color: "white",

                                                        },

                                                    },
                                                },

                                            }}
                                        id="user-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        TransitionComponent={Slide}

                                    >
                                        {/*<MegaMenu/>*/}

                                        <MenuItem onClick={handleClose}><Link to="/pages/AccountManagement">
                                            <Person/> My Account</Link></MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={handleSignOut}><Link to="/#signout"> <Logout/> Logout</Link></MenuItem>
                                    </Menu>
                                </>
                            )

                        }
                    </Nav.Item>
                    <Nav.Item className='NavLinks nav-icons'>
                        <Link to="/shoppingCart">

                            < Badge color="error" badgeContent={cart.items.reduce((a, c) => a + c.quantity, 0)}>

                                <ShoppingCart fontSize="large"/>


                            </Badge>

                        </Link>
                    </Nav.Item>


                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
        ;
}

export default NavBar;
