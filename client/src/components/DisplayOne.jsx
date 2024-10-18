import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { userContext } from '../context/userContext';

const DisplayOne = (props) => {
    const {id} = useParams()
    const {game, setGame} = useContext(userContext)
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
            .then(res => setGame(res.data))
            .catch(err => console.log(err))
    },[id])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
        .then((res) => console.log(res.data))
        navigate('/games')
    }

    return (
        <div>
            <div className='form-card'>
            <h2>{game.name}</h2>
            
            <p>Genre: {game.genre}</p>
            <p>Time to Complete: {game.time_to_beat}</p>
                {
                    game.isCompleted ?
                    <p className="gComplete">Game is Completed</p> :
                    null
                }
                {
                    game.isUnderHour ?
                    <p className="gUnderHour">Game is Under One Hour</p> : null
                }
                {
                    game.isEndless ?
                    <p className="gEndless">Game is Endless</p> : null
                }
            </div>
            <div>
            < button onClick={() => deleteHandler(game._id)}>Remove Game</button>
            </div>
        </div>
)}

export default DisplayOne;