import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.scss';
import { type Moods, SLEEPLENGTH } from '../../../const/rules';

export const Screen = () => {
    const { hunger, sleep, health, stage, action } = useAppSelector(
        state => state.game
    );

    const status = useMemo(() => {
        const root = '/assets/statuses';
        if (action?.type === 'eat') return;
        if (action?.type === 'sleep') return `${root}/zzz.png`;
        if (sleep <= SLEEPLENGTH) return `${root}/tired.png`;
        if (hunger <= 1) return `${root}/hungry.png`;
        return;
    }, [hunger, sleep, action]);

    const prop = useMemo(() => {
        const root = '/assets/props';
        if (action?.type === 'eat') return `${root}/food.png`;
        return;
    }, [action]);

    const image = useMemo(() => {
        let mood: Moods = 'normal';
        if (sleep <= SLEEPLENGTH || hunger <= 1) mood = 'sad';
        if (action?.type) mood = action.type;
        return `/assets/pets/${String(stage)}/${mood}.png`;
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
            <div className="scene">
                {prop ? <img className='prop' src={prop} alt="Prop" /> : <img className='spacer' src='/assets/blank.png' alt="Status" />}
                <img className='pet' style={petStyle} src={image} alt="Pet" />
                {status ? <img className='status' src={status} alt="Status" /> : <img className='spacer' src='/assets/blank.png' alt="Status" />}
                {action?.type === 'sleep' && <img className='bg' src="/assets/scenes/lightsOut.png" alt="Sleep Background" />}
            </div>
        </div >
    );
};
