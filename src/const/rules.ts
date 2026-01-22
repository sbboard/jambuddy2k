//time data
export const HOURS_PER_DAY = 24;
export const MS_PER_TICK = 2000;

//general health
export const MAX_HEALTH = 50;
export const MAX_AGE = 80;

//hunger data
export const MAX_HUNGER = 3;
export const STARTING_HUNGER = MAX_HUNGER - 1;
export const EATLENGTH = 2;
export const EAT_DECREASE_RATE = 16;

//bath data
export const MAX_BATH = 48;
export const STARTING_BATH = MAX_BATH - 12;
export const BATHLENGTH = 3;
export const BATHS_PER_DAY = 3;

//evolution data
export const STAGE_ONE_EVOLVE = 3;
export const STAGETWOEVOLVE = 10;

//sleep data
export const SLEEPLENGTH = 8;
export const SLEEPS_PER_DAY = 4;

export const MOODS = [
    'normal',
    'eat',
    'sad',
    'sleep',
    'reject'
] as const;

export type Moods = (typeof MOODS)[number];
export const PET_STAGES = [1, 2, 3];
