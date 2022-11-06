const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
 const token = req.header('authToken');
 console.log(token);
 if(!token){
     return res.status(401).json("Token not available");
 }
 try{
  const data= jwt.verify(token, process.env.JWT_SEC);   //data will be an object : {
                                                        //                            id: '61b98adb8b7435d9cd2c3bb2',
                                                        //                           isAdmin: false,
                                                        //                           iat: 1639588647,
                                                        //                           exp: 1639847847  }


  req.user = data;                  //Passing data in req as user
  next();
 }catch(err){
     res.json("Some error occured");
 }
}

module.exports = verifyToken;

/* verifyToken is a middleware which will verify the authToken and will extract the userID from the authToken 
and will append this ID to the req */
