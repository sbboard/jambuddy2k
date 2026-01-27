import './Controls.scss';

export const Controls = () => {

    function emitKeyEvent(key: string) {
        const event = new KeyboardEvent('keydown', { key });
        window.dispatchEvent(event);
    }

    return (
        <div className="actions">
            <button
                onClick={() => {
                    emitKeyEvent('ArrowLeft');
                }}
                className="action-button"
            >
                L
            </button>
            <button
                onClick={() => {
                    emitKeyEvent('ArrowDown');
                }}
                className="action-button"
            >
                S
            </button>
            <button
                onClick={() => {
                    emitKeyEvent('ArrowRight');
                }}
                className="action-button"
            >
                R
            </button>
        </div>
    );
};
