import { useEffect, useRef, useState } from 'react';
import './Zoom.scss';
import useScale from '../../hooks/useScale';
import { useAppSelector } from '../../app/hooks';

export const Zoom = () => {

    const { health } = useAppSelector(state => state.game);
    const { scaleValue } = useScale();
    let lastScale = useRef(scaleValue);
    let lastHealth = useRef(health);
    let [zoom, setZoom] = useState('');

    const zoomRef = useRef<HTMLDivElement | null>(null);
    zoomRef.current?.addEventListener('animationend', () => zoomRef.current && setZoom(''));

    useEffect(() => {
        if (scaleValue > lastScale.current) setZoom('zoom-in');
        else if (scaleValue < lastScale.current) setZoom('zoom-out');
        lastScale.current = scaleValue;

        // Trigger zoom-in on game reset
        if (health === lastHealth.current) return;
        if (!lastHealth.current && health) setZoom('zoom-in');
        lastHealth.current = health;
    }, [scaleValue, health]);

    return (
        <div ref={zoomRef} className={`ring ${zoom}`.trim()} />
    );
};
