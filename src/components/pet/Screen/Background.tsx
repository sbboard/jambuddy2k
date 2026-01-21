export const Background = (props: { action?: string }) => {

    return (
        <>
            {props.action === 'sleep' &&
                <div className='bgWrap'>
                    <img className='bg' src="/assets/scenes/lightsOut.png" alt="Sleep Background" />
                </div>}
        </>
    );
};
