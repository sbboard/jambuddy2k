import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { incrementStats, feedPet, restPet } from './store/gameSlice';

export const App = () => {
    const dispatch = useAppDispatch();
    const { hunger, sleep, age } = useAppSelector(state => state.game);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementStats());
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const handleFeed = () => {
        dispatch(feedPet());
    };

    const handleRest = () => {
        dispatch(restPet());
    };

    return (
        <div className="App">
            <h1>Virtual Pet Game</h1>

            <div className="stats-container">
                <div className="stat">
                    <h2>Hunger</h2>
                    <div className="stat-value">{hunger}</div>
                </div>

                <div className="stat">
                    <h2>Sleep</h2>
                    <div className="stat-value">{sleep}</div>
                </div>

                <div className="stat">
                    <h2>Age</h2>
                    <div className="stat-value">{age}</div>
                </div>
            </div>

            <div className="actions">
                <button onClick={handleFeed} className="action-button feed">
                    Feed Pet (-10 hunger)
                </button>
                <button onClick={handleRest} className="action-button rest">
                    Rest Pet (-10 sleep)
                </button>
            </div>
        </div>
    );
};
