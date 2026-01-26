import {
    faBath,
    faBurger,
    faLightbulb,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
    createSlice,
    type PayloadAction,
    type ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { hunger, sleep, bath } from './gameSlice';

type MenuItem = {
    name: string;
    icon: IconDefinition;
    action: ActionCreatorWithoutPayload;
};

export const menuItems: MenuItem[] = [
    {
        name: 'hunger',
        icon: faBurger,
        action: hunger,
    },
    {
        name: 'bath',
        icon: faBath,
        action: bath,
    },
    {
        name: 'sleep',
        icon: faLightbulb,
        action: sleep,
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
