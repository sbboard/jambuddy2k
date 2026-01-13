import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.sass';
import { MAX_HEALTH, SLEEPLENGTH } from '../../../const/rules';

export const Screen = () => {
    const { hunger, sleep, health, stage } = useAppSelector(
        state => state.game
    );

    const image = useMemo(() => {
        let mood = 'normal';
        if (sleep <= SLEEPLENGTH) mood = 'drowsy';
        else if (hunger <= 1) mood = 'eat';
        else if (health <= MAX_HEALTH * 0.25) mood = 'cry';
        return `/assets/pets/${String(stage)}/${mood}.jpg`;
    }, [hunger, sleep, health, stage]);

    return (
        <div className="screen">
            <img src={image} alt="Pet" />
        </div>
    );
};
