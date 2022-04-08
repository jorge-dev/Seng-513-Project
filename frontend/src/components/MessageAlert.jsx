import { Alert } from "react-bootstrap";

export default function MessageAlert(props) {
    return (

        <Alert className="text-center col-sm-12 mx-auto" style={props.custStyle || {marginTop: '10em', width: '50%'}}
               variant={props.variant || 'info'}> {props.children} </Alert>

    )
}
