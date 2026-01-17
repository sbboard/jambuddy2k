import { createSlice } from '@reduxjs/toolkit';
import {
    HOURS_PER_DAY,
    MAX_AGE,
    MAX_HEALTH,
    MAX_HUNGER,
    MEALS_PER_DAY,
    SLEEPLENGTH,
    STAGE_ONE_EVOLVE,
    STAGETWOEVOLVE,
    STARTING_HUNGER,
} from '../const/rules';

type GameState = {
    hunger: number;
    sleep: number;
    age: number;
    health: number;
    stage: number;
    tickCount: number;
    action: {
        type: 'sleep' | 'reject' | null;
        end: number | null;
    } | null;
};

const initialState: GameState = {
    hunger: STARTING_HUNGER,
    sleep: HOURS_PER_DAY,
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
    if (stat >= limit) {
        state.action = {
            type: 'reject',
            end: state.tickCount + 2,
        };
        return true;
    }
    return false;
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
                state.sleep = Math.min(HOURS_PER_DAY, state.sleep + 1);
                if (state.hunger > 0) {
                    state.health = Math.min(MAX_HEALTH, state.health + 1);
                }
                return;
            }

            // Hourly stat changes
            if (state.tickCount % 1 === 0) {
                state.sleep = Math.max(0, state.sleep - 1);
            }
            if (state.tickCount % (HOURS_PER_DAY / MEALS_PER_DAY) === 0) {
                state.hunger = Math.max(0, state.hunger - 1);
            }
            if (state.tickCount % HOURS_PER_DAY === 0) {
                state.age = Math.min(MAX_AGE, state.age + 1);
            }

            // Overall health
            if (state.hunger === 0) {
                state.health = Math.max(0, state.health - 1);
            }
            if (state.sleep === 0) state.health = Math.max(0, state.health - 1);
            if (state.age === MAX_AGE) state.health = 0;
            handleEvolution(state);
        },
        feed: state => {
            if (state.action) return;
            if (checkRejection(state, state.hunger, MAX_HUNGER)) return;
            state.hunger = Math.min(MAX_HUNGER, state.hunger + 1);
        },
        lights: state => {
            if (state.action) return;
            const limit = HOURS_PER_DAY - SLEEPLENGTH;
            if (checkRejection(state, state.sleep, limit)) return;
            state.action = {
                type: 'sleep',
                end: state.tickCount + SLEEPLENGTH,
            };
        },
    },
});

export const { incrementStats, feed, lights } = gameSlice.actions;
export default gameSlice.reducer;
