import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/userContext';

const Home = (props) => {
    const { user, setUser, allGames, setAllGames } = useContext(userContext);
    const [timeFilter, setTimeFilter] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8004/api/games', { withCredentials: true })
            .then(res => {
                const sortedGames = res.data.sort((a, b) => parseFloat(a.time_to_beat) - parseFloat(b.time_to_beat));
                setAllGames(sortedGames);
            })
            .catch(err => console.log(err));
    }, []);

    const userGames = allGames.filter(game => game.userId._id === user._id);
    const nonCompletedGames = userGames.filter(game => !game.isCompleted);

    const filteredGames = nonCompletedGames.filter(game => {
        if (!timeFilter) return true;
        const timeToBeat = parseFloat(game.time_to_beat);

        if (timeFilter === "Games <5hr") return timeToBeat < 5;
        if (timeFilter === "Games 5-10hr") return timeToBeat >= 5 && timeToBeat <= 10;
        if (timeFilter === "Games 10-15hr") return timeToBeat >= 10 && timeToBeat <= 15;
        if (timeFilter === "Games 15-20hr") return timeToBeat >= 15 && timeToBeat <= 20;
        if (timeFilter === "Games 20-25hr") return timeToBeat >= 20 && timeToBeat <= 25;
        if (timeFilter === "Games 25-30hr") return timeToBeat >= 25 && timeToBeat <= 30;
        if (timeFilter === "Games 30-35hr") return timeToBeat >= 30 && timeToBeat <= 35;
        if (timeFilter === "Games 35-40hr") return timeToBeat >= 35 && timeToBeat <= 40;
        if (timeFilter === "Games 40-45hr") return timeToBeat >= 40 && timeToBeat <= 45;
        if (timeFilter === "Games 45-50hr") return timeToBeat >= 45 && timeToBeat <= 50;
        if (timeFilter === "Games >50hr") return timeToBeat >= 50;
        return true;
    });

    const completedGames = userGames.filter(game => game.isCompleted);

    const gameCounts = {
        "Games <5hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) < 5).length,
        "Games 5-10hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 5 && parseFloat(game.time_to_beat) <= 10).length,
        "Games 10-15hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 10 && parseFloat(game.time_to_beat) <= 15).length,
        "Games 15-20hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 15 && parseFloat(game.time_to_beat) <= 20).length,
        "Games 20-25hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 20 && parseFloat(game.time_to_beat) <= 25).length,
        "Games 25-30hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 25 && parseFloat(game.time_to_beat) <= 30).length,
        "Games 30-35hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 30 && parseFloat(game.time_to_beat) <= 35).length,
        "Games 35-40hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 35 && parseFloat(game.time_to_beat) <= 40).length,
        "Games 40-45hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 40 && parseFloat(game.time_to_beat) <= 45).length,
        "Games 45-50hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) >= 45 && parseFloat(game.time_to_beat) <= 50).length,
        "Games >50hr": nonCompletedGames.filter(game => parseFloat(game.time_to_beat) > 50).length,
    };

    const changeHandler = (e) => {
        setTimeFilter(e.target.value);
    };

    return (
        <div className='content'>
            <select name='time' value={timeFilter} onChange={changeHandler}>
                <option value="">Select Completion Time</option>
                <option value="Games <5hr">Games Under 5hr ({gameCounts["Games <5hr"]})</option>
                <option value="Games 5-10hr">Games 5-10hr ({gameCounts["Games 5-10hr"]})</option>
                <option value="Games 10-15hr">Games 10-15hr ({gameCounts["Games 10-15hr"]})</option>
                <option value="Games 15-20hr">Games 15-20hr ({gameCounts["Games 15-20hr"]})</option>
                <option value="Games 20-25hr">Games 20-25hr ({gameCounts["Games 20-25hr"]})</option>
                <option value="Games 25-30hr">Games 25-30hr ({gameCounts["Games 25-30hr"]})</option>
                <option value="Games 30-35hr">Games 30-35hr ({gameCounts["Games 30-35hr"]})</option>
                <option value="Games 35-40hr">Games 35-40hr ({gameCounts["Games 35-40hr"]})</option>
                <option value="Games 40-45hr">Games 40-45hr ({gameCounts["Games 40-45hr"]})</option>
                <option value="Games 45-50hr">Games 45-50hr ({gameCounts["Games 45-50hr"]})</option>
                <option value="Games >50hr">Games Over 50hr ({gameCounts["Games >50hr"]})</option>
            </select>

            <h2>Games on Backlog</h2>
            <table>
                <thead>
                    <tr>
                        <td>Game Name</td>
                        <td>Genre</td>
                        <td>Completion Time</td>
                        <td>Is Under an Hour</td>
                        <td>Is Endless</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredGames.map(game => (
                            <tr key={game._id}>
                                <td><Link to={`/games/${game._id}`} state={'details'}>{game.name}</Link></td>
                                <td>{game.genre}</td>
                                <td>{game.time_to_beat}</td>
                                <td>{game.isUnderHour ? 'Yes' : ''}</td>
                                <td>{game.isEndless ? 'Yes' : ''}</td>
                                <td>
                                    <Link to={`/games/${game._id}/update`} pathname={'update'}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Completed Games</h2>
            <table>
                <thead>
                    <tr>
                        <td>Game Name</td>
                        <td>Genre</td>
                        <td>Completion Time</td>
                        <td>Is Under an Hour</td>
                        <td>Is Endless</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        completedGames.map(game => (
                            <tr key={game._id}>
                                <td><Link to={`/games/${game._id}`} state={'details'} className='completedLink'>{game.name}</Link></td>
                                <td>{game.genre}</td>
                                <td>{game.time_to_beat}</td>
                                <td>{game.isUnderHour ? 'Yes' : ''}</td>
                                <td>{game.isEndless ? 'Yes' : ''}</td>
                                <td>
                                    <Link to={`/games/${game._id}/update`} pathname={'update'}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Home;
