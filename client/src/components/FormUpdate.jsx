import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/userContext';
import axios from 'axios';

const FormUpdate = (props) => {
    const { user, setUser } = useContext(userContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [gameErrors, setGameErrors] = useState({})
    const [game, setGame] = useState({
        name: '',
        genre: '',
        time_to_beat: '',
        isUnderHour: false,
        isEndless: false,
        isCompleted: false,
        userId : ''
    })

    useEffect(() => {
        axios.get(`http://localhost:8004/api/games/${id}`, { withCredentials: true })
            .then(res => setGame(res.data))
    }, [])

    const changeHandler = e => {
        const { name, value } = e.target
        setGame(prev => ({ ...prev, [name]: value }))
        console.log('CHANGE NAME:', name)
        console.log('CHANGE VALUE:', value)
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log('GAME DATA UPDATED:', game)
        axios.put(`http://localhost:8004/api/games/${game._id}`, game, { withCredentials: true })
            .then(() => navigate('/games'))
            .catch(err => {
                setGameErrors(err.response.data.validationErrors)
                console.log(err.response.data.validationErrors)
            })
    }
    console.log(user)


    return (
        <div className='form-card'>
            <div>
                <h1>Update Game</h1>
                <div>
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
                                onChange={() => { setGame(prev => ({ ...prev, isCompleted: !game.isCompleted })) }}
                                checked={game.isCompleted}
                            />
                        </label>
                        <p className='errorMessage'>{game.isCompleted}</p>
                        <label>
                            Is this game under an hour long?
                            <input
                                type="checkbox"
                                name="isUnderHour"
                                onChange={() => { setGame(prev => ({ ...prev, isUnderHour: !game.isUnderHour })) }}
                                checked={game.isUnderHour}
                            />
                        </label>
                        <p className='errorMessage'>{game.isUnderHour}</p>
                        <label>
                            Is this game Endless?
                            <input
                                type="checkbox"
                                name="isEndless"
                                onChange={() => { setGame(prev => ({ ...prev, isEndless: !game.isEndless })) }}
                                checked={game.isEndless}
                            />
                        </label>
                        <p className='errorMessage'>{game.isEndless}</p>
                        <input className='form-card button' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormUpdate;