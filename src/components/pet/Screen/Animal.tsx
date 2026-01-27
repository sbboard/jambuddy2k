import { useMemo } from 'react';
import { type Moods, STATS } from '../../../const/rules';
import type { GameState } from '../../../store/gameSlice';

export const Animal = (props: { gameState: GameState }) => {
    const { hunger, sleep, stage, action, bath } = props.gameState;

    const mood: Moods = useMemo(() => {
        let mood: Moods = 'normal';
        if (
            sleep <= STATS.sleep.critical ||
            hunger <= STATS.hunger.critical ||
            bath <= STATS.bath.critical
        ) {
            mood = 'sad';
        } else if (action?.type) mood = action.type;
        return mood;
    }, [hunger, sleep, action, bath]);

    const image = useMemo(() => {
        return `/assets/pets/${String(stage)}/${mood}.png`;
    }, [mood, stage]);

    const petSize = useMemo(() => {
        if (stage === 1) return 8;
        if (stage === 2) return 12;
        return 16;
    }, [stage]);

    const petStyle = useMemo(() => {
        return {
            width: `${petSize.toString()}px`,
            height: `${petSize.toString()}px`,
        };
    }, [petSize]);

    return (
        <div className={`petWrap ${mood}`.trim()} style={petStyle}>
            <img src={image} alt="Pet" />
        </div>
    );
};
