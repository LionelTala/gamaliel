// resources/js/Components/Home/RevealSection.tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode } from 'react';


interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
}

const RevealSection = ({ children, delay = 0, className = '', as = 'div' }: Props) => {
    const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
    const Tag = as as any;

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            {children}
        </Tag>
    );
};

export default RevealSection;
