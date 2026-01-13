import { feedPet, restPet } from '../../../store/gameSlice';
import { useAppDispatch } from '../../../app/hooks';

export const Controls = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="actions">
            <button
                onClick={() => dispatch(feedPet())}
                className="action-button feed"
            >
                Feed
            </button>
            <button
                onClick={() => dispatch(restPet())}
                className="action-button rest"
            >
                Rest
            </button>
        </div>
    );
};
