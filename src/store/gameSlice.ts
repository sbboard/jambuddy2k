import { createSlice } from '@reduxjs/toolkit';

const MAX_HEALTH = 50;
const MAX_HUNGER = 3;
const HOURS_PER_DAY = 24;
const MAX_AGE = 80;
const MEALS_PER_DAY = 3;

const STAGE_ONE_EVOLVE = 6;
const STAGETWOEVOLVE = 20;

type GameState = {
    hunger: number;
    sleep: number;
    age: number;
    health: number;
    stage: number;
    tickCount: number;
};

const initialState: GameState = {
    hunger: MAX_HUNGER,
    sleep: HOURS_PER_DAY,
    health: MAX_HEALTH,
    age: 0,
    stage: 1,
    tickCount: 0,
};

const handleEvolution = (state: GameState) => {
    if (state.age === STAGE_ONE_EVOLVE) state.stage = 2;
    if (state.age === STAGETWOEVOLVE) state.stage = 3;
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        incrementStats: state => {
            state.tickCount += 1;

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

            //Evolve
            handleEvolution(state);
        },
        feedPet: state => {
            state.hunger = Math.max(0, state.hunger + 1);
        },
        restPet: state => {
            state.sleep = Math.max(0, state.sleep + 1);
        },
    },
});

export const { incrementStats, feedPet, restPet } = gameSlice.actions;
export default gameSlice.reducer;
