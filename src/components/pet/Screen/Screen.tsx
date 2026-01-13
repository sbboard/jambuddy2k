import { useAppSelector } from '../../../app/hooks';

export const Screen = () => {
    const { hunger, sleep, age, health } = useAppSelector(state => state.game);

    return (
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
                <div className="stat-value">{age} years</div>
            </div>

            <div className="stat">
                <h2>Health</h2>
                <div className="stat-value">{health}</div>
            </div>
        </div>
    );
};
