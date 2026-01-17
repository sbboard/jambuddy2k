import { TopMenu } from './TopMenu';
import { BottomMenu } from './BottomMenu';
import './Menu.scss'

export const Menu = (props: { placement: 'top' | 'bottom' }) => {

    return (
        <div className={`menu ${props.placement}`}>
            {props.placement === 'top' ? (<TopMenu />) : (<BottomMenu />)}
        </div>
    );
};