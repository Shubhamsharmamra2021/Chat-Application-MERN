import React from 'react'
  const Chatroompage = ({match,socket}) => {
    const chatroomId = match.params.id;
    const [messages,setMessages] =React.useState([]);
    const messageRef = React.userRef();
    const [userId, setUserId] = React.userState("");

    const sendMessage =() =>{
        if(socket){
            socket.emit("chatroomMessage",{
                chatroomId,
                message:messageRef.current.value,
            })

           messageRef.current.value =""; 
        }
    }

    React.useEffect(()=>{
        const token = localStorage.getItem("CC_Token");
        if(token){
            const payload =JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id)
        }
        if(socket){
            socket.on("newMessage",(message)=>{
              const  newMessages=([...messages, message]);
            setMessages(newMessages);

            });
        }
    })


   React.useEffect(()=>{
       if(socket){
       socket.emit("joinRoom", {
           chatroomId,
       });
    }

      

       return()=>{
           if(socket){
           socket.emit("leaveRoom",{
              chatroomId,
           });
        }
       };
   })


    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader"> chatroom name</div>
                <div className="chatroomContent">
                    {messages.map((message)=>(
                    <div key={chatroomId} className="message">
                        <span className={userId===message.userId ? "ownMessage":"otherMessage"}>{message.name} :</span> {message.message}
                    </div>
                    ))};
                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" name="message" placeholder="Say something !" ref={messageRef}/>
                     </div>
                     <div>
                         <button className="join" onClick={sendMessage}>Send</button>
                     </div>
                </div>
            </div>
         </div>
    )
}
 
export default Chatroompage;
 