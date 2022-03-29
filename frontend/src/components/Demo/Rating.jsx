import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


function formatNumOfReviews(numOfReviews) {
    return numOfReviews + (numOfReviews > 1 ? ' reviews' : ' review');
}
export default function Ratings(props) {


    const { ratingReceived, numberOfReviews } = props;
    const [rating, setRating] = React.useState(ratingReceived);
    const [hover, setHover] = React.useState(-1);
    console.log(ratingReceived);
    console.log(numberOfReviews);
    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                defaultValue={ratingReceived}
                value={rating}
                precision={0.5}
                // getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 3 }}>{formatNumOfReviews(numberOfReviews)}</Box>
            )}
        </Box>
    );
}
