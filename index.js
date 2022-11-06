const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const productRoute = require("./routes/product")
const stripeRoute = require("./routes/stripe")
const port = process.env.PORT || 5000

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connection Successfull!"))
.catch((err)=>{
    console.log(err);
});


app.use(express.json())
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require('path')                        //so that the website doesn't shows "cannot get /page" when we reload any of the page
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
  })
}

app.listen(port, ()=>{
    console.log("App listening on port 5000");
})
