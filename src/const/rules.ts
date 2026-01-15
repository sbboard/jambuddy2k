//time data
export const HOURS_PER_DAY = 24;
export const MS_PER_TICK = 2000;

//general health
export const MAX_HEALTH = 50;
export const MAX_AGE = 80;

//hunger data
export const MAX_HUNGER = 3;
export const MEALS_PER_DAY = 3;

//evolution data
export const STAGE_ONE_EVOLVE = 6;
export const STAGETWOEVOLVE = 20;

//sleep data
export const SLEEPLENGTH = 8;

export const MOODS = [
    'normal',
    'drowsy',
    'eat',
    'sick',
    'reject',
    'sleep',
] as const;

export type Moods = (typeof MOODS)[number];
export const PET_STAGES = [1, 2, 3];
