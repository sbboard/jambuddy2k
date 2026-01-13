import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.sass';
import { MAX_HEALTH, SLEEPLENGTH } from '../../../const/rules';

export const Screen = () => {
    const { hunger, sleep, health, stage, action } = useAppSelector(
        state => state.game
    );

    const image = useMemo(() => {
        let mood = 'normal';
        if (sleep <= SLEEPLENGTH) mood = 'drowsy';
        else if (hunger <= 1) mood = 'eat';
        if (health <= MAX_HEALTH * 0.25) mood = 'sick';
        if (action?.type) mood = String(action.type);
        return `/assets/pets/${String(stage)}/${mood}.jpg`;
    }, [hunger, sleep, health, stage, action]);

    return (
        <div className="screen">
            <img src={image} alt="Pet" />
        </div>
    );
};
