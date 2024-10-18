import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { userContext } from '../context/userContext';
import axios from 'axios';

const Form = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [gameErrors, setGameErrors] = useState({})
    const [game, setGame] = useState({
        name: '',
        genre: '',
        time_to_beat: '',
        isUnderHour: false,
        isEndless: false,
        isCompleted: false

    })
    
    const changeHandler = e => {
        const {name, value} = e.target
        setGame(prev => ({...prev, [name] : value}))
        console.log('CHANGE NAME:', name)
        console.log('CHANGE VALUE:', value)
    }

    const submitHandler = e => {
        e.preventDefault()
        const newGame = {...game, userId: user._id }
        axios.post('http://localhost:8004/api/games/add', newGame, {withCredentials: true})
            .then(() => navigate('/games'))
            .catch(err => {setGameErrors(err.response.data.validationErrors)
                console.log(err.response.data.validationErrors)
            })
    }
    console.log(user)


    return (
        <div className='form-card'>
            <h1>Add a Game</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Game Name
                    <input 
                        type="text" 
                        name='name' 
                        value={game.name}
                        onChange={changeHandler} 
                        />
                </label>
                <p className='errorMessage'>{gameErrors.name}</p>
                <label>
                    Game Genre
                    <input 
                        type="text" 
                        name='genre' 
                        value={game.genre}
                        onChange={changeHandler} 
                        />
                </label>
                <p className='errorMessage'>{gameErrors.genre}</p>
                <label>
                    How Long to Complete?
                    <input 
                        type="number" 
                        name="time_to_beat" 
                        value={game.time_to_beat}
                        onChange={changeHandler} 
                        />
                </label>
                <p className='errorMessage'>{gameErrors.time_to_beat}</p>
                <label>
                    Have you completed this game?
                    <input 
                        type="checkbox" 
                        name="isCompleted" 
                        value={true}
                        onChange={() => {setGame( prev => ({...prev, isCompleted: !game.isCompleted}))}}
                        checked={game.isCompleted}
                        />
                </label>
                <p className='errorMessage'>{game.isCompleted}</p>
                <label>
                    Is this game under an hour long?
                    <input 
                        type="checkbox" 
                        name="isUnderHour" 
                        value={true}
                        onChange={() => {setGame( prev => ({...prev, isUnderHour: !game.isUnderHour}))}}
                        checked={game.isUnderHour} 
                        />
                </label>
                <p className='errorMessage'>{game.isUnderHour}</p>
                <label>
                    Is this game Endless?
                    <input 
                        type="checkbox" 
                        name="isEndless" 
                        value={true}
                        onChange={() => {setGame( prev => ({...prev, isEndless: !game.isEndless}))}}
                        checked={game.isEndless} 
                        />
                </label>
                <p className='errorMessage'>{game.isEndless}</p>
                <input type="submit" value="Submit" />
            </form>
        </div>
)}

export default Form;