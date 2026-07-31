// resources/js/pages/Admin/Formations/CreatePresentiel.tsx
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { ArrowLeftIcon, PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function CreatePresentiel() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [title, setTitle] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [diplome, setDiplome] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [icon, setIcon] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [ordre, setOrdre] = useState(0);
    const [couleur, setCouleur] = useState<'blue' | 'red'>('blue');

    // Listes
    const [tags, setTags] = useState<string[]>(['Cours du jour', 'Cours du soir']);
    const [debouches, setDebouches] = useState<string[]>([]);
    const [programme, setProgramme] = useState<string[]>([]);

    const [newTag, setNewTag] = useState('');
    const [newDebouche, setNewDebouche] = useState('');
    const [newProgramme, setNewProgramme] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreviewImage(null);
        const fileInput = document.getElementById('image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const addItem = (list: string[], setList: Function, value: string, setValue: Function) => {
        if (value.trim() && !list.includes(value.trim())) {
            setList([...list, value.trim()]);
            setValue('');
        }
    };

    const removeItem = (list: string[], setList: Function, item: string) => {
        setList(list.filter(i => i !== item));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('type', 'presentiel');
        formData.append('title', title);
        formData.append('abbreviation', abbreviation);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('diplome', diplome);
        formData.append('price', price);
        if (icon) formData.append('icon', icon);
        formData.append('tags', JSON.stringify(tags));
        formData.append('debouches', JSON.stringify(debouches));
        formData.append('programme', JSON.stringify(programme));
        formData.append('couleur', couleur);
        formData.append('is_active', isActive ? '1' : '0');
        formData.append('ordre', String(ordre));

        if (image) {
            formData.append('image', image);
        }

        router.post('/admin/formations', formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <>
            <Head title="Créer une formation présentiel" />

            <AdminLayout title="Créer une formation présentiel">
                <div className="max-w-3xl">
                    <Link
                        href="/admin/formations?type=presentiel"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Titre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: Secrétariat Bureautique"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Abréviation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Abréviation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={abbreviation}
                                    onChange={(e) => setAbbreviation(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors uppercase"
                                    maxLength={10}
                                    required
                                />
                                {errors.abbreviation && <p className="mt-1 text-sm text-red-600">{errors.abbreviation}</p>}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image
                                </label>
                                <div className="flex items-center gap-4">
                                    {previewImage ? (
                                        <div className="relative">
                                            <img
                                                src={previewImage}
                                                alt="Aperçu"
                                                className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-xs text-gray-500 mt-1">Ajouter une image</span>
                                            <input
                                                id="image-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    <p className="text-xs text-gray-400">Format recommandé: 800x500 (max 2MB)</p>
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Icône */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Icône (emoji)
                                </label>
                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: 📋, 💻, 🎨"
                                    maxLength={5}
                                />
                            </div>

                            {/* Durée + Diplôme */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Durée <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="8 mois + 2 mois de stage"
                                        required
                                    />
                                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Diplôme <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={diplome}
                                        onChange={(e) => setDiplome(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Certificat de Professionnalisation"
                                        required
                                    />
                                    {errors.diplome && <p className="mt-1 text-sm text-red-600">{errors.diplome}</p>}
                                </div>
                            </div>

                            {/* Prix */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: 250000"
                                    min="0"
                                    step="1000"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: Cours du jour"
                                        onKeyDown={(e) => e.key === 'Enter' && addItem(tags, setTags, newTag, setNewTag)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem(tags, setTags, newTag, setNewTag)}
                                        className="px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((item) => (
                                        <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm">
                                            {item}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(tags, setTags, item)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Débouchés */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Débouchés
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newDebouche}
                                        onChange={(e) => setNewDebouche(e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: Graphiste digital"
                                        onKeyDown={(e) => e.key === 'Enter' && addItem(debouches, setDebouches, newDebouche, setNewDebouche)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem(debouches, setDebouches, newDebouche, setNewDebouche)}
                                        className="px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {debouches.map((item) => (
                                        <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm">
                                            {item}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(debouches, setDebouches, item)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Programme */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Programme
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newProgramme}
                                        onChange={(e) => setNewProgramme(e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: Adobe Illustrator"
                                        onKeyDown={(e) => e.key === 'Enter' && addItem(programme, setProgramme, newProgramme, setNewProgramme)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem(programme, setProgramme, newProgramme, setNewProgramme)}
                                        className="px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {programme.map((item) => (
                                        <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm">
                                            {item}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(programme, setProgramme, item)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Couleur */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Couleur
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="blue"
                                            checked={couleur === 'blue'}
                                            onChange={(e) => setCouleur(e.target.value as 'blue' | 'red')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700">🔵 Bleu</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="red"
                                            checked={couleur === 'red'}
                                            onChange={(e) => setCouleur(e.target.value as 'blue' | 'red')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700">🔴 Rouge</span>
                                    </label>
                                </div>
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label className="text-sm text-gray-700">Formation active</label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre d'affichage
                                    </label>
                                    <input
                                        type="number"
                                        value={ordre}
                                        onChange={(e) => setOrdre(parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Création en cours...' : 'Créer la formation présentiel'}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
