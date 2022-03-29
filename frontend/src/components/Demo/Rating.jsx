import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';


function formatNumOfReviews(numOfReviews) {
    // return numOfReviews + (numOfReviews > 1 ? ' reviews' : ' review');
    return numOfReviews + ' reviews';
}

// create a random number between 0 and 1000
function ratingName() {
    const randNUmber = Math.floor(Math.random() * 1000) / 10;
    return 'rating' + randNUmber;
}

export default function Ratings(props) {


    const { ratingReceived, numberOfReviews, update } = props;
    const [rating, setRating] = React.useState(ratingReceived);
    const name = ratingName();
    console.log(name);
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
                name={name}
                defaultValue={ratingReceived}
                value={rating}
                precision={0.5}
                readOnly={update}
                size="large"
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}

                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 3 }}>{formatNumOfReviews(numberOfReviews)}</Box>
            )}
        </Box>
    );
}
