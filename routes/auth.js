const express = require('express');
const router = express.Router();
const User = require('../models/User')
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken");
const Cart = require('../models/Cart');

//REGISTER: 
router.post("/register", async (req, res) => {
    const { username, email, password, } = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJs.AES.encrypt(password, process.env.PASS_SEC).toString()
    });

    try {
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser)  // 200: Successfull
                                         //201: Successfully added
        
        const data={                  //For generating the authToken
            id : savedUser._id,
            isAdmin : savedUser.isAdmin
        }
        const authToken = jwt.sign(data, process.env.JWT_SEC, {expiresIn:"3d"});
                                                                 //AuthToken will expire in 3days. After 3 days the user will have to login again.  

        //create the cart:  (We are creating the cart when the user registers. Initialising it with empty products)
        const cart_data = {userId: data.id ,products:[], cart_quantity:0, total_amt: 0}
        const newCart = new Cart(cart_data);
        const savedCart = await newCart.save();
        return res.status(200).json({FindUser: savedUser, authToken, cart: savedCart}); //Sending user data and authToken in response.                                 
    } catch (err) {
        res.status(500).json(err);
    }
}
)

//LOGIN : 
router.post("/login", async(req, res) => {
    try{
    const {email, password} = req.body;
    const FindUser = await User.findOne({email : email})
    if(!FindUser){
        return res.status(401).json("Wrong Credentials");
    }
    
    const hashedPassword = CryptoJs.AES.decrypt(FindUser.password, process.env.PASS_SEC);
    const CorrectPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if(password !== CorrectPassword){
        return res.status(401).json("Wrong Credentials");   
    }
    
    const data={
        id : FindUser._id,
        isAdmin : FindUser.isAdmin
    }
    const authToken = jwt.sign(data, process.env.JWT_SEC, {expiresIn:"3d"});
                                                             //AuthToken will expire in 3days. After 3 days the user will have to login again.  

    //Fetch the cart: 
    const cart = await Cart.findOne({userId: data.id});
    if(cart){             
        return res.status(200).json({FindUser, authToken, cart});
    }
    else{
        return res.status(400).json("cart not found");  
    }                                                             
    
}catch(err){
    res.status(500).json(err);
}

})

module.exports = router