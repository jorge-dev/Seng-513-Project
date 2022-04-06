import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, Divider, IconButton, InputBase, Menu, MenuItem, Slide} from '@mui/material';
import LogoImage from "../../logos/fullLogo.png";
import {AccountCircle, ArrowDropDown, LoginOutlined, Logout, Person, Search, ShoppingCart} from '@mui/icons-material';
import "./styles/Navbar.css";
import {ContextStore} from "../../ContextStore";
import {grey} from "@mui/material/colors";
import CustomMenu from "../CustomMenu";
import {MegaMenu} from "../MegaMenu";
import {alpha, styled} from "@mui/material/styles";


const SearchBar = styled('div')(({theme}) => ({
    position: 'relative',
    marginTop: '0.5rem',
    borderRadius: '30px',
    color: 'white',
    fontSize: '1.2rem',
    backgroundColor: alpha(theme.palette.common.white, 0),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    // color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '0em',
            '&:focus': {
                width: '20em',
                backgroundColor: alpha(theme.palette.common.white, 0.8),
                borderRadius: '30px',
                color: 'black'
            },
        },
        [theme.breakpoints.up('xs')]: {
            width: '0em',
            '&:focus': {
                width: '12em',
                backgroundColor: alpha(theme.palette.common.white, 0.8),
                borderRadius: '30px',
                color: 'black'
            },
        },
    },
}));

function NavBar() {
    const [expanded, setExpanded] = useState(false);

    const [navColor, setNavColor] = useState(false);
    const {state, setState: ctxDispatch} = useContext(ContextStore)
    const {cart, userInfo} = state
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate();

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

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchInput)
        setSearchInput('');
        navigate(`/search/${searchInput}`);
    }

    return (
        <Navbar sticky="top" className={navColor ? 'main-navbar active' : 'main-navbar'} collapseOnSelect
                expanded={expanded} expand="lg"
                variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand onClick={() => setExpanded(false)}><img className="brand" src={LogoImage}
                                                                      alt="logo"/></Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="responsive-navbar-nav"
                           onClick={() => setExpanded(expanded ? false : "expanded")}/>
            <Navbar.Collapse id="responsive-navbar-nav">
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
                <Nav className="me-auto">

                    <Link onClick={() => setExpanded(false)} className='NavLinks non-product'
                          to="/pages/Contact">Contact</Link>
                </Nav>
                <Nav>
                    <Container className="me-auto searchContainer">
                        <Form onSubmit={handleSearch}>
                            <SearchBar className='searchBox'>
                                <SearchIconWrapper>
                                    <Search sx={{fontSize: '2.1em',}}/>
                                </SearchIconWrapper>
                                <StyledInputBase className='searchInput'
                                                 onChange={(e) => setSearchInput(e.target.value)}
                                                 value={searchInput}
                                                 placeholder="Search…"
                                                 inputProps={{'aria-label': 'search'}}
                                />
                            </SearchBar>

                        </Form>
                    </Container>

                    <Nav.Item className='NavLinks nav-icons'>
                        {!userInfo ?
                            (<Link onClick={() => setExpanded(false)} to="/pages/Login">
                                <LoginOutlined fontSize="large"/>

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

                                        <MenuItem onClick={handleClose}><Link onClick={() => setExpanded(false)}
                                                                              to="/pages/AccountManagement">
                                            <Person/> My Account</Link></MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={handleSignOut}><Link onClick={() => setExpanded(false)}
                                                                                to="/#signout"> <Logout/> Logout</Link></MenuItem>
                                    </Menu>
                                </>
                            )

                        }
                    </Nav.Item>
                    <Nav.Item className='NavLinks nav-icons cart'>
                        <Link onClick={() => setExpanded(false)} to="/shoppingCart">

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
