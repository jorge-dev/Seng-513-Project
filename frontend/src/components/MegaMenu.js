import {Col, Row} from "react-bootstrap";
import {MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {Headphones, Keyboard, More, Mouse} from "@mui/icons-material";

export const MegaMenu = (props) => {
    return (
        <Row className="justify-content-center mx-3">
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/keyboards"}>
                        <h4><Keyboard/>Keyboards</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/keyboards/wired"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/keyboards/wireless"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>

                <MenuItem onClick={props.clickMe}>

                    <Link to={"/collections/keyboards/mech"}>
                        <h5>Mechanical</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/keyboards/membrane"}>
                        <h5>Non-Mechanical</h5></Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/mice"}>
                        <h4><Mouse/> Mice</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/mice/wired"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/mice/wireless"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/headphones"}>
                        <h4><Headphones/> Headphones</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/headphones/wired"}>
                        <h5>Wired</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/headphones/wireless"}>
                        <h5>Wireless</h5>
                    </Link>
                </MenuItem>


            </Col>
            <Col sm={"6"} lg={"3"}>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/accessories"}>
                        <h4><More/> Accessories</h4>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/accessories/mousepads"}>
                        <h5>Mouse Pads</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/accessories/deskmats"}>
                        <h5>Desk Pads</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/accessories/keycaps"}>
                        <h5>Keycaps</h5>
                    </Link>
                </MenuItem>
                <MenuItem onClick={props.clickMe}>
                    <Link to={"/collections/accessories/wristwrest"}>
                        <h5>Wrist Wrest</h5>
                    </Link>
                </MenuItem>


            </Col>
        </Row>
    )
}