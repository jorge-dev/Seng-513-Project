import {Col, Row} from "react-bootstrap";
import {MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {Headphones, Keyboard, More, Mouse} from "@mui/icons-material";

export const MegaMenu = (props) => {
    return (
        <Row className="justify-content-center mx-3">
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>

                        <h4><Keyboard/>Keyboards</h4>


                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>

                <MenuItem onClick={props.clickMe}>

                    <Link to={"/"}>
                        <h5>Mechanical</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Non-Mechanical</h5></Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>

                    <Link to={"/"}>
                        <h4><Mouse/> Mice</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>

                    <Link to={"/"}>
                        <h4><Headphones/> Headphones</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>

                    <Link to={"/"}>
                        <h4><More/> Accessories</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/shoppingCart"}>
                        <h5>Mouse Pads</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Desk Pads</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Keycaps</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/"}>
                        <h5>Wrist Wrest</h5>
                    </Link>
                </MenuItem>


            </Col>
        </Row>
    )
}