import { createSlice } from '@reduxjs/toolkit';
import {
    STATS,
    MAX_AGE,
    MAX_HEALTH,
    STAGE_ONE_EVOLVE,
    STAGETWOEVOLVE,
} from '../const/rules';

type ActionType = 'sleep' | 'reject' | 'hunger' | 'bath' | null;

export type GameState = {
    hunger: number;
    sleep: number;
    age: number;
    bath: number;
    health: number;
    stage: number;
    tickCount: number;
    action: {
        type: ActionType;
        end: number | null;
    } | null;
};

const initialState: GameState = {
    hunger: STATS.hunger.initial,
    sleep: STATS.sleep.initial,
    bath: STATS.bath.initial,
    health: MAX_HEALTH,
    age: 0,
    stage: 1,
    tickCount: 0,
    action: null,
};

const handleEvolution = (state: GameState) => {
    if (state.age === STAGE_ONE_EVOLVE) state.stage = 2;
    if (state.age === STAGETWOEVOLVE) state.stage = 3;
};

const checkRejection = (state: GameState, stat: number, limit: number) => {
    if (stat <= limit) return false;
    state.action = {
        type: 'reject',
        end: state.tickCount + 1,
    };
    state.health = Math.max(0, state.health - 1);
    return true;
};

const interact = (state: GameState, interaction: keyof GameState) => {
    if (state.action) return;
    if (typeof state[interaction] !== 'number') return;
    if (checkRejection(state, state[interaction], STATS[interaction].limit)) {
        return;
    }

    let end = state.tickCount + STATS[interaction].actionLength;
    if (interaction === 'hunger') {
        state.hunger = Math.min(STATS.hunger.max, state.hunger + 1);
    } else if (interaction === 'sleep') {
        end = Math.max(STATS.sleep.max - state.sleep + state.tickCount, end);
    } else if (interaction === 'bath') {
        state.bath = STATS.bath.max;
    }
    state.action = { type: interaction as ActionType, end };
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        incrementStats: state => {
            state.tickCount += 1;

            if (state.action?.end && state.tickCount >= state.action.end) {
                state.action = null;
            }

            if (state.action?.type === 'sleep') {
                state.sleep = Math.min(STATS.sleep.max, state.sleep + 1);
                if (state.hunger > 0) {
                    state.health = Math.min(MAX_HEALTH, state.health + 1);
                }
                return;
            }

            // Hourly stat changes
            if (state.tickCount % STATS.sleep.decreaseRate === 0) {
                state.sleep = Math.max(0, state.sleep - 1);
            }
            if (state.tickCount % STATS.hunger.decreaseRate === 0) {
                state.hunger = Math.max(0, state.hunger - 1);
            }
            if (state.tickCount % STATS.sleep.decreaseRate === 0) {
                state.age = Math.min(MAX_AGE, state.age + 1);
            }
            if (state.tickCount % STATS.bath.decreaseRate === 0) {
                state.bath = Math.max(0, state.bath - 1);
            }

            // Overall health
            if (state.hunger === 0) {
                state.health = Math.max(0, state.health - 1);
            }
            if (state.sleep === 0) state.health = Math.max(0, state.health - 1);
            if (state.bath === 0) state.health = Math.max(0, state.health - 1);
            if (state.age === MAX_AGE) state.health = 0;
            handleEvolution(state);
        },
        hunger: state => {
            interact(state, 'hunger');
        },
        sleep: state => {
            interact(state, 'sleep');
        },
        bath: state => {
            interact(state, 'bath');
        },
        resetGame: state => Object.assign(state, initialState),
    },
});

export const { incrementStats, hunger, sleep, bath, resetGame } =
    gameSlice.actions;
export default gameSlice.reducer;
