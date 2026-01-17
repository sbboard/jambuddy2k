export const SideElement = (props: { sprite?: string, type: 'prop' | 'status' }) => {

    return (
        <img className={props.sprite ? props.type : 'spacer'} src={props.sprite || '/assets/blank.png'} />
    );
};