const express = require("express");
const router = express.Router();
const CryptoJs = require("crypto-js")
const User = require("../models/User")
const verifyToken = require("../middleware/verifyToken");


//Update user data.
router.put("/updateUser/:id", verifyToken, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){  //If the user sending the request is same as the user whose data he wants to update or if he is an admin then only operation will be allowed.
      if(req.body.password){                //If password is passsed in the request i.e user wants to update his password then encrypt that passsword
          req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
      }
      try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true });  //Find and update the user. 
        return res.status(200).json(updatedUser);
      }catch(err){
          res.json(err);
      }
    }
})

//Delete a user.
router.delete("/deleteUser/:id", verifyToken, async(req, res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.user.id);
            return res.status(200).json("Successfull deletion");
        }catch(err){
            return res.status(400).json(err);
        }

    }
})

// Fetching user data.
router.get("/fetchUser/:id", verifyToken, async(req,res) => {    //The user whose data we want to see .. his id is passed in the url.
    if(req.user.isAdmin){                                        //Only admin can see any user's data.
     try{
        const user = await User.findById(req.params.id);
        if(user){
            const{password, ...other} = user._doc;    //destructuring user._doc to get password and other properties. We don't want to show password. 
            return res.status(200).json(other);       //So we will send other in response.
        }
        else{
            return res.status(400).json("User not found");  
        }
     }catch(err){
        return res.status(400).json(err);
     }
    }
    else{
        return res.status(200).json("Not Allowed");
    }
})

// Fetch all the users.
router.get("/fetchAllUsers", verifyToken, async(req,res) => {    //The user whose data we want to see .. his id is passed in the url.
    if(req.user.isAdmin){                                        //Only admin can see any user's data.
    try{
        const query = req.query.new;       //We can also pass query in the request url . Like localhost:5000/api/users/fetchAllUsers?new=true    . Here ?new=true is a query
        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find();    //We can use query to get latest 5 entries. sort({_id : -1}) . This will give latest 5. Otherwise it will give oldest 5.        // const users = await User.find();
                                                                                                  //If query is present then it will give the mentioned data else will give the whole data.        
        if(users){
            
            return res.status(200).json(users);  
        }
        else{
            
            return res.status(400).json("No users present");  
        }
     }catch(err){
        return res.status(400).json(err);
     }
    }
    else{
        return res.status(200).json("Not Allowed");
    }
})

//Get user stats  : Total number of users registered in the past year accoring to the month. 
router.get("/userStats", verifyToken, async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const date= new Date();
            const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));   //This will give the last year from the present date.

            const data = await User.aggregate([                    //This will aggregate the users based on the condition which we will provide .
                { $match: { createdAt: { $gte: lastYear}}},        // users whose createdAt date is greater than last year.
                {
                  $project: {
                      month: { $month: "$createdAt" },             //Take month no. from the createdAt date.
                  },
                },
                {
                    $group: {
                        _id: "$month",                              // Id will be month
                        total: { $sum: 1},                          //Add the number of users in a particular month.
                    },
                }
            ]);
            return res.status(200).json(data) ;
        }catch(err){
            return res.status(500).json(err);
        }
    }
})

module.exports = router;