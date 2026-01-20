import { createSlice } from '@reduxjs/toolkit';
import {
    BATHLENGTH,
    BATHS_PER_DAY,
    EATLENGTH,
    HOURS_PER_DAY,
    MAX_AGE,
    MAX_BATH,
    MAX_HEALTH,
    MAX_HUNGER,
    MEALS_PER_DAY,
    SLEEPLENGTH,
    SLEEPS_PER_DAY,
    STAGE_ONE_EVOLVE,
    STAGETWOEVOLVE,
    STARTING_BATH,
    STARTING_HUNGER,
} from '../const/rules';

export type GameState = {
    hunger: number;
    sleep: number;
    age: number;
    bath: number;
    health: number;
    stage: number;
    tickCount: number;
    action: {
        type: 'sleep' | 'reject' | 'eat' | 'bath' | null;
        end: number | null;
    } | null;
};

const initialState: GameState = {
    hunger: STARTING_HUNGER,
    sleep: HOURS_PER_DAY,
    bath: STARTING_BATH,
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
            end: state.tickCount + 1,
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
            if (state.tickCount % SLEEPS_PER_DAY === 0) {
                state.sleep = Math.max(0, state.sleep - 1);
            }
            if (state.tickCount % MEALS_PER_DAY === 0) {
                state.hunger = Math.max(0, state.hunger - 1);
            }
            if (state.tickCount % HOURS_PER_DAY === 0) {
                state.age = Math.min(MAX_AGE, state.age + 1);
            }
            if (state.tickCount % BATHS_PER_DAY === 0) {
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
        feed: state => {
            if (state.action) return;
            if (checkRejection(state, state.hunger, MAX_HUNGER)) return;
            state.hunger = Math.min(MAX_HUNGER, state.hunger + 1);
            state.action = {
                type: 'eat',
                end: state.tickCount + EATLENGTH,
            };
        },
        lights: state => {
            if (state.action) return;
            const limit = HOURS_PER_DAY - SLEEPLENGTH;
            if (checkRejection(state, state.sleep, limit)) return;
            let length = Math.max(SLEEPLENGTH, 12 - state.sleep);
            state.action = {
                type: 'sleep',
                end: state.tickCount + length,
            };
        },
        bath: state => {
            if (state.action) return;
            const limit = MAX_BATH / 2;
            if (checkRejection(state, state.bath, limit)) return;
            state.bath = MAX_BATH;
            state.action = {
                type: 'bath',
                end: state.tickCount + BATHLENGTH,
            };
        },
    },
});

export const { incrementStats, feed, lights, bath } = gameSlice.actions;
export default gameSlice.reducer;
