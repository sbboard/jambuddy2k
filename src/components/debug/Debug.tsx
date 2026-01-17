import { useAppSelector } from '../../app/hooks';
import './Debug.scss';

export const Debug = () => {
    const { hunger, sleep, age, health, stage, tickCount, action } = useAppSelector(
        state => state.game
    );
    return (
        <div className='debug'>
            <p>Hunger: {hunger}</p>
            <p>Sleep: {sleep}</p>
            <p>Age: {age}</p>
            <p>Health: {health}</p>
            <p>Stage: {stage}</p>
            <p>Tick Count: {tickCount}</p>
            <p>Action: {action?.type ?? 'None'}</p>
            <p>Action End: {action?.end ?? 'None'}</p>
        </div>
    );
};
