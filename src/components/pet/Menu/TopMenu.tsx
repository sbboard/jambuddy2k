import { useAppSelector } from "../../../app/hooks";

export const TopMenu = () => {
    const { health } = useAppSelector(state => state.game);

    let msg: string[] = [];
    if (health <= 0) {
        msg = ' RIP '.split('');
    }

    return (
        <>
            <div className={!!msg[0]?.trim().length ? 'active' : ''}>{msg[0]}</div>
            <div className={!!msg[1]?.trim().length ? 'active' : ''}>{msg[1]}</div>
            <div className={!!msg[2]?.trim().length ? 'active' : ''}>{msg[2]}</div>
            <div className={!!msg[3]?.trim().length ? 'active' : ''}>{msg[3]}</div>
            <div className={!!msg[4]?.trim().length ? 'active' : ''}>{msg[4]}</div>
        </>
    );
};