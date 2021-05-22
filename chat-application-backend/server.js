require("dotenv").config();


//connection mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology: true,
    useNewUrlParser : true,
});

mongoose.connection.on("error", (err) =>{
    console.log("Mongoose Connection ERROR: "+ err.message)
});

mongoose.connection.once('open',()=>{
    console.log("Mongoose Connection Succesful !")

})


//bringing in the models
require("./model/user");
require("./model/chatroom");
require("./model/message");


// server listen
const app =require('./app.js');
const server =app.listen(5000,()=>{
   console.log(`Server listening on port ${5000}`);
});

const io =require("socket.io")(server);
const jwt = require("jwt-then");

io.use(async(socket,next)=>{
    try{
        console.log("welcome");         

        const token = socket.handshake.query.token; 
        
        const payload = await jwt.verify(token, process.env.SECRET);
    
        socket.userId =payload.id;
        next();
    }
    catch(err){
    console.log("welcome");         
    }

});

io.on('connection',(socket)=>{
    console.log("Connected:" + socket.userId);
    socket.on('disconnect',()=>{
        console.log("Disconnected: " + socket.userId);
    })
})