import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Register() {
    const [values, setValues]=useState(
        {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    );
    const navigate=useNavigate();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidations())
        {
            const {password, confirmPassword, username, email}=values;
            
            const { data } = await axios.post(registerRoute, {
                email,
                username,
                password
            });
                if(data.status===false)
                {
                    toast.error(data.message,toastOptions);
                }
                if(data.status===true){
                    toast.success("User registered successfully", toastOptions);
                    localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                    navigate("/");
                }
        }
      };
      const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const handlechange=(event)=>{
        setValues({...values, [event.target.name]:event.target.value});
    };
    const handleValidations=(event)=>{
    const {password, confirmPassword, username, email}=values;
    if(password!==confirmPassword) {
    
      toast.error("Password and correct password should be same", toastOptions);
      return false;
    }
    else if (username.length<3)
    {
        toast.error("Username should be at least 3 characters long", toastOptions);
      return false;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        toast.error("Invalid email address", toastOptions);
      return false;
    }
    else if (password.length<8)
    {
        toast.error("Password should be at least 8 characters long", toastOptions);
      return false;
    }
    return true;
};
  return (
    <>
        <FormaContainer>
          <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={logo} alt="logo"/>
                    <h1>Chao Chao</h1>

                </div>
                <input type="text"
                placeholder='Username'
                name="username"
                onChange={(e)=>handlechange(e)}
                />
                <input type="email"
                placeholder='Email'
                name="email"
                onChange={(e)=>handlechange(e)}
                />
                <input type="password"
                placeholder='Password'
                name="password"
                onChange={(e)=>handlechange(e)}
                />
                <input type="password"
                placeholder='Confirm Password'
                name="confirmPassword"
                onChange={(e)=>handlechange(e)}
                />
                <button type="submit">Create User</button>
                <span>Already have an account ? <Link to = "/login">Login</Link></span>


          </form>
         
        </FormaContainer>
        <ToastContainer />

    </>


  )
}
const FormaContainer=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap :1rem;
align-items:center;
background-color:#131324;
.brand {
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img {
        height:5rem;
       
    }
    h1 {
        color:#fff;
        text-transform:uppercase;
        font-size:2rem;
    }
}
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
        
            padding:1rem;
            border: 0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:#fff;
            width:100%;
            font-size:1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline:none;
            }
            
        }
        button{
            background-color:#997af0;
            color:#fff;
            padding:1rem 2rem;
            border:0;
            font-weight:bold;
            font-size:1rem;
            text-transform:uppercase;
            border-radius:0.4rem;
            transition: background-color 0.3s ease;
            cursor:pointer;
            &:hover{
                background-color:#664999;
            }
        }
        span{
            color:#fff;
            text-align:center;
            text-transform:uppercase;

            font-size:0.8rem;
            a{
                color:#997af0;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }


`;
export default Register
