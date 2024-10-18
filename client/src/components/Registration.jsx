import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {userContext} from '../context/userContext'
import axios from 'axios';

const Registration= (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: ""
    })
    const [userErrors, setUserErrors] = useState({})
    
    const changeHandler = e => {
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8004/api/user/register',userData, {withCredentials: true})
            .then( res => {
                setUser(res.data)
                navigate('/games')
            })
            .catch(error => {
                setUserErrors(error.response.data.validationErrors)
            
            })
    }

    return (
        <div className='form-card'>
            <form onSubmit={submitHandler}>
            <h1> Register </h1>
                <label>
                    Email
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                </label>
                <p className='errorMessage'>{userErrors.email}</p>
                <label>
                    Username
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={changeHandler}
                    />
                </label>
                <p className='errorMessage'>{userErrors.username}</p>
                <label>
                    Password
                    <input 
                        type="password" 
                        name="password"
                        value={userData.password}
                        onChange={changeHandler}
                    />
                </label>
                <p className='errorMessage'>{userErrors.password}</p>
                <label>
                    Confirm Password 
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={changeHandler}
                    />
                </label>
                <p className='errorMessage'>{userErrors.confirmPassword}</p>
                <input type="submit" value="Register" />
            </form>
            <Link to={'/'}>Already have an account?</Link>
        </div>
)}

export default Registration;