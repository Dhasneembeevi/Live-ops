import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function Register() {
    const [info, registerInfo] = useState({ email: "", password: "", name: "", age: '' });
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()
    const registerUser = async (event) => {

        if (info.name.length === 0) {
            setAlert(<div> * Please enter your Name</div>)
        }
        else if (info.password.length < 7) {
            setAlert(<div> * Password must be minimum of 7 characters ..!</div>)
        }
        else {
            // event.preventDefault();
            const formdata = new FormData();
            formdata.append("username", info.name)
            formdata.append("email", info.email)
            formdata.append("password", info.password)
            formdata.append("age", info.age)
            const response = await fetch("http://localhost:5000/api/register", {
                method: 'POST',
                body: formdata

            })

            const data = await response.json()
            console.log(data)
            if (data.status === 'failure') {
                setAlert(<div> User already exists </div>)
            }
            else{
                navigate('/offers')
            }
            navigate('/')
        
        }
    }
    return (
        <div>
            <Navbar />
            <h1>Register..</h1>
            <form >
            <label htmlFor="name">Username : </label>
            <input type="text" value={info.name} name="name" placeholder="Name.. " onChange={(e) => {
                registerInfo({ ...info, name: e.target.value })
            }} />
                <br />
                <label htmlFor='age'> Age: </label>
                <input type="number" name='age' value={info.age} placeholder="AGE.." onChange={(e) => {
                    registerInfo({ ...info, age: e.target.value })
                }} />
                <br/>
                <label htmlFor='email'> Email: </label>
                <input type="email" name='email' value={info.email} placeholder="Email.. " onChange={(e) => {
                    registerInfo({ ...info, email: e.target.value })
                }} />
                <br />
                <label htmlFor='password'> Password: </label>
                <input type="password" name='password' value={info.password} placeholder="password.." onChange={(e) => {
                    registerInfo({ ...info, password: e.target.value })
                }} />
                <br />
              
                <button onClick={registerUser}> Register </button>
        
               

                {alert}
                <p>or</p>

                <Link to='/login'>

                    <h3><button> LOGIN </button></h3> </Link>
                <h4>Already have an account? Login Here..!</h4>
            </form>



        </div>
    )
}
export default Register
