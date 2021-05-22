import React from 'react'
import axios from "axios"
import { Link, withRouter } from "react-router-dom";

 

const Dashboardpage = (props) => {
    const [chatrooms, setChatrooms] =React.useState([]); 

    const getChatrooms = ()=>{
       axios.get("http://localhost:5000/chatroom",{
           headers:{
               Authorization: "Bearer" + localStorage.getItem("CC_Token"),
           },
       })
       .then((response)=>{
           setChatrooms(response.data);
       })
       .catch((err) => {
          setTimeout(getChatrooms, 3000);
       });
    };


    React.useEffect(()=>{
        getChatrooms();
    }, []);


    return (
        <div className="card">
        <div className="cardHolder">CHATROOM</div>
        <div className="cardBody">
            <div className="inputGroup">
                <lable htmlFor="Chatroom">Chatroom Name</lable>
                <input
                    type="text"
                    name="Chatroom"
                    id="Chatroom"
                    placeholder="Enter chatroom name"
                />    
            </div>
            <button> Creat Chatroom</button>
            <div className="chatrooms">
                {chatrooms.map((chatroom)=>(

                <div key={chatroom._id} className="chatroom">
                    <div>{chatroom.name}</div>
                    <Link to={"/chatroom/" + chatroom._id}>
                    <div className="join">Join</div>
                    </Link>
                </div>
                 


                ))}
                
            </div>
        </div>
    </div>       
    )
}
 
export default withRouter(Dashboardpage) ;
