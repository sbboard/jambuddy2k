import { Screen } from './Screen/Screen';
import { Controls } from './Controls/Controls';
import { useCallback, useEffect, useRef } from 'react';
import { incrementStats } from '../../store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MS_PER_TICK } from '../../const/rules';
import { Menu } from './Menu/Menu';
import './Pet.scss';
import useScale from '../../hooks/useScale';

export const Pet = () => {
    const dispatch = useAppDispatch();
    const { scaleValue } = useScale();
    const { action } = useAppSelector(state => state.game);
    const interval: React.RefObject<NodeJS.Timeout | null> = useRef(null);

    const triggerTick = useCallback(() => {
        dispatch(incrementStats());
        interval.current = setTimeout(triggerTick, MS_PER_TICK);
    }, [dispatch]);

    useEffect(() => {
        clearTimeout(interval.current ?? 0);
        interval.current = setTimeout(triggerTick, MS_PER_TICK);
        return () => {
            clearTimeout(interval.current ?? 0);
        };
    }, [action, triggerTick]);

    return (
        <div
            className="shell"
            style={{ transform: `scale(${scaleValue.toString()})` }}
        >
            <img
                className="shell-image"
                src="/assets/shell/main_hq.png"
                alt="Pet Shell"
            />
            <div className="shadow" />
            <Menu placement="top" />
            <Screen />
            <Menu placement="bottom" />
            <Controls />
        </div>
    );
};
