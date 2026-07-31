// resources/js/pages/Components/Hero/HeroIndicators.tsx
interface HeroIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

const HeroIndicators = ({ total, current, onSelect }: HeroIndicatorsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`
            transition-all duration-300 rounded-full
            ${current === index
              ? 'w-10 h-2.5 bg-white'
              : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }
          `}
          aria-label={`Aller à la slide ${index + 1}`}
          aria-current={current === index ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

export default HeroIndicators;
