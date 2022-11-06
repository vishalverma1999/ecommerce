const express = require('express');
const router = express.Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")("sk_test_51K7IaVSJ7mZ97jfFZdhAAF85NQzxs0HQxuSq6AX2oXzlmqr7tAw8WR5kSPAVNxDlPKnBjcYThqSQomNGAQpaiVAm004MT6ymWJ");
                                                      //SECRET KEY
router.post("/payment", (req,res)=>{
    console.log(req.body);
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'inr'
    },
    (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
            
        }else{
            res.status(200).json(stripeRes);
            console.log("stripeRes")
        }
    }
    )
})

module.exports = router;