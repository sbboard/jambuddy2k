import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import './Screen.scss';
import { SLEEPLENGTH } from '../../../const/rules';
import { SideElement } from './SideElement'
import { Animal } from './Animal';
import { Background } from './Background';

export const Screen = () => {
    const gameState = useAppSelector(state => state.game);
    const { hunger, sleep, action } = gameState;

    const prop = useMemo(() => {
        const root = '/assets/props';
        if (action?.type === 'eat') return `${root}/food.png`;
        return;
    }, [action]);

    const status = useMemo(() => {
        const root = '/assets/statuses';
        if (prop) return;
        if (action?.type === 'sleep') return `${root}/zzz.png`;
        if (sleep <= SLEEPLENGTH) return `${root}/tired.png`;
        if (hunger <= 1) return `${root}/hungry.png`;
        return;
    }, [hunger, sleep, action, prop]);

    return (
        <div className="screen">
            <div className="scene">
                <SideElement sprite={prop} type="prop" />
                <Animal gameState={gameState} />
                <SideElement sprite={status} type="status" />
                <Background action={action?.type as string | undefined} />
            </div>
        </div >
    );
};
