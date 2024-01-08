import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartProduct') ? JSON.parse(localStorage.getItem('cartProduct')) : [],
        totalQuantity: 1,
        totalAmount: 1,
        quantityBuy: 1,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.product._id === action.payload.product._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += action.payload.cartQuantity;
            } else {
                const tempProduct = action.payload;
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem('cartProduct', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const newCartItems = state.cartItems.filter((item) => item.product._id !== action.payload.product._id);
            state.cartItems = newCartItems
            localStorage.setItem('cartProduct', JSON.stringify(state.cartItems))
        },
        decrease: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.product._id === action.payload.product._id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
            }
            localStorage.setItem('cartProduct', JSON.stringify(state.cartItems));
        },
        increase: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.product._id === action.payload.product._id);
            if (state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].product.inStock) {
                state.cartItems[itemIndex].cartQuantity += 1
            }
            localStorage.setItem('cartProduct', JSON.stringify(state.cartItems));
        }
    },
});

export const { addToCart, removeFromCart, decrease, increase } = cartSlice.actions;
export default cartSlice.reducer;
