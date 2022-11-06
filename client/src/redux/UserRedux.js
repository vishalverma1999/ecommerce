import { createSlice, configureStore } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user", 

    initialState : {               //state
        currentUser : null,
        authToken : null,
        isFetching : false,
        error : false
    },

    reducers: {                    // to define what has to be done on which action
        loginStart : (state)=>{
            state.isFetching = true;    //change isFetching state variable to true
            state.error = false;
            state.currentUser = null;
            state.authToken = null;
        },
        loginSuccess :(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload.FindUser;
            state.authToken = action.payload.authToken;
            state.error = false;
        },
        loginFailure :(state)=>{
            state.isFetching = false;
            state.error = true;
            state.currentUser = null;
            state.authToken = null;
        },

        registerStart : (state)=>{
            state.isFetching = true    //change isFetching state variable to true
            state.error = false;
            state.currentUser = null;
            state.authToken = null;
        },
        registerSuccess :(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload.FindUser;
            state.authToken = action.payload.authToken;
            state.error = false;
        },
        registerFailure :(state)=>{
            state.isFetching = false;
            state.error = true;
            state.currentUser = null;
            state.authToken = null;
        },
        
        logout : (state)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
            state.authToken = null;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout} = userSlice.actions    //actions
export default userSlice.reducer;