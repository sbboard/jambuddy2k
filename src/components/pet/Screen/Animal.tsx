import { useMemo } from 'react';
import { type Moods, SLEEPLENGTH } from '../../../const/rules';
import { GameState } from '../../../store/gameSlice';

export const Animal = (props: { gameState: GameState }) => {
    const { hunger, sleep, stage, action } = props.gameState;

    const mood: Moods = useMemo(() => {
        let mood: Moods = 'normal';
        if (sleep <= SLEEPLENGTH || hunger <= 1) mood = 'sad';
        if (action?.type === 'bath') mood = 'normal';
        else if (action?.type) mood = action.type;
        return mood;
    }, [hunger, sleep, action]);

    const image = useMemo(() => {
        return `/assets/pets/${String(stage)}/${mood}.png`;
    }, [mood, stage]);

    const petSize = useMemo(() => {
        if (stage === 1) return 8;
        if (stage === 2) return 12;
        return 16;
    }, [stage]);

    const petStyle = useMemo(() => {
        return { width: `${petSize}px`, height: `${petSize}px` };
    }, [petSize]);

    return (
        <img className={`pet ${mood}`.trim()} style={petStyle} src={image} alt="Pet" />
    );
};
