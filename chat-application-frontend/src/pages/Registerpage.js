import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';


const Registerpage = (props) => {
    const nameRef =React.createRef();
    const emailRef =React.createRef();
    const passwordRef =React.createRef();


const RegisterUser= (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
    .post("http://localhost:5000/user/register", {
        name,
        email,
        password
    })
    .then((response)=>{
        console.log(response.data);
        makeToast("success", response.data.message);
        props.history.push("/login");
    })
    .catch((err) =>{
        console.log(err);
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
        <div className="cardHolder">Register</div>
        <div className="cardBody">
        <div className="inputGroup">
                <lable htmlFor="name">name</lable>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="your name"
                    ref={nameRef}
                />    
            </div>
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
            <button onClick={RegisterUser} >Register</button>
        </div>
    </div>       
    )
}

 
export default Registerpage;
