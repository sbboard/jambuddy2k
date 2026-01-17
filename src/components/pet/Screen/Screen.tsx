import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.scss';
import { MAX_HEALTH, type Moods, SLEEPLENGTH } from '../../../const/rules';

export const Screen = () => {
    const { hunger, sleep, health, stage, action } = useAppSelector(
        state => state.game
    );

    const image = useMemo(() => {
        let mood: Moods = 'normal';
        if (sleep <= SLEEPLENGTH) mood = 'drowsy';
        else if (hunger <= 1) mood = 'eat';
        if (health <= MAX_HEALTH * 0.25) mood = 'sick';
        if (action?.type) mood = action.type;
        return `/assets/pets/${String(stage)}/normal.png`;
    }, [hunger, sleep, health, stage, action]);

    const petSize = useMemo(() => {
        if (stage === 1) return 8;
        if (stage === 2) return 12;
        return 16;
    }, [stage]);

    const petStyle = useMemo(() => {
        return { width: `${petSize}px`, height: `${petSize}px` };
    }, [petSize]);

    return (
        <div className="screen">
            <img className='pet' style={petStyle} src={image} alt="Pet" />
        </div>
    );
};
