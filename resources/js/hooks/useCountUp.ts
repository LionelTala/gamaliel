// resources/js/hooks/useCountUp.ts
import { useEffect, useState } from 'react';

export function useCountUp(target: number, isActive: boolean, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let start: number | null = null;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setValue(Math.floor(ease(progress) * target));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
        };

        requestAnimationFrame(step);
    }, [isActive, target, duration]);

    return value;
}
