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
