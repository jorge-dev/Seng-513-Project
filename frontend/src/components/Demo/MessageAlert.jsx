import { Alert } from "react-bootstrap";

export default function MessageAlert(props) {
    return (

        <Alert className="text-center col-sm-12 mx-auto w-50" style={props.custStyle || { marginTop: '10em' }} variant={props.variant || 'info'}> {props.children} </Alert>

    )
}
