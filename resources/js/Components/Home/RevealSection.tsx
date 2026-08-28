// resources/js/Components/Home/RevealSection.tsx
import { ElementType, ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealSectionProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    delay?: number;
}

export default function RevealSection({
    children,
    as: Tag = 'div',
    className = '',
    delay = 0,
}: RevealSectionProps) {
    const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(0.15);

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </Tag>
    );
}