export const SideElement = (props: { sprite?: string, type: 'prop' | 'status' }) => {
    return (
        <div className={`${props.type}Wrap ${props.sprite || ''}`.trim()}>
            <img
                className={`${props.sprite ? props.type : 'spacer'}`.trim()}
                src={
                    props.sprite
                        ? `/assets/${props.type === 'prop' ? 'props' : 'statuses'}/${props.sprite}.png`
                        : '/assets/blank.png'
                }
            /></div>
    );
};