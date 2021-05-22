const mongoose= require('mongoose');
const User =mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register =async (req, res)=>{
    const{name, email, password} =req.body;

    const emailRegex =/[@gmail.com|@yahoo.com]+$/;

    if(!emailRegex.test(email)) throw "Email is not supported from your domain.";
    if(password.length < 6) throw "password at least 6 character long.";
    
    const userExists = await User.findOne({
        email,
     });

    if(userExists) throw "User with same email already exists.";

    const user = new User({
        name,
        email,
        password: sha256(password + process.env.SALT),
    });

    await user.save();

    res.json({
        message :"user[" + name +"] registered sucessfully !"
    });

};

exports.login =async (req, res)=>{
    const{email,password}=req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    if (!user) throw"Email and Password did not match.";

    const token = await jwt.sign({id:user.id}, process.env.SECRET);

    res.json({
        message:"user logged in successful !",
        token,
    });
};