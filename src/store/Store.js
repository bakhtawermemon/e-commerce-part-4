import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counterSlice/counterSlice';
import cartReducer from '../store/slices/cart/cartSlice'

export const Store =configureStore({
    reducer:{
        counter : counterReducer,
        cart:cartReducer,
    },
});