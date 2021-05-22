import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import DashboardPage from "./pages/Dashboardpage";
import indexPage from "./pages/indexPage";
import ChatroomPage from "./pages/Chatroompage"; 
import io from "socket.io-client"
import makeToast from './Toaster';
 

function App () {
  const [socket, setSocket] = React.useState(null);
  const setupSocket =() =>{
    const token = localStorage.getItem("CC_Token");
    if(token.length > 0 && !socket){
      const newSocket =io("http://localhost:5000", {
        query: {
            token: localStorage.getItem("CC_Token"),
        },
    });

    newSocket.on("disconnect", ()=>{
      setSocket(null);
      setTimeout(setupSocket, 5000);
      makeToast("error","Socket Disconnected!");
    });
    newSocket.on("connect", ()=>{
      makeToast("success","Socket connected!");
    });
    setSocket(newSocket);
    }
  }

  React.useEffect(()=>{
    setupSocket();
  },[]);

  return  (
    <BrowserRouter>
  <Switch>
    <Route path="/" component={indexPage}  exact /> 
    <Route path="/login" render ={()=><LoginPage setupSocket={setupSocket}/>} exact /> 
    <Route path="/register" component={RegisterPage} exact /> 
    <Route path="/dashboard" render ={()=><DashboardPage setupSocket={setSocket}/>} exact /> 
    <Route path="/chatroom/:Id"  render ={()=><ChatroomPage setupSocket={setSocket}/>} exact /> 

  </Switch>
  </BrowserRouter>)
}
 
export default App;