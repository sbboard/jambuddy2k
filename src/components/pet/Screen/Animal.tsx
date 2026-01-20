import { useMemo } from 'react';
import { type Moods, SLEEPLENGTH } from '../../../const/rules';
import { GameState } from '../../../store/gameSlice';

export const Animal = (props: { gameState: GameState }) => {
    const { hunger, sleep, health, stage, action } = props.gameState;
    const image = useMemo(() => {
        let mood: Moods = 'normal';
        if (sleep <= SLEEPLENGTH || hunger <= 1) mood = 'sad';
        if (action?.type === 'bath') mood = 'normal';
        else if (action?.type) mood = action.type;
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
        <img className={`pet ${action?.type}`} style={petStyle} src={image} alt="Pet" />
    );
};
