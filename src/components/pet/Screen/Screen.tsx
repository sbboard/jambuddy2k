import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './Screen.scss';
import { SLEEPLENGTH } from '../../../const/rules';
import { SideElement } from './SideElement'
import { Animal } from './Animal';
import { Background } from './Background';
import { resetGame } from '../../../store/gameSlice';

export const Screen = () => {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(state => state.game);
    const { hunger, sleep, action, bath, health } = gameState;

    const prop = useMemo(() => {
        if (action?.type === 'eat') return `food`;
        if (action?.type === 'bath') return `tub`;
        return;
    }, [action]);

    const status = useMemo(() => {
        if (prop) return;
        if (action?.type === 'sleep') return `zzz`;
        if (sleep <= SLEEPLENGTH) return `tired`;
        if (hunger <= 1) return `hungry`;
        if (bath <= 12) return `dirty`;
        return;
    }, [hunger, sleep, action, prop, bath]);

    const reset = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') dispatch(resetGame())
    };

    useEffect(() => {
        if (health <= 0) window.addEventListener('keydown', reset);
        else window.removeEventListener('keydown', reset);
    }, [health]);

    return (
        <div className="screen">
            <div className="scene">
                {health > 0 && <SideElement sprite={prop} type="prop" />}
                {health > 0 ? <Animal gameState={gameState} /> : <img src='/assets/pets/rip.png' />}
                {health > 0 && <SideElement sprite={status} type="status" />}
                <Background action={action?.type as string | undefined} />
            </div>
        </div >
    );
};
