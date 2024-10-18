import React, { useContext, useEffect, useRef, useState } from 'react';
import { Wheel } from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.2/dist/spin-wheel-esm.js';
import { userContext } from '../context/userContext';

const Randomizer = () => {
    const { allGames, user } = useContext(userContext);
    const [timeFilter, setTimeFilter] = useState("");
    const [wheelItems, setWheelItems] = useState([]);
    const wheelRef = useRef(null);
    const [wheel, setWheel] = useState(null);
    const [chosenGame, setChosenGame] = useState("");

    useEffect(() => {
        const userGames = allGames.filter(game => game.userId._id === user._id);
        const nonCompletedGames = userGames.filter(game => !game.isCompleted);

        const filteredGames = nonCompletedGames.filter(game => {
            if (!timeFilter) return true; // No filter applied
            const timeToBeat = parseFloat(game.time_to_beat); // Comparing numbers time to beat

            switch (timeFilter) {
                case "Games <5hr": return timeToBeat < 5;
                case "Games 5-10hr": return timeToBeat >= 5 && timeToBeat <= 10;
                case "Games 10-15hr": return timeToBeat >= 10 && timeToBeat <= 15;
                case "Games 15-20hr": return timeToBeat >= 15 && timeToBeat <= 20;
                case "Games 20-25hr": return timeToBeat >= 20 && timeToBeat <= 25;
                case "Games 25-30hr": return timeToBeat >= 25 && timeToBeat <= 30;
                case "Games 30-35hr": return timeToBeat >= 30 && timeToBeat <= 35;
                case "Games 35-40hr": return timeToBeat >= 35 && timeToBeat <= 40;
                case "Games 40-45hr": return timeToBeat >= 40 && timeToBeat <= 45;
                case "Games 45-50hr": return timeToBeat >= 45 && timeToBeat <= 50;
                case "Games >50hr": return timeToBeat > 50;
                default: return true;
            }
        });

        const items = filteredGames.map((game) => ({
            label: game.name,
            value: game._id,
            weight: 3 // Adjust weights if needed
        }));
        setWheelItems(items);

        // Initialize the wheel
        const wheelStart = {
            items: items,
            onSpin: () => console.log("Spinning..."),
            onRest: (event) => {
                const winningItem = items[event.currentIndex];
                setChosenGame(winningItem.label);
            },
        };
        const wheelInstance = new Wheel(wheelRef.current, wheelStart);
        setWheel(wheelInstance);

        // Cleanup on unmount
        return () => wheelInstance.remove();
    }, [allGames, user._id, timeFilter]);

    const spinWheel = () => {
        if (wheel) {
            const targetIndex = Math.floor(Math.random() * wheelItems.length);
            const duration = 8000; // Duration of spin
            wheel.spinToItem(targetIndex, duration, true, 3); // Spins to a random item
        }
    };

    const gameCounts = {
        "Games <5hr": allGames.filter(game => game.time_to_beat < 5 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 5-10hr": allGames.filter(game => game.time_to_beat >= 5 && game.time_to_beat <= 10 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 10-15hr": allGames.filter(game => game.time_to_beat >= 10 && game.time_to_beat <= 15 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 15-20hr": allGames.filter(game => game.time_to_beat >= 15 && game.time_to_beat <= 20 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 20-25hr": allGames.filter(game => game.time_to_beat >= 20 && game.time_to_beat <= 25 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 25-30hr": allGames.filter(game => game.time_to_beat >= 25 && game.time_to_beat <= 30 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 30-35hr": allGames.filter(game => game.time_to_beat >= 30 && game.time_to_beat <= 35 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 35-40hr": allGames.filter(game => game.time_to_beat >= 35 && game.time_to_beat <= 40 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 40-45hr": allGames.filter(game => game.time_to_beat >= 40 && game.time_to_beat <= 45 && game.userId._id === user._id && !game.isCompleted).length,
        "Games 45-50hr": allGames.filter(game => game.time_to_beat >= 45 && game.time_to_beat <= 50 && game.userId._id === user._id && !game.isCompleted).length,
        "Games >50hr": allGames.filter(game => game.time_to_beat > 50 && game.userId._id === user._id && !game.isCompleted).length,
    };

    const changeHandler = (e) => {
        setTimeFilter(e.target.value);
    };

    return (
        <div>
            <h2 className='wheel-title' >Random Game Selector</h2>
            <select className='wheel-select' name='time' value={timeFilter} onChange={changeHandler}>
                <option value="">All of Em Boooiii</option>
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
            <div className='wheel-container'>
                <img src="https://raw.githubusercontent.com/CrazyTim/spin-wheel/819c1c10826ca4a6485a144e4eef19c3415b8ed4/examples/themes/img/example-3-overlay.svg" alt="Wheel Overlay" className="wheel-overlay" />
                <div ref={wheelRef} className='wheel' />
            </div>
                <button className='wheel-button' onClick={spinWheel}>Spin the Wheel!</button>
                {chosenGame && <h2>Game You're Playing Next!: {chosenGame}</h2>}
        </div>
    );
};

export default Randomizer;
