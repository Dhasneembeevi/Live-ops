import React from 'react'
import { useState } from 'react';
import  { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
function Login() {

        const [info, loginInfo]=useState({email:"", password:""});
        const [alert, setAlert]= useState('')
        const navigate = useNavigate()

       const loginUser= async ()=>{
           // event.preventDefault();
            const formdata = new FormData();
            formdata.append("email", info.email)
            formdata.append("password", info.password)
    
            const response = await fetch("http://localhost:5000/api/login",{
                method: 'POST',
                body: formdata
            })
    
            const data = await response.json()
            console.log(data)
            if(data.status === "failure"){
                setAlert(<div> User doesn't exists </div>)
            }
            else if(data.status === "failed"){
                setAlert(<div>Please check your Name and Password</div>)
            }
            else{
                navigate('/offers')
                setAlert(<div>User logged successfully</div>)
            }
        }
      return (
        <div>
        <Navbar/>
        <h1>Login</h1>
        <form >
        
        <br/>
        <input type="email" value={info.email} placeholder="Email.. " onChange={(e)=>{
            loginInfo({...info, email: e.target.value})
        }}/>
        <br/>
        <input type="password" value={info.password} placeholder="password.." onChange={(e)=>{
            loginInfo({...info, password: e.target.value})
        }}/>
        <br/> 
        <Link to="/offers"> <button onClick={loginUser}> LOGIN </button>

        </Link>
      

       {alert}
       <p>or</p>
      
       <Link to='/register'>
      
       <h3><button> REGISTER </button></h3> </Link>
       <h4>Don't have an Account? </h4>
        </form>
          
        
    
    </div>
  )
}

export default Login
