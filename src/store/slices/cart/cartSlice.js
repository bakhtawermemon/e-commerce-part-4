import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.cartItems.find((item) => item.id === action.payload.id);

            if (isExist) {
                isExist.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQuantity: (state, action) =>{
            const isExist = state.cartItems.find((item) => item.id === action.payload.id);
            if (isExist) {
                isExist.quantity += 1;
            }
            },
            decreaseQuantity : (state, action) => {
                const isExist = state.cartItems.find((item) => item.id === action.payload.id);
                if (isExist && isExist.quantity > 1) {
                    isExist.quantity -= 1;
                } else if(isExist && isExist.quantity === 1)
                    state.cartItems = state.cartItems.filter((item)=> item.id !== action.payload.id)
            },
            deleteProdut: (state, action) =>{
                state.cartItems = state.cartItems.filter((item)=> item.id !== action.payload.id)
            }
    },
})

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProdut } = cartSlice.actions;
export default cartSlice.reducer;