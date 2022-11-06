//After placing the Order 

const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema({
    userId : {
        type: String,
        required: true,
    },
    products : [         //products will be containing many different products
        { }                
    ],
    amount: {
        type : Number,
        required : true
    },
    address : {
        type : Object,   //Address will be an object (stripe library will be used here) . It will ocnsist of Lane no, Lane name, House No, Area Name, city , ......
        required : true 
    },
    status : {
        type: String ,
        default: "pending"   // When the user will place an order status will be set to pending by default.
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("Order", OrderSchema)
