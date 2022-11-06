const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,     //either true or false.
        default : false    // And false by default.
    },
    img:{
        type: String
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("User", UserSchema)
