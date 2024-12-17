import { Box, Button, Drawer, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProdut, increaseQuantity } from '../../store/slices/cart/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';

const CartList = (props) => {
  const {openCartList, toggleCartLiist} = props;

  const {cartItems} = useSelector((state)=>state.cart)

  const dispatch = useDispatch()

  console.log(cartItems);
  

  return (
    <>
        <Drawer open={openCartList} onClose={toggleCartLiist(false)}>
       <Box  sx={{width:'380px',}}>
       <Typography variant='h5' textAlign={'center'}>Cart List</Typography>
       {cartItems?.map((item)=>{
        return(
          <Box className='row py-2' sx={{  padding: '0px', margin: '0px'}}>
           <Box className='col-9 d-flex'>
           <img className='mx-2' width={'60px'} src={item?.image} alt="" />
            <Box>
             <Tooltip title={item?.title}> <Typography>{item?.title?.length > 25 ? `${item?.title.slice(0, 20)}...` : item?.title}</Typography></Tooltip>
              <Typography>{item.category}</Typography>
              <Typography>{item.price}<span>Qty{item?.quantity}</span></Typography>
            </Box>
           </Box>
           <Box className='col-3 d-flex flex-column'>
            <Button onClick={()=>dispatch(decreaseQuantity(item))} variant='outlined' size='small' color='error'><RemoveIcon /></Button>
            <Button onClick={()=>dispatch(increaseQuantity(item))} className='my-1' variant='outlined' size='small' color='success'><AddCircleIcon /></Button>
            <Button onClick={()=>dispatch(deleteProdut(item))} variant='outlined' size='small' color='error'><DeleteIcon /></Button>
           </Box>
          </Box>
        )
       })}
       </Box>
      </Drawer>
    </>
  )
}

export default CartList;
