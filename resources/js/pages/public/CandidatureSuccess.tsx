// resources/js/pages/public/CandidatureSuccess.tsx
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Components/PublicLayout';

export default function CandidatureSuccess() {
    return (
        <>
            <Head title="Candidature envoyée - CAB Informatique" />

            <PublicLayout>
                <section className="min-h-[60vh] flex items-center justify-center py-20">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircleIcon className="w-12 h-12 text-green-600" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            ✅ Candidature envoyée !
                        </h1>

                        <p className="mt-4 text-lg text-gray-600">
                            Votre candidature a été reçue avec succès. Notre équipe l'examine et vous contactera sous 48h.
                        </p>

                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-left">
                            <p className="text-sm text-blue-700">
                                📱 <strong>Prochaines étapes :</strong>
                            </p>
                            <ul className="text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside">
                                <li>Notre équipe étudiera votre dossier</li>
                                <li>Vous serez contacté(e) par WhatsApp sous 48h</li>
                                <li>Si votre candidature est acceptée, vous recevrez vos identifiants</li>
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/formations"
                                className="px-6 py-3 bg-cab-blue text-white rounded-xl font-semibold hover:bg-cab-dark transition-colors"
                            >
                                Voir les formations
                            </Link>
                            <Link
                                href="/"
                                className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
