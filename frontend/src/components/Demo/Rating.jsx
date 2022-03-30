import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';

const DarkStyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ffeb38',
    },
    '& .MuiRating-iconHover': {
        color: '#ffd000',
    },
    '& .MuiRating-iconEmpty': {
        color: '#e6e6e6',
    }
});

const LightStyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#fac534',
    },
    '& .MuiRating-iconHover': {
        color: '#ffc400',
    },
    '& .MuiRating-iconEmpty': {
        color: '#363636',
    }
});


function formatNumOfReviews(numOfReviews) {
    return numOfReviews + (numOfReviews > 1 ? ' reviews' : ' review');
    // return numOfReviews + ' reviews';
}

// create a random number between 0 and 1000
function ratingName() {
    const randNUmber = Math.floor(Math.random() * 1000) / 10;
    return 'rating' + randNUmber;
}

export default function Ratings(props) {
    const { ratingReceived, numberOfReviews, readOnly, isDark } = props;
    const [rating, setRating] = React.useState(ratingReceived);
    const name = ratingName();




    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'left',
            }}
        >{
                isDark ?
                    <DarkStyledRating
                        name={name}
                        defaultValue={ratingReceived}
                        value={rating}
                        precision={0.5}
                        readOnly={readOnly}
                        size="large"
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}

                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    /> :
                    <LightStyledRating
                        name={name}
                        defaultValue={ratingReceived}
                        value={rating}
                        precision={0.5}
                        readOnly={readOnly}
                        size="large"
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}

                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
            }
            {rating !== null && (
                isDark ?
                    <Typography style={{ color: "white" }}  >{formatNumOfReviews(numberOfReviews)}</Typography>
                    :
                    <Typography style={{ color: "black" }} >{formatNumOfReviews(numberOfReviews)}</Typography>
            )}
        </Box>
    );
}
