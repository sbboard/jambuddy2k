import { Screen } from './Screen/Screen';
import { Controls } from './Controls/Controls';
import { useEffect } from 'react';
import { incrementStats } from '../../store/gameSlice';
import { useAppDispatch } from '../../app/hooks';
import { MS_PER_TICK } from '../../const/rules';
import './Pet.scss'

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
        <div className='shell'>
            <Screen />
            <Controls />
        </div>
    );
};
