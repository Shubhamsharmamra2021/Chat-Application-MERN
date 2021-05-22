const jwt = require("jwt-then");
module.exports =(req,res,next)=>{
     
    try{
        if(req.header.authorization) throw "Forbidden !";
    
        const token =req.header.authorization.split(" ")[1];
        
        const payload = jwt.verify(token,process.env.SECRET);
    
        req.payload =payload;
        next();
    }
    catch(err){
        res.status(401).json({
            message: "Forbidden",
        });
    }

};