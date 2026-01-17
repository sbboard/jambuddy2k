import { feedPet, restPet } from '../../../store/gameSlice';
import { useAppDispatch } from '../../../app/hooks';
import './Controls.scss';

export const Controls = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="actions">
            <button
                onClick={() => dispatch(feedPet())}
                className="action-button feed"
            >
                F
            </button>
            <button
                onClick={() => dispatch(restPet())}
                className="action-button rest"
            >
                R
            </button>
        </div>
    );
};
