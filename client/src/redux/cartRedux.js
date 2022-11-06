import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        products: [],
        cart_quantity: 0,
        total_amt: 0
    },

    reducers: {
        fetchCart: (state, action) =>{
            state.cart_quantity = action.payload.cart_quantity;
            state.products = action.payload.products;
            state.total_amt = action.payload.total_amt
        },
        addProduct: (state, action)=>{
            state.cart_quantity += 1;
            state.products.push(action.payload);   //payload will be our new  product
            state.total_amt += action.payload.price * action.payload.quantity; 
        },
        emptyCart:(state)=>{
            state.products = [];
            state.cart_quantity = 0;
            state.total_amt = 0;
        }
    }
})

export const { fetchCart, addProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;