import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  // const [isLoadingData, setIsLoadingData] = useState(true);
  const { product_id } = useParams()

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${product_id}`).then((data) => {
  setProduct(data?.data);
});



  }, [])
  // console.log(product, 'product');

  return (
    <Box className='row mt-3'>
      <Box className='col-md-5 text-center'>
        <img className='img-fluid' width={'400px'} src={product?.image} alt="" />
      </Box>
      <Box className='col-md-7 '>
        <Typography variant='body1'>{product.category}</Typography>
        <Typography variant='h4'>{product.title}</Typography>
        <Typography variant='body2'>{product.description}</Typography>
        <Rating name="read-only" value={product.rate} readOnly />
      <Box className='d-flex justify-content-between align-items-center'>
        <Typography variant="h6">${product.price}</Typography>
       <Box>
       <Button className="my-3" variant="contained"><AddIcon /> Add </Button>
       </Box>
      </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails;


