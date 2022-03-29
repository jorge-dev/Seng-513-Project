import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen(props) {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <CircularProgress color="info" />
            </Backdrop>
        </div>
    );
}
