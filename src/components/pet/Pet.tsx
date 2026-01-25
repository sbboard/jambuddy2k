import { Screen } from './Screen/Screen';
import { Controls } from './Controls/Controls';
import { useEffect } from 'react';
import { incrementStats } from '../../store/gameSlice';
import { useAppDispatch } from '../../app/hooks';
import { MS_PER_TICK } from '../../const/rules';
import { Menu } from './Menu/Menu';
import './Pet.scss';
import useScale from '../../hooks/useScale';

export const Pet = () => {
    const dispatch = useAppDispatch();
    const { scaleValue } = useScale();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementStats());
        }, MS_PER_TICK);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

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
