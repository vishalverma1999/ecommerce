import { publicRequest, userRequest } from "../requestMethods";
import { fetchCart } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./UserRedux";
// import { fetchOrders } from "./orderRedux";
import axios from "axios";
import { fetchOrders } from "./orderRedux";
// const port = process.env.PORT || 5000
// const BASE_URL = `http://localhost:${port}/api`;

const production  = 'https://ecommerce-z4sf.onrender.com/api';
const development = 'http://localhost:5000/api';
const BASE_URL = (process.env.NODE_ENV ? production : development);


//LOGIN
export const login = async(dispatch, user)=>{
    dispatch(loginStart());
    try{
       const res = await publicRequest.post("/auth/login", user);
       dispatch(loginSuccess(res.data));    //res.data will be our user info like name, email , image ...  and cart info
       dispatch(fetchCart(res.data.cart))
    }catch(err){
       dispatch(loginFailure())
    }
}


//REGISTER
export const register = async(dispatch, user)=>{
   dispatch(registerStart());
   try{
      const res= await publicRequest.post("/auth/register", user);
      dispatch(registerSuccess(res.data));
      dispatch(fetchCart(res.data.cart))
   }catch(err){
      dispatch(registerFailure());
   }
}

//UPDATE CART 
export const updateCart = async( user_Id, item)=>{
   try{ 
      const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).authToken;
      const res= await axios.create({
         baseURL : BASE_URL,
         headers: { authToken : TOKEN },
     }).put(`/cart/updateCart/${user_Id}`, item);

   }catch(err){
      console.log(err);
   }
}

//PLACE AN ORDER 
export const addOrder = async(order)=>{
   try{
      const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).authToken;
      const res= await axios.create({
         baseURL : BASE_URL,
         headers: { authToken : TOKEN },
     }).post("/orders/addOrder", order);

  }catch(err){
      console.log(err);
  }
}

//Fetch Orders 
export const fetchUserOrders = async(dispatch, userId)=>{
   try{
      const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).authToken;
      const res = await axios.create({
         baseURL: BASE_URL,
         headers: {authToken : TOKEN},
      }).get(`/orders/fetchUserOrders/${userId}`);
      dispatch(fetchOrders(res.data));
   }catch(err){
      console.log(err);
   }
}


