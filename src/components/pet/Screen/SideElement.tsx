export const SideElement = (props: { sprite?: string, type: 'prop' | 'status' }) => {
    return (
        <img
            className={`${props.sprite || ''} ${props.sprite ? props.type : 'spacer'}`.trim()}
            src={
                props.sprite
                    ? `/assets/${props.type === 'prop' ? 'props' : 'statuses'}/${props.sprite}.png`
                    : '/assets/blank.png'
            }
        />
    );
};