import { Autocomplete, Box, Button, Card, CircularProgress, Grid, Rating, TextField, Tooltip, Typography } from '@mui/material'
// import { Card, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Swiper, SwiperSlide } from 'swiper/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart } from '../../store/slices/cart/cartSlice';

// import { addToCart } from '../../store/slices/cart/cartSlice'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProdectsCard = () => {
  const [updatedProductsArr, setUpdatedProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);

  const dispatch = useDispatch ()

  // const filterProducts = (categoryProduct) => {
  //   const filterByCategory = categoryProduct
  //     ? products.filter((item) => item.category?.name === categoryProduct.value)
  //     : products;
  //   setUpdatedProductsArr(filterByCategory);
  // };

  const filterProducts = (categoryProduct) => {
    const filterByCategory = categoryProduct
      ? products.filter((item) => item.category === categoryProduct.value)
      : products;
    setUpdatedProductsArr(filterByCategory);
  };
  

  useEffect(() => {
    const productsData = axios.get('https://fakestoreapi.com/products').then((data) => {
      console.log(data, 'apidata');

      const categoryArr = data?.data?.map((item) => {
        return {
          label: item?.category,
          value: item?.category,
        };
      })
      const uniqueData = categoryArr.filter((item, index, self) => index === self.findIndex((t) => t.value === item.value));
      setCategoryArr(uniqueData);
      setProducts(data?.data);
      setUpdatedProductsArr(data?.data);
      setIsLoadingData(false);

    });


  }, [])
  return (
    <>
      <Autocomplete className='mb-5'
        disablePortal
        options={categoryArr}
        onChange={(e, newValue) => {
          filterProducts(newValue)
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Grid container spacing={3} >
        {
          isLoadingData ? <Box className='mt-2'><CircularProgress size={40} /></Box> :
            updatedProductsArr?.map((product) => (

              <Grid Item sm={3} className='p-3'>
                <Card key={product.id} >
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 4500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >


                    <SwiperSlide className='text-center'>  <img width={'300px'} height={'400px'} src={product?.image} alt='' /></SwiperSlide>
                    <SwiperSlide className='text-center'>  <img width={'300px'} height={'400px'} src={product?.image} alt='' /></SwiperSlide>

                  </Swiper>
                  <Box className='p-3'>
                    <Typography variant='body1'>{product?.category?.name}</Typography>
                    <Tooltip title={product?.title} placement='top'>
                      <Typography variant="h5" className="mt-2">{product?.title?.length > 25 ? `${product?.title.slice(0, 25)}...` : product?.title}</Typography>
                    </Tooltip>
                    <Rating name="read-only" value={product.rating.rate} readOnly />
                    <Box className='d-flex justify-content-between align-items-center'>
                      <Typography variant="h6">${product.price}</Typography>
                      <Box>
                        <Tooltip title="Favorite" placement='top'>
                          <FavoriteIcon className='text-primary' sx={{cursor:'pointer'}}/>
                        </Tooltip>
                        <Tooltip title='View Details' placement='top'>
                          <Link to={`/product-details/${product?.id}`}>
                            <VisibilityIcon className='mx-3 text-primary' /></Link>
                        </Tooltip>
                        <Button className="my-3" variant="contained" onClick={()=>dispatch(addToCart(product))}><AddIcon /> Add
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                </Card>
              </Grid>

            ))}
      </Grid>
    </>
  )
}

export default ProdectsCard;