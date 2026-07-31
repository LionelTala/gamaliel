// resources/js/pages/Components/Hero/Hero.tsx
import { Link } from '@inertiajs/react';
import  './Hero.style.css';

interface HeroProps {
  scrollTo: (sectionId: string) => void;
}

const Hero = ({ scrollTo }: HeroProps) => {
  return (

    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
      aria-labelledby="hero-title"
    >

      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/img1.jpeg"
          alt="CAB Informatique - Formation professionnelle"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="text-xs text-white/60 mb-6">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80" aria-current="page">
              CAB Informatique
            </li>
          </ol>
        </nav>

        {/* Grille principale */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texte */}
          <div className="space-y-6 animate-slide-up" data-reveal>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/10">
              <img
                src="/assets/images/logo.jpeg"
                alt="CAB"
                className="h-6 w-auto object-contain"
                loading="lazy"
              />
              <span>Rentrée académique 2026-2027</span>
            </div>

            {/* Titre */}
            <h1
              id="hero-title"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white"
            >
              Formez-vous <br />
              <span className="text-white/90">aujourd'hui</span> <br />
              pour <span className="text-white/90">réussir demain</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-lg">
              <strong className="text-white">CAB Informatique</strong> forme aux métiers de l'informatique depuis{' '}
              <strong className="text-white">22 ans</strong>.
              Découvrez nos <strong className="text-white">formations professionnelles</strong> à Douala, Yaoundé et Bafoussam.
            </p>

            {/* Statistiques */}
            <div className="flex items-center gap-8" aria-label="Statistiques clés">
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-white" aria-label="22 ans">
                  22+
                </span>
                <span className="text-xs text-white/60 font-medium">Ans d'expérience</span>
              </div>
              <div className="w-px h-10 bg-white/20" aria-hidden="true"></div>
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-white" aria-label="6 filières">
                  6
                </span>
                <span className="text-xs text-white/60 font-medium">Filières</span>
              </div>
              <div className="w-px h-10 bg-white/20" aria-hidden="true"></div>
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-white" aria-label="3 campus">
                  3
                </span>
                <span className="text-xs text-white/60 font-medium">Campus</span>
              </div>
            </div>

            {/* Boutons CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollTo('certification')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cab-blue rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer"
              >
                <span aria-hidden="true">📝</span> Certification en ligne
              </button>
              <button
                onClick={() => scrollTo('formations')}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/60 transition-all cursor-pointer"
              >
                <span aria-hidden="true">📚</span> Découvrir
              </button>
            </div>
          </div>

          {/* Carte Hero */}
          <div className="relative" data-reveal data-reveal-delay="2">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in">
              <div className="text-center">
                {/* Logo dans la carte */}
                <img
                  src="/assets/images/logo.jpeg"
                  alt="CAB Informatique"
                  className="w-24 h-24 mx-auto mb-4 object-contain rounded-full border-4 border-cab-blue p-2 bg-white"
                  loading="lazy"
                />

                <h2 className="text-2xl font-bold text-gray-900">Rentrée académique</h2>
                <p className="text-xl font-semibold text-cab-red mt-2">
                  Lundi 05 Octobre 2026
                </p>

                {/* Niveaux */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    CEP
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    BEPC
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    PROBATOIRE
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    BACCALAURÉAT
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    Étudiants
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold">
                    Professionnels
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
