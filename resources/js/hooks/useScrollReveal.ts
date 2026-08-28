// resources/js/hooks/useScrollReveal.ts
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    threshold: number = 0.2
) {
    const ref = useRef<T | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || isRevealed) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    // Un seul déclenchement pour toute la vie du composant —
                    // c'est ce qui manquait et provoquait les redémarrages en boucle.
                    observer.unobserve(node);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold]);

    return { ref, isRevealed };
}