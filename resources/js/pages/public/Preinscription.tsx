// resources/js/pages/public/Preinscription.tsx
import { ArrowLeftIcon, UserIcon, EnvelopeIcon, PhoneIcon, AcademicCapIcon, ChatBubbleLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import PublicLayout from '@/Components/PublicLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Props {
    formation: Formation | null;
}

export default function Preinscription({ formation }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        formation_id: formation?.id || '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        niveau_scolaire: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/candidatures');
    };

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, 0);

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, []);

    const title = `Pré-inscription — ${formation?.name || 'Formation'} | Institut Gamaliel`;

    return (
        <>
            <Head title={title} />

            <PublicLayout>
                {/* ============================================ */}
                {/* HEADER */}
                {/* ============================================ */}
                <section className="relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-16">
                    <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-28 -right-10 w-96 h-96 rounded-full bg-gamaliel-orange/20 blur-[110px]" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85">
                                <AcademicCapIcon className="w-4 h-4 text-gamaliel-green" />
                                Candidature en ligne
                            </span>
                            <h1 className="font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight">
                                Pré-inscription{' '}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: 'linear-gradient(100deg, #FD7D0F, #E13A4B)' }}
                                >
                                    en ligne
                                </span>
                            </h1>
                            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                                {formation?.name
                                    ? `Rejoignez la formation ${formation.name}`
                                    : 'Remplissez le formulaire ci-dessous pour candidater à l\'Institut Gamaliel'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* FORMULAIRE */}
                {/* ============================================ */}
                <section className="py-16 bg-gamaliel-paper">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/formations"
                            className="inline-flex items-center gap-2 text-sm text-gamaliel-navy/50 hover:text-gamaliel-orange transition-colors mb-6"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour aux formations
                        </Link>

                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gamaliel-navy/5">
                            <div className="mb-6">
                                <h2 className="font-display text-2xl font-bold text-gamaliel-navy-deep">Vos informations</h2>
                                <p className="text-sm text-gamaliel-navy/50 mt-1">
                                    Remplissez ce formulaire pour être contacté par notre équipe pédagogique.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Récapitulatif de formation — carte plutôt qu'encart plat */}
                                <div className="flex items-center gap-3 rounded-2xl p-4 border border-gamaliel-orange/20 bg-gamaliel-orange/5">
                                    <div className="w-10 h-10 rounded-xl bg-gamaliel-orange/15 text-gamaliel-orange flex items-center justify-center shrink-0">
                                        <AcademicCapIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gamaliel-orange uppercase tracking-wide">Formation choisie</p>
                                        <p className="text-sm font-semibold text-gamaliel-navy-deep mt-0.5">
                                            {formation?.name || 'Non spécifiée — précisez-la dans le message ci-dessous'}
                                        </p>
                                    </div>
                                </div>

                                {/* Nom + Prénom */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="nom" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                            Nom <span className="text-gamaliel-red">*</span>
                                        </label>
                                        <input
                                            id="nom"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) => setData('nom', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                            placeholder="Votre nom"
                                            required
                                        />
                                        {errors.nom && <p className="mt-1 text-sm text-gamaliel-red">{errors.nom}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="prenom" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                            Prénom <span className="text-gamaliel-red">*</span>
                                        </label>
                                        <input
                                            id="prenom"
                                            type="text"
                                            value={data.prenom}
                                            onChange={(e) => setData('prenom', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                            placeholder="Votre prénom"
                                            required
                                        />
                                        {errors.prenom && <p className="mt-1 text-sm text-gamaliel-red">{errors.prenom}</p>}
                                    </div>
                                </div>

                                {/* Email (Optionnel) */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        Email <span className="text-gamaliel-navy/30 text-xs">(optionnel)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EnvelopeIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                            placeholder="exemple@email.com"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-gamaliel-red">{errors.email}</p>}
                                </div>

                                {/* Téléphone WhatsApp */}
                                <div>
                                    <label htmlFor="telephone" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        Téléphone (WhatsApp) <span className="text-gamaliel-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                        </div>
                                        <input
                                            id="telephone"
                                            type="tel"
                                            value={data.telephone}
                                            onChange={(e) => setData('telephone', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                            placeholder="Ex : 6 96 08 40 48"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gamaliel-navy/40 mt-1 flex items-center gap-1">
                                        <CheckBadgeIcon className="w-3.5 h-3.5 text-gamaliel-green-deep" />
                                        Numéro WhatsApp pour recevoir vos identifiants
                                    </p>
                                    {errors.telephone && <p className="mt-1 text-sm text-gamaliel-red">{errors.telephone}</p>}
                                </div>

                                {/* Niveau scolaire */}
                                <div>
                                    <label htmlFor="niveau_scolaire" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        Niveau scolaire
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AcademicCapIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                        </div>
                                        <select
                                            id="niveau_scolaire"
                                            value={data.niveau_scolaire}
                                            onChange={(e) => setData('niveau_scolaire', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors bg-white"
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="CEP">CEP</option>
                                            <option value="BEPC">BEPC</option>
                                            <option value="PROBATOIRE">Probatoire</option>
                                            <option value="BAC">Baccalauréat</option>
                                            <option value="BAC+2">BAC+2</option>
                                            <option value="LICENCE">Licence</option>
                                            <option value="MASTER">Master ou plus</option>
                                        </select>
                                    </div>
                                    {errors.niveau_scolaire && <p className="mt-1 text-sm text-gamaliel-red">{errors.niveau_scolaire}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        Message <span className="text-gamaliel-navy/30 text-xs">(optionnel)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                            <ChatBubbleLeftIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                        </div>
                                        <textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={4}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors resize-none"
                                            placeholder="Votre message... (précisez ici la formation souhaitée si elle n'est pas déjà indiquée ci-dessus)"
                                        />
                                    </div>
                                    {errors.message && <p className="mt-1 text-sm text-gamaliel-red">{errors.message}</p>}
                                </div>

                                {/* Bouton */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-white rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                                    style={{
                                        background: 'linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)',
                                        boxShadow: '0 10px 20px -6px rgba(225,58,75,0.4)',
                                    }}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <UserIcon className="w-5 h-5" />
                                            Envoyer ma candidature
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gamaliel-navy/40 mt-4">
                                    * Champs obligatoires. En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour le traitement de votre candidature.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
