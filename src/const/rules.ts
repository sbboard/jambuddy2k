//time data
export const MS_PER_TICK = 2000;

//general health
export const MAX_HEALTH = 50;
export const MAX_AGE = 20;

type Stats = Record<
    string,
    {
        name: string;
        initial: number;
        max: number;
        limit: number; // min value before user can trigger associated action
        critical: number; // value at which status is shown
        decreaseRate: number; // in ticks
        actionLength: number; // in ticks
    }
>;

export const STATS: Stats = {
    hunger: {
        name: 'hunger',
        initial: 2,
        max: 3,
        limit: 2,
        critical: 1,
        decreaseRate: 12,
        actionLength: 2,
    },
    bath: {
        name: 'bath',
        initial: 36,
        max: 48,
        limit: 36,
        critical: 12,
        decreaseRate: 8,
        actionLength: 3,
    },
    sleep: {
        name: 'sleep',
        initial: 24,
        max: 24,
        limit: 16,
        critical: 8,
        decreaseRate: 15,
        actionLength: 8,
    },
};

//evolution data
export const STAGE_ONE_EVOLVE = 3;
export const STAGETWOEVOLVE = 10;

export const MOODS = [
    'normal',
    'hunger',
    'sad',
    'sleep',
    'reject',
    'bath',
] as const;

export type Moods = (typeof MOODS)[number];
export const PET_STAGES = [1, 2, 3];
