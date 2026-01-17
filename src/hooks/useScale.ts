import { useEffect, useState } from "react";
import { EGGSIZE, MAXSCALE } from "../const/const";

function useScale() {
    const [scaleValue, setScaleValue] = useState(1);

    function updateScale(newScale: number) {
        setScaleValue(newScale);
    }

    function checkScale() {
        const pageWidth = window.innerWidth;
        const newScale = Math.min(MAXSCALE, Math.floor(pageWidth / EGGSIZE));
        updateScale(newScale);
    }

    useEffect(() => {
        checkScale();
        window.addEventListener("resize", checkScale);
        return () => {
            window.removeEventListener("resize", checkScale);
        };
    }, []);

    return { scaleValue, updateScale };
}

export default useScale;