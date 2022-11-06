const express = require("express");
const router = express.Router();
const CryptoJs = require("crypto-js")
const Product = require("../models/Product")
const verifyToken = require("../middleware/verifyToken");

// Add a new Product
router.post("/addProduct", verifyToken, async(req, res)=>{
    if(req.user.isAdmin){                 //Only admin can add a product
      try{
          const newProduct = new Product(req.body);
          const savedProduct = await newProduct.save();
          return res.status(200).json(savedProduct);
      }catch(err){
          return res.status(500).json(err);
      }
    }
    else{
        return res.status(200).json("Not Allowed");
    }
})

//Update a product 
router.put("/updateProduct/:id", verifyToken, async(req,res)=>{
    if(req.user.isAdmin){  
      try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true });  //Find and update the Product. 
        return res.status(200).json(updatedProduct);
      }catch(err){
          res.json(err);
      }
    }
    else{
        return res.status(403).json("Not Allowed");
    }
})

//Delete a Product.
router.delete("/deleteProduct/:id", verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            const product = await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json("Successfull deletion");
        }catch(err){
            return res.status(400).json(err);
        }

    }
})

// Fetching Product data.
router.get("/fetchProduct/:id", async(req,res) => {     //Anyone (registered user, guest user, admin) can see the product details. So no need of middleware                          
     try{
        const product = await Product.findById(req.params.id);
        if(product){             
            return res.status(200).json(product);       
        }
        else{
            return res.status(400).json("Product not found");  
        }
     }catch(err){
        return res.status(400).json(err);
     }
})

// Fetch all the products.
router.get("/fetchAllProducts", async(req,res) => {    
    try{
        const qNew = req.query.new;
        const qCategory = req.query.category;      
        
        let products; 

        if(qNew){
            products = await Product.find().sort({createdAt : -1}).limit(5);
        }
        else if(qCategory){
            products = await Product.find({ categories : {$in:[qCategory], }, });
        }
        else{
            products = await Product.find();
        }        
                                                                        
        if(products){
            return res.status(200).json(products);  
        }
        else{
            return res.status(400).json("No products present");  
        }
     }catch(err){
        return res.status(400).json(err);
     }
    }
)

module.exports = router;