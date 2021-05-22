import React from 'react'
 
const Chatroompage = ({match,socket}) => {
  //  const chatroomId = match.params.Id;
   
    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader"> chatroom name</div>
                <div className="chatroomContent">
                    <div className="message">
                        <span className="otherMessage">Kit :</span> Hello Guys
                    </div>
                    <div className="message">
                        <span className="otherMessage">Kit :</span> Hello Guys
                    </div>
                    <div className="message">
                        <span className="ownMessage">Ankit :</span> Hello Guys
                    </div>
                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" name="message" placeholder="Say something !"/>
                     </div>
                     <div>
                         <button className="join">Send</button>
                     </div>
                </div>
            </div>
        </div>
    )
}
 
export default Chatroompage;
 