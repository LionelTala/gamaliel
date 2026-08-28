// resources/js/hooks/useCountUp.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Anime un nombre de 0 à `target` en douceur (requestAnimationFrame + easing),
 * une seule fois. Protégé contre les déclenchements multiples de `start`
 * (ex: IntersectionObserver imprécis) grâce à `hasRunRef`.
 */
export function useCountUp(target: number, start: boolean, duration: number = 1400): number {
    const [value, setValue] = useState(0);
    const hasRunRef = useRef(false);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!start || hasRunRef.current) return;
        hasRunRef.current = true;

        const startTime = performance.now();
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.round(easeOutCubic(progress) * target));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick);
            } else {
                setValue(target);
            }
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [start, target, duration]);

    return value;
}