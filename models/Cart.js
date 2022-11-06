const mongoose = require("mongoose");
const {Schema} = mongoose;

const CartSchema = new Schema({
    userId : {
        type: String,
        required: true,
    },
    products : [         //products will be containing many different products
        {
         
        }
    ],
    cart_quantity :{
      type: Number
    },
    total_amt: {
      type: Number
    }

}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("Cart", CartSchema)
