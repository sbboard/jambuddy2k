import { useMemo } from "react";

export const SideElement = (props: { sprite?: string, type: 'prop' | 'status' }) => {


    const sprite = useMemo(() => {
        const root = props.type === 'prop' ? '/assets/props' : '/assets/statuses';
        return `${root}/${props.sprite}.png`;
    }, [props.sprite]);

    return (
        <img className={`${props.sprite} ${props.sprite ? props.type : 'spacer'}`} src={sprite || '/assets/blank.png'} />
    );
};