// resources/js/types/hero.d.ts
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  badge?: string;
}

export interface HeroProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
}
