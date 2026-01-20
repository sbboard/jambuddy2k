import { useMemo } from "react";

export const SideElement = (props: { sprite?: string, type: 'prop' | 'status' }) => {


    const sprite = useMemo(() => {
        let root = '/assets';
        if (!props.sprite) return `${root}/blank.png`;
        root += props.type === 'prop' ? '/props' : '/statuses';
        return `${root}/${props.sprite}.png`;
    }, [props.sprite]);

    return (
        <img className={`${props.sprite || ''} ${props.sprite ? props.type : 'spacer'}`.trim()} src={sprite} />
    );
};