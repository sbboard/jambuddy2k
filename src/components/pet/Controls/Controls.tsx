import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { menuItems, setCurrentSelection } from '../../../store/navigation';
import './Controls.scss';

export const Controls = () => {
    const dispatch = useAppDispatch();

    const currentSelectionIndex = useAppSelector(state => state.navigation.currentSelectionIndex);
    const currentItem = menuItems[currentSelectionIndex];

    const handleSelect = () => {
        if (currentItem && currentItem.action) dispatch(currentItem.action());
    };

    // Map arrow keys to corresponding button actions
    const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowLeft':
                dispatch(setCurrentSelection('previous'));
                break;
            case 'ArrowRight':
                dispatch(setCurrentSelection('next'));
                break;
            case 'ArrowDown':
                handleSelect();
                break;
            case 'Enter':
                handleSelect();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="actions">
            <button
                onClick={() => dispatch(setCurrentSelection('previous'))}
                className="action-button"
            >
                L
            </button>
            <button
                onClick={() => handleSelect()}
                className="action-button"
            >
                S
            </button>
            <button
                onClick={() => dispatch(setCurrentSelection('next'))}
                className="action-button"
            >
                R
            </button>
        </div>
    );
};
