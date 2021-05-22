const mongoose = require("mongoose");
const Chatroom =mongoose.model("Chatroom");

exports.createchatroom =async(req,res) =>{
   const{ name } = req.body;

   const nameRegex = /[A-Za-z\s]+$/;

   if(!nameRegex.test(name)) throw "Chatroom name can contain alphabets.";

    const chatroomExists = await Chatroom.findOne({
        name
     });

    if(chatroomExists) throw "Chatroom with that name "

   const chatroom =new Chatroom({
       name,
   });

    await chatroom.save();

    res.json({
        message: "Chatroom created",
    });
}; 

exports.getAllchatrooms = async (req, res) =>{
    const chatrooms =await Chatroom.find({});

    res.json(chatrooms);
}