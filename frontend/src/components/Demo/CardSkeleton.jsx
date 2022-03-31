import { Skeleton, Stack } from "@mui/material";
function CardSkeleton() {

    return (


        <>
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width={280} height={180} />
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width={178} height={35} />
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width={100} height={35} />
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width={220} height={35} />
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" width={130} height={35} />
            <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width={280} height={70} />

        </>

    )
}

export default CardSkeleton;
