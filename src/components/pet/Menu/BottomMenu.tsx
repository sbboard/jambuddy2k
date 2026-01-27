import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { store } from '../../../app/store';
import { menuItems, setCurrentSelection } from '../../../store/navigation';

export const BottomMenu = () => {
    const { health } = useAppSelector(state => state.game);
    const currentSelectionIndex = useAppSelector(
        state => state.navigation.currentSelectionIndex
    );
    const dispatch = useAppDispatch();

    const isDead = health <= 0;

    useEffect(() => {
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
                case 'ArrowDown': {
                    const index =
                        store.getState().navigation.currentSelectionIndex;
                    dispatch(menuItems[index].action());
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    return (
        <>
            {menuItems.map((item, i) => (
                <div className="menu-icon" key={item.name}>
                    <FontAwesomeIcon
                        icon={item.icon}
                        className={
                            i === currentSelectionIndex && !isDead
                                ? 'selected'
                                : ''
                        }
                    />
                    <div className="star" />
                </div>
            ))}
        </>
    );
};
