import { Box, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonProductDetail = () => {
  return (
    <Box className="d-flex mt-5">
      <Box className="mx-5">
        <Skeleton variant="rounded" width={540} height={600} />
      </Box>
      <Box>
        <Skeleton variant="text" width={710} height={60} />
        <Skeleton className='my-1' variant="text" width={710} height={60} />
        <Skeleton className='my-1' variant="text" width={710} height={180} />
        <Skeleton className='my-1' variant="rounded" width={710} height={120} />

        <Box className="d-flex justify-content-between mt-5">
          <Skeleton className='my-1' variant="rectangular" width={150} height={40} />
          <Skeleton className='my-1' variant="rectangular" width={150} height={40} />
        </Box>


      </Box>

    </Box>
  );
};

export default SkeletonProductDetail;


