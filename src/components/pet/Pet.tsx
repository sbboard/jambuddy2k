import { Screen } from './Screen/Screen';
import { Controls } from './Controls/Controls';
import { useEffect } from 'react';
import { incrementStats } from '../../store/gameSlice';
import { useAppDispatch } from '../../app/hooks';

const MS_PER_TICK = 2000;

export const Pet = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementStats());
        }, MS_PER_TICK);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

    return (
        <>
            <Screen />
            <Controls />
        </>
    );
};
