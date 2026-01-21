import { useEffect, useRef, useState } from "react";

function useDebug() {
    const [debugActive, setDebugActive] = useState(false);
    const debugPattern = ['ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowLeft'];
    const currentPattern: React.RefObject<string[]> = useRef([]);

    const checkPattern = (event: KeyboardEvent) => {
        currentPattern.current.push(event.key);
        if (currentPattern.current.length > debugPattern.length) {
            currentPattern.current.shift();
        }
        if (JSON.stringify(currentPattern.current) === JSON.stringify(debugPattern)) {
            setDebugActive(true);
            sessionStorage.setItem('debugActive', 'true');
            window.removeEventListener('keydown', checkPattern);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('debugActive') === 'true' && !debugActive) {
            setDebugActive(true);
            return;
        }
        window.addEventListener('keydown', checkPattern);
        return () => {
            window.removeEventListener('keydown', checkPattern);
        };
    }, [debugActive]);

    return { debugActive };
}

export default useDebug;