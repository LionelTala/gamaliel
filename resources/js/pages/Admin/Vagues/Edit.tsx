// resources/js/pages/Admin/Vagues/Edit.tsx
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Vague {
    id: number;
    formation_id: number;
    name: string;
    date_debut: string;
    date_fin: string;
    capacite: number | null;
    is_active: boolean;
    order: number;
}

interface Props {
    vague: Vague;
    formations: Formation[];
}

export default function Edit({ vague, formations }: Props) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [data, setData] = useState({
        formation_id: vague.formation_id.toString(),
        name: vague.name || '',
        date_debut: vague.date_debut || '',
        date_fin: vague.date_fin || '',
        capacite: vague.capacite?.toString() || '',
        is_active: vague.is_active ?? true,
        order: vague.order ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post(`/admin/vagues/${vague.id}`, {
            ...data,
            _method: 'put',
        }, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                router.visit('/admin/vagues');
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            },
        });
    };

    return (
        <>
            <Head title="Modifier la vague - Admin" />

            <AdminLayout title="Modifier la vague">
                <div className="max-w-2xl">
                    <Link
                        href="/admin/vagues"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Formation associée */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => setData({ ...data, formation_id: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une formation --</option>
                                    {formations.map((formation) => (
                                        <option key={formation.id} value={formation.id}>
                                            {formation.name} ({formation.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                {errors.formation_id && <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>}
                            </div>

                            {/* Nom de la vague */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom de la vague <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de début <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="date_debut"
                                        type="date"
                                        value={data.date_debut}
                                        onChange={(e) => setData({ ...data, date_debut: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                    {errors.date_debut && <p className="mt-1 text-sm text-red-600">{errors.date_debut}</p>}
                                </div>
                                <div>
                                    <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de fin <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="date_fin"
                                        type="date"
                                        value={data.date_fin}
                                        onChange={(e) => setData({ ...data, date_fin: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                    {errors.date_fin && <p className="mt-1 text-sm text-red-600">{errors.date_fin}</p>}
                                </div>
                            </div>

                            {/* Capacité */}
                            <div>
                                <label htmlFor="capacite" className="block text-sm font-medium text-gray-700 mb-1">
                                    Capacité (nombre de places)
                                </label>
                                <input
                                    id="capacite"
                                    type="number"
                                    value={data.capacite}
                                    onChange={(e) => setData({ ...data, capacite: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: 30 (laisser vide pour illimité)"
                                    min="1"
                                />
                                <p className="text-xs text-gray-400 mt-1">Laissez vide pour une capacité illimitée</p>
                                {errors.capacite && <p className="mt-1 text-sm text-red-600">{errors.capacite}</p>}
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData({ ...data, is_active: e.target.checked })}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Vague active
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre d'affichage
                                    </label>
                                    <input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mise à jour en cours...
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="w-5 h-5" />
                                        Mettre à jour
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
