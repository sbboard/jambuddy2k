import { faBurger, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BottomMenu = () => {

    return (
        <>
            <FontAwesomeIcon icon={faBurger} />
            <FontAwesomeIcon icon={faLightbulb} />
        </>
    );
};