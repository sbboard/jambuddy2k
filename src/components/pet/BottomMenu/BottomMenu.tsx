import { faBurger, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BottomMenu.scss'

export const BottomMenu = () => {

    return (
        <div className="bottom-menu">
            <FontAwesomeIcon icon={faBurger} />
            <FontAwesomeIcon icon={faLightbulb} />
        </div>
    );
};