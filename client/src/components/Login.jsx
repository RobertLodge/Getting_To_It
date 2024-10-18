import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {userContext} from '../context/userContext'
import axios from 'axios';


const Login = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [userErrors, setUserErrors] = useState({})
    
    const changeHandler = e => {
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8004/api/user/login',userData, {withCredentials: true})
            .then( res => {
                setUser(res.data)
                navigate('/games')
            })
            .catch(error => {
                setUserErrors(error.response.data.message)
            
            })
    }

    return (
        <div className='form-card'>
            <form onSubmit={submitHandler}>
            <h1>Login</h1>
                <label>
                    Email
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                </label>
                <p>{userErrors.email}</p>
                <label>
                    Password
                    <input 
                        type="password" 
                        name="password"
                        value={userData.password}
                        onChange={changeHandler}
                    />
                </label>
                <p>{userErrors.password}</p>
                <input type="submit" value="Login" />
            </form>
            <Link to={'/user/create_acc'}>Create Account</Link>
        </div>
)}

export default Login;