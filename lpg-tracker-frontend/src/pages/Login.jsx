import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({setIsLoggedIn}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        //console.log("Login form submitted:", {email, password});

        try{
            const response = await axios.post('http://localhost:5000/api/user/login',{
                email,
                password
            });
            console.log('Login Succssful: ', response.data);
            alert(response.data.message);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('isLoggedIn' , 'true');
            setIsLoggedIn(true);
            navigate('/dashboard');
        }
        catch(error){
            console.error('Login Failed', error.response?.data?.message||error.message);
            alert(error.response?.data?.message||"Login failed. Check Console");
        }


        // Need to send this to backend using axios

    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Email">Email:</label><br />
                <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                 />
            </div>
            <br />
            <div>
                <label >Password: </label><br />
                <input type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>
            <br />
            <button type='submit'>
                Login
            </button>
        </form>
    </div>
  )
}
