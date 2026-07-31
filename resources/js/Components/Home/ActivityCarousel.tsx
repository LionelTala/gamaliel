// resources/js/Components/Home/ActivityCarousel.tsx
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

import { useRef, useState, useEffect, useCallback } from 'react';

export interface ActivityItem {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image_url: string;
    tag?: string;
}

interface Props {
    activities: ActivityItem[];
    autoPlayInterval?: number;
}

const ActivityCarousel = ({ activities, autoPlayInterval = 4500 }: Props) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const getCardWidth = () => {
        const node = scrollerRef.current;
        const card = node?.querySelector<HTMLElement>('[data-card]');
        return card ? card.offsetWidth + 24 : 320;
    };

    const scrollToIndex = useCallback((index: number) => {
        const node = scrollerRef.current;
        if (!node) return;
        const cardWidth = getCardWidth();
        const clamped = ((index % activities.length) + activities.length) % activities.length;
        node.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' });
        setActiveIndex(clamped);
    }, [activities.length]);

    const scrollByCard = (direction: 1 | -1) => scrollToIndex(activeIndex + direction);

    // Défilement automatique
    useEffect(() => {
        if (isPaused || activities.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % activities.length;
                scrollToIndex(next);
                return next;
            });
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPaused, activities.length, autoPlayInterval, scrollToIndex]);

    const handleScroll = () => {
        const node = scrollerRef.current;
        if (!node) return;
        const cardWidth = getCardWidth();
        setActiveIndex(Math.round(node.scrollLeft / cardWidth) % activities.length);
    };

    if (activities.length === 0) return null;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
        >
            <div
                ref={scrollerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none' }}
            >
                {activities.map((activity) => (
                    <article
                        data-card
                        key={activity.id}
                        className="snap-start shrink-0 w-[280px] sm:w-[340px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={activity.image_url}
                                alt={activity.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                            />
                            {activity.tag && (
                                <span className="absolute top-3 left-3 px-3 py-1 bg-[#1a56db] text-white rounded-full text-xs font-bold">
                                    {activity.tag}
                                </span>
                            )}
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold mb-2">
                                <CalendarIcon className="w-4 h-4" />
                                {activity.date}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1.5 leading-snug">{activity.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{activity.excerpt}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="flex gap-1.5">
                    {activities.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToIndex(i)}
                            aria-label={`Voir l'activité ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === activeIndex ? 'w-6 bg-[#1a56db]' : 'w-1.5 bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <div className="hidden sm:flex gap-2">
                    <button
                        onClick={() => scrollByCard(-1)}
                        className="p-2.5 rounded-full border-2 border-gray-200 hover:border-[#1a56db] hover:text-[#1a56db] transition-colors"
                        aria-label="Activité précédente"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scrollByCard(1)}
                        className="p-2.5 rounded-full border-2 border-gray-200 hover:border-[#1a56db] hover:text-[#1a56db] transition-colors"
                        aria-label="Activité suivante"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityCarousel;
