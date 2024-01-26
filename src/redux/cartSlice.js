import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalAmount: 0,
        totalDiscount: 0,
        totalPay: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.idSize._id === action.payload.idSize._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += action.payload.cartQuantity;
            } else {
                const tempProduct = action.payload;
                state.cartItems.push(tempProduct);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalDiscount = 0;
            state.totalPay = 0;
        },
        removeFromCart: (state, action) => {
            const newCartItems = state.cartItems.filter((item) => item.idSize._id !== action.payload.idSize._id);
            state.cartItems = newCartItems;
        },
        decrease: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.idSize._id === action.payload.idSize._id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
        },
        increase: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.idSize._id === action.payload.idSize._id);
            if (state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].idSize.inStock) {
                state.cartItems[itemIndex].cartQuantity += 1;
            }
        },
        inputValue: (state, action) => {
            const { id, number } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.idSize._id === id);
            state.cartItems[itemIndex].cartQuantity = number;
        },
        setTotal: (state) => {
            let total = 0;
            state.cartItems.forEach((element) => {
                total += element.product.price * element.cartQuantity;
            });
            state.totalAmount = total;
        },
        setTotalPay: (state) => {
            let total = 0;
            state.cartItems.forEach((element) => {
                total +=
                    (element.product.price - (element.product.price * element.product.discount) / 100) *
                    element.cartQuantity;
            });
            state.totalPay = total;
        },
        setDiscount: (state) => {
            state.totalDiscount = state.totalPay - state.totalAmount;
        },
    },
});

export const { addToCart, clearCart, removeFromCart, decrease, increase, inputValue, setTotal, setTotalPay, setDiscount } =
    cartSlice.actions;
export default cartSlice.reducer;
