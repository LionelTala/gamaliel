// resources/js/data/heroData.ts
import type { HeroSlide } from '@/types/hero';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Formez-vous<br>aujourd\'hui<br>pour réussir <span class="text-cab-red">demain</span>',
    subtitle: 'CAB Informatique - 22 ans d\'excellence',
    description: 'Des formations professionnelles en informatique et gestion à Douala, Yaoundé et Bafoussam.',
    image: '/assets/images/img1.jpeg',
    badge: 'Rentrée académique 2026-2027',
    ctaPrimary: {
      text: 'Certification en ligne',
      link: '/certification'
    },
    ctaSecondary: {
      text: 'En savoir plus',
      link: '#avantages'
    }
  },
  // Ajouter d'autres slides plus tard pour le carrousel
  // {
  //   id: 2,
  //   title: 'Titre slide 2',
  //   subtitle: 'Sous-titre slide 2',
  //   description: 'Description slide 2',
  //   image: '/assets/images/img2.jpeg',
  //   badge: 'Badge slide 2',
  //   ctaPrimary: {
  //     text: 'CTA Principal',
  //     link: '/lien'
  //   }
  // }
];
