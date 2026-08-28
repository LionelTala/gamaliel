// resources/js/pages/Auth/Login.tsx
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, PhoneIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

// Couleur d'action unique du site — vert en primaire, aucun dégradé
const ACTION_COLOR = '#6FA30E';       // gamaliel-green-deep
const ACTION_COLOR_HOVER = '#5C8A0B';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const getInputPlaceholder = () => {
        return loginType === 'email' ? 'exemple@email.com' : '6XX XXX XXX';
    };

    const getInputType = () => {
        return loginType === 'email' ? 'email' : 'tel';
    };

    return (
        <>
            <Head title="Connexion — Institut Gamaliel" />

            <div className="min-h-screen flex bg-gamaliel-paper">

                {/* ============================================ */}
                {/* PANNEAU DE MARQUE — visible dès md, invisible sur mobile */}
                {/* ============================================ */}
                <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden bg-gamaliel-navy-deep text-white flex-col justify-between p-12">
                    <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/20 blur-[60px]" />
                    <div className="pointer-events-none absolute -bottom-28 -right-10 w-96 h-96 rounded-full bg-gamaliel-green/10 blur-[60px]" />

                    <Link href="/" className="relative flex items-center gap-3">
                        <img
                            src="/assets/images/logo.png"
                            alt="Institut Gamaliel"
                            className="h-11 w-11 rounded-xl object-cover"
                        />
                        <span className="font-display font-bold text-lg">Institut Gamaliel</span>
                    </Link>

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 mb-6">
                            <ShieldCheckIcon className="w-4 h-4 text-gamaliel-green" />
                            Espace personnel sécurisé
                        </span>
                        <h1 className="font-display font-bold text-3xl xl:text-4xl leading-tight">
                            Retrouvez votre
                            <br />
                            parcours de formation
                        </h1>
                        <p className="text-white/60 mt-4 max-w-sm leading-relaxed">
                            Accédez à vos formations, votre pré-inscription et vos échanges avec l'équipe pédagogique de l'Institut Gamaliel.
                        </p>
                    </div>

                    <p className="relative text-xs text-white/35">
                        &copy; {new Date().getFullYear()} Institut de Formation Professionnelle Gamaliel — Douala
                    </p>
                </div>

                {/* ============================================ */}
                {/* FORMULAIRE */}
                {/* ============================================ */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12">
                    <div className="max-w-md w-full space-y-8">

                        {/* Logo mobile uniquement */}
                        <div className="text-center lg:text-left">
                            <Link href="/" className="inline-block lg:hidden mb-6">
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Institut Gamaliel"
                                    className="h-14 w-14 rounded-xl object-cover mx-auto"
                                />
                            </Link>
                            <h2 className="font-display text-3xl font-bold text-gamaliel-navy-deep">
                                Connexion
                            </h2>
                            <p className="mt-2 text-sm text-gamaliel-navy/60">
                                Connectez-vous avec votre email ou votre numéro de téléphone
                            </p>
                        </div>

                        {/* Message de sécurité */}
                        <div className="bg-gamaliel-green/10 border border-gamaliel-green/25 rounded-xl p-3.5">
                            <div className="flex items-start gap-2.5">
                                <ShieldCheckIcon className="w-5 h-5 text-gamaliel-green-deep flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gamaliel-navy/80">
                                    Après <strong>5 tentatives échouées</strong>, votre accès sera bloqué pendant <strong>5 minutes</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Formulaire */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Sélecteur email / téléphone — indicateur glissant vert plein */}
                            <div className="relative flex rounded-xl bg-white border border-gamaliel-navy/10 p-1">
                                <div
                                    className="absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-out"
                                    style={{
                                        backgroundColor: ACTION_COLOR,
                                        width: 'calc(50% - 4px)',
                                        left: loginType === 'email' ? '4px' : 'calc(50% + 0px)',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setLoginType('email')}
                                    className={`relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                        loginType === 'email' ? 'text-white' : 'text-gamaliel-navy/50 hover:text-gamaliel-navy'
                                    }`}
                                >
                                    <EnvelopeIcon className="w-4 h-4 inline mr-2 -mt-0.5" />
                                    Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginType('phone')}
                                    className={`relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                        loginType === 'phone' ? 'text-white' : 'text-gamaliel-navy/50 hover:text-gamaliel-navy'
                                    }`}
                                >
                                    <PhoneIcon className="w-4 h-4 inline mr-2 -mt-0.5" />
                                    Téléphone
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Login (Email ou Téléphone) */}
                                <div>
                                    <label htmlFor="login" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        {loginType === 'email' ? 'Adresse email' : 'Numéro de téléphone'}
                                        <span className="text-gamaliel-red ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            {loginType === 'email' ? (
                                                <EnvelopeIcon className="h-5 w-5 text-gamaliel-navy/30" />
                                            ) : (
                                                <PhoneIcon className="h-5 w-5 text-gamaliel-navy/30" />
                                            )}
                                        </div>
                                        <input
                                            id="login"
                                            type={getInputType()}
                                            value={data.login}
                                            onChange={(e) => setData('login', e.target.value)}
                                            className={`appearance-none block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gamaliel-navy/30 text-gamaliel-navy-deep bg-white focus:outline-none focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors ${
                                                errors.login ? 'border-gamaliel-red' : 'border-gamaliel-navy/15'
                                            }`}
                                            placeholder={getInputPlaceholder()}
                                            required
                                        />
                                    </div>
                                    {errors.login && (
                                        <p className="mt-1 text-sm text-gamaliel-red">{errors.login}</p>
                                    )}
                                </div>

                                {/* Mot de passe */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                        Mot de passe <span className="text-gamaliel-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="h-5 w-5 text-gamaliel-navy/30" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={`appearance-none block w-full pl-10 pr-12 py-3 border rounded-xl placeholder-gamaliel-navy/30 text-gamaliel-navy-deep bg-white focus:outline-none focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors ${
                                                errors.password ? 'border-gamaliel-red' : 'border-gamaliel-navy/15'
                                            }`}
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gamaliel-navy/30 hover:text-gamaliel-navy/60"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-gamaliel-red">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 text-gamaliel-green-deep focus:ring-gamaliel-green-deep border-gamaliel-navy/20 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gamaliel-navy/70">
                                            Se souvenir de moi
                                        </label>
                                    </div>
                                    <Link
                                        href="#"
                                        className="text-sm font-semibold text-gamaliel-green-deep hover:text-gamaliel-navy transition-colors"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                            </div>

                            {/* Bouton — vert plein, plus de dégradé */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center items-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                                style={{
                                    backgroundColor: ACTION_COLOR,
                                    boxShadow: '0 10px 20px -6px rgba(111,163,14,0.4)',
                                }}
                                onMouseEnter={(e) => !processing && (e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACTION_COLOR)}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion en cours...
                                    </span>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        {/* Lien retour accueil */}
                        <div className="text-center lg:text-left">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-sm text-gamaliel-navy/50 hover:text-gamaliel-green-deep transition-colors"
                            >
                                <ArrowLeftIcon className="w-3.5 h-3.5" />
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}