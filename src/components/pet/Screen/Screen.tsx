import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.sass';

export const Screen = () => {
    const { hunger, sleep, health, stage } = useAppSelector(
        state => state.game
    );

    const image = useMemo(() => {
        let mood = 'normal';
        if (hunger < 2) mood = 'eat';
        if (sleep < 8) mood = 'sleep';
        if (health < 10) mood = 'cry';
        const pic = stage || '1';
        return `/assets/pets/${pic}/${mood}.jpg`;
    }, [hunger, sleep, health, stage]);

    return (
        <div className="screen">
            <img src={image} alt="Pet" />
        </div>
    );
};
