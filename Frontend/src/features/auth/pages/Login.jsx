import React, { useState } from 'react'
import '../auth.form.css'
import { Link,useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/');
    }

    if(loading) {
        return (<main className='loading-screen'><h1>Loading...</h1></main>)
    }

  return (
    <main className='auth-main'>
        <div className='form-container'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name="email" placeholder='Enter your Email Address' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" name="password" placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <button className='button primary-button'>Login</button>
            </form>

            <p>Don't have an Account <Link to={'/register'}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login