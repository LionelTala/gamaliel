// resources/js/pages/Components/Hero/HeroSlide.tsx
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

import type { HeroSlide } from '@/types/hero';

interface HeroSlideProps {
  slide: HeroSlide;
  isActive: boolean;
}

const HeroSlide = ({ slide, isActive }: HeroSlideProps) => {
  return (
    <div
      className={`
        absolute inset-0 transition-opacity duration-1000 ease-in-out
        ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}
      `}
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('${slide.image}')` }}
      >
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-cab-dark/90 via-cab-dark/70 to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10 mb-6 animate-fade-in">
                <SparklesIcon className="w-4 h-4" />
                {slide.badge}
              </div>
            )}

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-slide-up">
              {slide.title.split('<br>').map((part, index) => (
                <span key={index}>
                  {part}
                  {index < slide.title.split('<br>').length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Sous-titre */}
            {slide.subtitle && (
              <p className="mt-4 text-xl text-white/80 font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {slide.subtitle}
              </p>
            )}

            {/* Description */}
            <p className="mt-4 text-lg text-white/70 max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {slide.description}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href={slide.ctaPrimary.link}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cab-blue rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
              >
                <SparklesIcon className="w-5 h-5" />
                {slide.ctaPrimary.text}
              </Link>

              {slide.ctaSecondary && (
                <Link
                  href={slide.ctaSecondary.link}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                >
                  {slide.ctaSecondary.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
