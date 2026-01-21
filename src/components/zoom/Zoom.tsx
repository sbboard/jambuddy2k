import { useEffect, useRef, useState } from 'react';
import './Zoom.scss';
import useScale from '../../hooks/useScale';

export const Zoom = () => {

    const { scaleValue } = useScale();
    let lastScale = useRef(scaleValue);
    let [zoom, setZoom] = useState('');

    const zoomRef = useRef<HTMLDivElement | null>(null);
    zoomRef.current?.addEventListener('animationend', () => zoomRef.current && setZoom(''));

    useEffect(() => {
        if (scaleValue > lastScale.current) setZoom('zoom-in');
        else if (scaleValue < lastScale.current) setZoom('zoom-out');
        lastScale.current = scaleValue;
    }, [scaleValue]);

    return (
        <div ref={zoomRef} className={`ring ${zoom}`.trim()} />
    );
};
