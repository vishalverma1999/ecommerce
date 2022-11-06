const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    title : {
        type: String,
        required: true,
        unique: true,
    },
    description : {
        type: String,
        required: true,        
    },
    img: {
        type: String,
        required: true
    },
    categories : {
        type: Array,  // There can be more than one category for an item.        
    },
    size : {
        type: Array,   //There can be more than one size for one product.
    },
    color : {
        type: Array,     //There can be more than one color for one product.
    },
    price : {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("Product", ProductSchema)
