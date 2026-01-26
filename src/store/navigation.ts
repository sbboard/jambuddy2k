import {
    faBath,
    faBurger,
    faLightbulb,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { feed, lights, bath } from './gameSlice';

type MenuItem = {
    name: string;
    icon: IconDefinition;
    action: () => void;
};

export const menuItems: MenuItem[] = [
    {
        name: 'feed',
        icon: faBurger,
        action: feed,
    },
    {
        name: 'bath',
        icon: faBath,
        action: bath,
    },
    {
        name: 'lights',
        icon: faLightbulb,
        action: lights,
    },
] as const;

const initialState = {
    currentSelectionIndex: 0,
};

const navSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentSelection: (
            state,
            direction: PayloadAction<'next' | 'previous'>
        ) => {
            if (direction.payload === 'next') {
                state.currentSelectionIndex =
                    (state.currentSelectionIndex + 1) % menuItems.length;
            } else {
                state.currentSelectionIndex =
                    (state.currentSelectionIndex - 1 + menuItems.length) %
                    menuItems.length;
            }
        },
    },
});

export const { setCurrentSelection } = navSlice.actions;
export default navSlice.reducer;
