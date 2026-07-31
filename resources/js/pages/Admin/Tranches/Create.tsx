// resources/js/pages/Admin/Tranches/Create.tsx
import {
    ArrowLeftIcon,
    BanknotesIcon,
    LinkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Props {
    formations: Formation[];
    formationId?: string | null;
}

export default function Create({ formations, formationId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        formation_id: formationId || '',
        montant: '',
        lien_paiement: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/tranches', {
            preserveScroll: true,
            onSuccess: () => {
                // Rediriger vers la liste des tranches
                window.location.href = `/admin/tranches?formation_id=${data.formation_id}`;
            },
        });
    };

    // Calcul du prochain numéro de tranche (estimation)
    const formation = formations.find(f => f.id === Number(data.formation_id));
    const nextNumero = formation ? 1 : 0; // Sera calculé côté serveur

    return (
        <>
            <Head title="Ajouter une tranche - Admin" />

            <AdminLayout title="Ajouter une tranche">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href={`/admin/tranches${data.formation_id ? `?formation_id=${data.formation_id}` : ''}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste des tranches
                    </Link>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <BanknotesIcon className="w-6 h-6 text-cab-blue" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Ajouter une tranche</h1>
                                <p className="text-sm text-gray-500">
                                    Définissez une nouvelle tranche de paiement pour une formation
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Formation */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => setData('formation_id', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une formation --</option>
                                    {formations.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                {errors.formation_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>
                                )}
                            </div>

                            {/* Numéro de tranche (auto-calculé) */}
                            {data.formation_id && (
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-sm text-blue-700">
                                        <span className="font-semibold">Numéro de la tranche :</span>
                                        <span className="ml-2">
                                            Tranche {formations.find(f => f.id === Number(data.formation_id))
                                                ? 'Nouvelle'
                                                : '1'} (auto-incrémenté)
                                        </span>
                                    </p>
                                    <p className="text-xs text-blue-500 mt-1">
                                        Le numéro de la tranche sera automatiquement attribué par le système
                                    </p>
                                </div>
                            )}

                            {/* Montant */}
                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
                                    Montant (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BanknotesIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="montant"
                                        type="number"
                                        min="0"
                                        step="100"
                                        value={data.montant}
                                        onChange={(e) => setData('montant', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: 150000"
                                        required
                                    />
                                </div>
                                {errors.montant && (
                                    <p className="mt-1 text-sm text-red-600">{errors.montant}</p>
                                )}
                            </div>

                            {/* Lien de paiement */}
                            <div>
                                <label htmlFor="lien_paiement" className="block text-sm font-medium text-gray-700 mb-1">
                                    Lien de paiement
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LinkIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="lien_paiement"
                                        type="url"
                                        value={data.lien_paiement}
                                        onChange={(e) => setData('lien_paiement', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="https://exemple.com/paiement-tranche"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-400">
                                    Lien vers la page de paiement pour cette tranche spécifique
                                </p>
                                {errors.lien_paiement && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lien_paiement}</p>
                                )}
                            </div>

                            {/* Résumé */}
                            {data.formation_id && data.montant && (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Résumé</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Formation :</span>
                                            <span className="font-medium text-gray-900">
                                                {formations.find(f => f.id === Number(data.formation_id))?.name || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Montant :</span>
                                            <span className="font-medium text-gray-900">
                                                {Number(data.montant).toLocaleString()} FCFA
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Lien de paiement :</span>
                                            <span className="font-medium text-gray-900 truncate max-w-[200px]">
                                                {data.lien_paiement || 'Non défini'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/tranches${data.formation_id ? `?formation_id=${data.formation_id}` : ''}`}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Création...
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon className="w-5 h-5" />
                                            Ajouter la tranche
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
