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
            window.removeEventListener('keydown', checkPattern);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', checkPattern);
        return () => {
            window.removeEventListener('keydown', checkPattern);
        };
    }, []);

    return { debugActive };
}

export default useDebug;