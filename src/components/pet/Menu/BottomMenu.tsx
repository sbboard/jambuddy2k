import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuItems } from "../../../store/navigation";
import { useAppSelector } from '../../../app/hooks';

export const BottomMenu = () => {
    const currentSelectionIndex = useAppSelector(state => state.navigation.currentSelectionIndex);

    return (
        <>
            {
                menuItems.map((item, i) => (
                    <FontAwesomeIcon key={item.name} icon={item.icon} className={i === currentSelectionIndex ? 'selected' : ''} />
                ))
            }
        </>
    );
};