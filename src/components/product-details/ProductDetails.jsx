import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SkeletonProductDetail from './SkeletonProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cart/cartSlice';

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { product_id } = useParams();

  const { cartItems } = useSelector((state) => state.cart);
  const [productDetails, setProductDetails] = useState({});
  const isExist = cartItems?.find((item) => item.id === parseInt(product_id)); // Fixed comparison
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${product_id}`).then((data) => {
      setProduct(data?.data);
      setIsLoadingData(false);
    });
  }, [product_id]);

  useEffect(() => {
    const renderProduct = cartItems?.filter((item) => item?.id === parseInt(product_id))[0]; // Fixed parsing
    setProductDetails(renderProduct || {});
  }, [cartItems, product_id]);

  return (
    <>
      {isLoadingData ? (
        <SkeletonProductDetail />
      ) : (
        <Box className="row mt-3">
          <Box className="col-md-5 text-center">
            <img className="img-fluid" width={'400px'} src={product?.image} alt="" />
          </Box>
          <Box className="col-md-7">
            <Typography variant="body1">{product.category}</Typography>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Rating name="read-only" value={product.rate} readOnly />
            <Box className="d-flex justify-content-between align-items-center">
              <Box className="d-flex">
                <Typography variant="h6">${product.price}</Typography>
                {isExist && (
                  <Typography variant="h6" className="ms-3">
                    Qty: {productDetails?.quantity || 0}
                  </Typography>
                )}
              </Box>
              <Box>
                <Button
                  className="my-3"
                  variant="contained"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <AddIcon /> Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;



