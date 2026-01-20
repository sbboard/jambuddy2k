import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuItems } from "../../../store/navigation";
import { useAppSelector } from '../../../app/hooks';

export const BottomMenu = () => {
    const { health } = useAppSelector(state => state.game);
    const currentSelectionIndex = useAppSelector(state => state.navigation.currentSelectionIndex);

    const isDead = health <= 0;

    return (
        <>
            {
                menuItems.map((item, i) => (
                    <FontAwesomeIcon key={item.name} icon={item.icon} className={i === currentSelectionIndex && !isDead ? 'selected' : ''} />
                ))
            }
        </>
    );
};