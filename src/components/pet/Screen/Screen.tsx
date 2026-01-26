import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './Screen.scss';
import { SideElement } from './SideElement';
import { Animal } from './Animal';
import { Background } from './Background';
import { resetGame } from '../../../store/gameSlice';
import { STATS } from '../../../const/rules';

export const Screen = () => {
    const dispatch = useAppDispatch();
    const gameState = useAppSelector(state => state.game);
    const { hunger, sleep, action, bath, health } = gameState;

    const prop = useMemo(() => {
        if (action?.type === 'hunger') return `food`;
        if (action?.type === 'bath') return `tub`;
        return;
    }, [action]);

    const status = useMemo(() => {
        if (prop) return;
        if (action?.type === 'sleep') return `zzz`;
        if (action?.type === 'reject') return `annoyed`;
        if (sleep <= STATS.sleep.critical) return `tired`;
        if (hunger <= STATS.hunger.critical) return `hungry`;
        if (bath <= STATS.bath.critical) return `dirty`;
        return;
    }, [hunger, sleep, action, prop, bath]);

    useEffect(() => {
        const reset = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') dispatch(resetGame());
        };

        if (health <= 0) window.addEventListener('keydown', reset);
        else window.removeEventListener('keydown', reset);
    }, [dispatch, health]);

    return (
        <div className="screen">
            <div className="scene">
                {health > 0 && <SideElement sprite={prop} type="prop" />}
                {health > 0 ? (
                    <Animal gameState={gameState} />
                ) : (
                    <div className="ripWrap">
                        <img src="/assets/pets/rip.png" />
                    </div>
                )}
                {health > 0 && <SideElement sprite={status} type="status" />}
                <Background action={action?.type as string | undefined} />
            </div>
        </div>
    );
};
