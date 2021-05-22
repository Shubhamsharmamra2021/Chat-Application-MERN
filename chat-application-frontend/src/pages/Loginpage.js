import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { withRouter } from 'react-router';

const Loginpage = (props) => {
    const emailRef =React.createRef();
    const passwordRef =React.createRef();


const loginUser= () => {
     const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
    .post("http://localhost:5000/user/login", {
        email,
        password
    })
    .then((response)=>{
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token",response.data.token);
        props.history.push("/dashboard");
        props.seuptSocket();
    })
    .catch((err) =>{
        //console.log(err);
        if(
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
        )
         makeToast("success", err.response.data.message);
    })
}
    return (
        <div className="card">
            <div className="cardHolder">login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <lable htmlFor="email">Email</lable>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="abc@example.com"
                        ref={emailRef}
                    />    
                </div>
                <div className="inputGroup">
                    <lable htmlFor="password">Password</lable>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="your password"
                        ref={passwordRef}
                    />    
                </div>
                <button onClick={loginUser}>Login</button>
            </div>
        </div>       
    )
}

 
export default withRouter(Loginpage);
