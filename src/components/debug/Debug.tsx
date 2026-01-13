import { useAppSelector } from '../../app/hooks';

export const Debug = () => {
    const { hunger, sleep, age, health, stage, tickCount } = useAppSelector(
        state => state.game
    );
    return (
        <div>
            <p>Hunger: {hunger}</p>
            <p>Sleep: {sleep}</p>
            <p>Age: {age}</p>
            <p>Health: {health}</p>
            <p>Stage: {stage}</p>
            <p>Tick Count: {tickCount}</p>
        </div>
    );
};
