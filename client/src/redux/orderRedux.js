import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "myOrders",

    initialState: {
        myOrders: [],
    },

    reducers: {
        fetchOrders: (state, action) =>{
            state.myOrders = action.payload;
        },
        addOrder: (state, action)=>{
            state.myOrders.push(action.payload);   //payload will be our new order.
        },
        emptyOrders: (state)=>{
            state.myOrders = [];
        }
    }
})

export const { fetchOrders, addOrder, emptyOrders } = orderSlice.actions;
export default orderSlice.reducer;