import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import {Slide} from "@mui/material";
import './styles/CustomMenu.css';
const StyledMenu = styled((props) => (
    <Menu
        elevation={20}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({

    '& .MuiPaper-root': {

        borderRadius: 30,
        marginTop: theme.spacing(3.9),
        minWidth: 180,
        maxHeight: '18em',
        width: '100%',
        background: "#858585ef",
        color:
            theme.palette.mode === 'light' ? 'blue' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '0',
        },
        '& .MuiMenuItem-root': {

            justifyContent: "center",

            '& .MuiSvgIcon-root': {
                justifyContent: "center",
                fontSize: "1.5em",
                color: "white",
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomMenu(props) {

    return <StyledMenu {...props} TransitionComponent={Slide}/>;
}