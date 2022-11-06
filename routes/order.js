const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const verifyToken = require("../middleware/verifyToken");

// Add a new Order
router.post("/addOrder", verifyToken, async(req, res)=>{
    try{
          const newOrder = new Order(req.body);
          newOrder.userId = req.user.id;
          const savedOrder = await newOrder.save();
          return res.status(200).json(savedOrder);
      }catch(err){
          return res.status(500).json(err);
      }
    })

//Update the order
router.put("/updateCart/:id", verifyToken, async(req,res)=>{
    if(req.user.isAdmin){                   //Only Admin can update order.    
      try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true });  //Find and update the Product. 
        return res.status(200).json(updatedOrder);
      }catch(err){
          res.json(err);
      }
    }
    else{
        return res.status(403).json("Not Allowed");
    }
})

//Delete an order.
router.delete("/deleteOrder/:id", verifyToken, async(req, res)=>{
    if(req.user.isAdmin){           //Only admin can delete an order.
        try{
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);
            return res.status(200).json("Successfull deletion");
        }catch(err){
            return res.status(400).json(err);
        }
    }
    else{
        return res.status(403).json("Not Allowed");
    }
})

// Fetching User Orders .
router.get("/fetchUserOrders/:userId", verifyToken, async(req,res) => {     
    if(req.user.id === req.params.userId){
     try{
        const orders = await Order.find({userId: req.params.userId});       //One user can have more than one orders. So find() .. not findOne()
        if(orders){             
            return res.status(200).json(orders);       
        }
        else{
            return res.status(400).json("No orders found");  
        }
     }catch(err){
        return res.status(400).json(err);
     }
    }
    else{
        return res.status(403).json("Not Allowed");
    }
})

// Fetch all the orders.
router.get("/fetchAllOrders", verifyToken ,async(req,res) => {    
    if(req.user.isAdmin){                //Only admin can fetch all the orders.
    try{
        const orders = await Order.find();                                                                                        
        if(orders){
            return res.status(200).json(orders);  
        }
        else{
            return res.status(400).json("No orders present");  
        }
     }catch(err){
        return res.status(500).json(err);
     }
    }
    else{
        return res.status(403).json("Not Allowed");
    }
})
 
// Get monthly income(stats)
router.get("/orderStats", verifyToken, async(req,res)=>{
    if(req.user.isAdmin){
        try{            
            const productId = req.query.pid;
            const date= new Date();
            const prevMonth = new Date(date.setMonth( date.getMonth() - 1) );   //Prev month 
            const prevToPrevMonth = new Date(date.setMonth( prevMonth.getMonth() - 1));   //Prev to prev Month            
            const income = await Order.aggregate([                    //This will aggregate the orders based on the condition which we will provide .
                { $match: { createdAt: { $gte: prevToPrevMonth}, 
                               ...(productId && {
                                   products: {$elemMatch: { productId }},
                               }),
                            },
                },        // orders whose createdAt date is greater than the prevToPrevMonth.
                {
                  $project: {
                      month: { $month: "$createdAt" },             //Take month no. from the createdAt date.
                      sales :  "$amount",                 
                    },
                },
                {
                    $group: {                        //When we will group them then id will be the month no and total will be the sum of amount of each order.
                        _id: "$month",                              
                        total: { $sum: "$sales"},                   
                    },
                }
            ]);   
            income.sort(function(a, b){return a._id - b._id})     
            return res.status(200).json(income) ;
        }catch(err){
            return res.status(500).json(err);
        }
    }
})


module.exports = router;