const mongoose =require("mongoose");
const messageSchema =new mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectID,
        required : 'chatroom is required !',
        ref: "chatroom",
    },
    user:{
        type: mongoose.Schema.Types.ObjectID,
        required : 'chatroom is required !',
        ref: "user",
    },
    message:{
        type: String,
        required : "Message is required !"
    },
    
});

module.exports = mongoose.model("Message", messageSchema);