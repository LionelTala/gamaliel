// resources/js/pages/admin/Contacts.tsx
import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import {
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    PhoneIcon,
    TrashIcon,
    XMarkIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Palette en dur — cohérente avec le fix appliqué sur AdminLayout,
// pour éviter tout risque de classes Tailwind custom non générées.
const COLORS = {
    navy: '#153B62',
    navyDeep: '#0D2844',
    navyMuted: 'rgba(21,59,98,0.7)',
    navyFaint: 'rgba(21,59,98,0.5)',
    navyBorder: 'rgba(21,59,98,0.1)',
    navySoftBg: 'rgba(21,59,98,0.05)',
    green: '#6FA30E',
    greenSoftBg: 'rgba(111,163,14,0.12)',
    red: '#E13A4B',
    redSoftBg: 'rgba(225,58,75,0.1)',
    paper: '#FAFAF8',
    white: '#FFFFFF',
};

interface Contact {
    id: number;
    nom: string;
    email: string | null;
    telephone: string;
    sujet: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface PaginatedContacts {
    data: Contact[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    contacts: PaginatedContacts;
}

export default function Contacts({ contacts }: Props) {
    const [selected, setSelected] = useState<Contact | null>(null);
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const filtered = contacts.data.filter((c) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
            c.nom.toLowerCase().includes(q) ||
            c.telephone.toLowerCase().includes(q) ||
            (c.email ?? '').toLowerCase().includes(q) ||
            c.message.toLowerCase().includes(q)
        );
    });

    const unreadCount = contacts.data.filter((c) => !c.is_read).length;

    const openMessage = (contact: Contact) => {
        setSelected(contact);
        if (!contact.is_read) {
            router.patch(`/admin/contacts/${contact.id}/read`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // Met à jour l'état local pour un retour visuel immédiat
                    contact.is_read = true;
                },
            });
        }
    };

    const closeMessage = () => setSelected(null);

    const confirmDelete = (contact: Contact) => {
        if (!window.confirm(`Supprimer définitivement le message de ${contact.nom} ?`)) return;

        setDeletingId(contact.id);
        router.delete(`/admin/contacts/${contact.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                if (selected?.id === contact.id) closeMessage();
            },
            onFinish: () => setDeletingId(null),
        });
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const excerpt = (text: string, len = 90) =>
        text.length > len ? `${text.slice(0, len)}…` : text;

    return (
        <AdminLayout title="Messages de contact">
            <Head title="Messages de contact — Admin Gamaliel" />

            <div className="space-y-5">

                {/* Barre d'outils */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: COLORS.greenSoftBg }}
                        >
                            <ChatBubbleLeftRightIcon className="w-5 h-5" style={{ color: COLORS.green }} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold" style={{ color: COLORS.navyDeep }}>
                                {contacts.total} message{contacts.total > 1 ? 's' : ''} au total
                            </p>
                            {unreadCount > 0 && (
                                <p className="text-xs" style={{ color: COLORS.red }}>
                                    {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="w-4 h-4" style={{ color: COLORS.navyFaint }} />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un nom, un numéro..."
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-colors"
                            style={{
                                borderColor: COLORS.navyBorder,
                                backgroundColor: COLORS.white,
                                color: COLORS.navyDeep,
                            }}
                            onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.green}55`)}
                            onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                        />
                    </div>
                </div>

                {/* Liste */}
                {filtered.length === 0 ? (
                    <div
                        className="rounded-2xl border p-12 text-center"
                        style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}
                    >
                        <ChatBubbleLeftRightIcon
                            className="w-12 h-12 mx-auto mb-3"
                            style={{ color: COLORS.navyBorder }}
                        />
                        <p className="text-sm" style={{ color: COLORS.navyFaint }}>
                            {search ? 'Aucun message ne correspond à cette recherche.' : 'Aucun message reçu pour le moment.'}
                        </p>
                    </div>
                ) : (
                    <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}>
                        <ul className="divide-y" style={{ borderColor: COLORS.navyBorder }}>
                            {filtered.map((contact) => (
                                <li key={contact.id}>
                                    <button
                                        onClick={() => openMessage(contact)}
                                        className="w-full text-left flex items-start gap-4 px-5 py-4 transition-colors"
                                        style={{ backgroundColor: contact.is_read ? 'transparent' : COLORS.greenSoftBg }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.navySoftBg)}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = contact.is_read ? 'transparent' : COLORS.greenSoftBg)
                                        }
                                    >
                                        {/* Pastille non-lu */}
                                        <div className="pt-1.5 shrink-0">
                                            <span
                                                className="block w-2 h-2 rounded-full"
                                                style={{ backgroundColor: contact.is_read ? 'transparent' : COLORS.green }}
                                            />
                                        </div>

                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                                            style={{ backgroundColor: COLORS.navyDeep, color: COLORS.white }}
                                        >
                                            {contact.nom.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-3">
                                                <p
                                                    className="text-sm truncate"
                                                    style={{
                                                        color: COLORS.navyDeep,
                                                        fontWeight: contact.is_read ? 500 : 700,
                                                    }}
                                                >
                                                    {contact.nom}
                                                    {contact.sujet && (
                                                        <span
                                                            className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium"
                                                            style={{ backgroundColor: COLORS.navySoftBg, color: COLORS.navy }}
                                                        >
                                                            {contact.sujet}
                                                        </span>
                                                    )}
                                                </p>
                                                <span className="text-xs shrink-0" style={{ color: COLORS.navyFaint }}>
                                                    {formatDate(contact.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-sm mt-0.5 truncate" style={{ color: COLORS.navyFaint }}>
                                                {excerpt(contact.message)}
                                            </p>
                                            <p className="text-xs mt-1 flex items-center gap-3" style={{ color: COLORS.navyFaint }}>
                                                <span className="flex items-center gap-1">
                                                    <PhoneIcon className="w-3.5 h-3.5" />
                                                    {contact.telephone}
                                                </span>
                                                {contact.email && (
                                                    <span className="flex items-center gap-1">
                                                        <EnvelopeIcon className="w-3.5 h-3.5" />
                                                        {contact.email}
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirmDelete(contact);
                                            }}
                                            disabled={deletingId === contact.id}
                                            className="p-2 rounded-lg transition-colors shrink-0 disabled:opacity-40"
                                            style={{ color: COLORS.red }}
                                            title="Supprimer"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Pagination */}
                {contacts.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-2">
                        {contacts.links.map((link, i) => {
                            const isPrevNext = link.label.includes('Previous') || link.label.includes('Next');
                            const label = link.label.includes('Previous') ? (
                                <ChevronLeftIcon className="w-4 h-4" />
                            ) : link.label.includes('Next') ? (
                                <ChevronRightIcon className="w-4 h-4" />
                            ) : (
                                link.label
                            );

                            if (!link.url) {
                                return (
                                    <span
                                        key={i}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg text-sm"
                                        style={{ color: COLORS.navyBorder }}
                                    >
                                        {label}
                                    </span>
                                );
                            }

                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    preserveScroll
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors"
                                    style={
                                        link.active
                                            ? { backgroundColor: COLORS.navyDeep, color: COLORS.white }
                                            : { color: COLORS.navyMuted, backgroundColor: COLORS.white, border: `1px solid ${COLORS.navyBorder}` }
                                    }
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal détail message */}
            {selected && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(13,40,68,0.6)', backdropFilter: 'blur(4px)' }}
                    onClick={closeMessage}
                >
                    <div
                        className="rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                        style={{ backgroundColor: COLORS.white }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="sticky top-0 px-6 py-4 rounded-t-3xl flex items-center justify-between border-b"
                            style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold"
                                    style={{ backgroundColor: COLORS.navyDeep, color: COLORS.white }}
                                >
                                    {selected.nom.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-base font-bold" style={{ color: COLORS.navyDeep }}>
                                        {selected.nom}
                                    </p>
                                    <p className="text-xs" style={{ color: COLORS.navyFaint }}>
                                        {formatDate(selected.created_at)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeMessage}
                                className="p-2 rounded-full transition-colors"
                                style={{ color: COLORS.navyFaint }}
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {selected.sujet && (
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: COLORS.navySoftBg, color: COLORS.navy }}
                                >
                                    {selected.sujet}
                                </span>
                            )}

                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: COLORS.navyFaint }}>
                                    Message
                                </h3>
                                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: COLORS.navyDeep }}>
                                    {selected.message}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div
                                    className="rounded-xl p-3 text-center"
                                    style={{ backgroundColor: COLORS.paper }}
                                >
                                    <PhoneIcon className="w-4 h-4 mx-auto mb-1" style={{ color: COLORS.green }} />
                                    <p className="text-xs" style={{ color: COLORS.navyFaint }}>Téléphone</p>
                                    <p className="text-sm font-semibold" style={{ color: COLORS.navyDeep }}>
                                        {selected.telephone}
                                    </p>
                                </div>
                                <div
                                    className="rounded-xl p-3 text-center"
                                    style={{ backgroundColor: COLORS.paper }}
                                >
                                    <EnvelopeIcon className="w-4 h-4 mx-auto mb-1" style={{ color: COLORS.green }} />
                                    <p className="text-xs" style={{ color: COLORS.navyFaint }}>Email</p>
                                    <p className="text-sm font-semibold truncate" style={{ color: COLORS.navyDeep }}>
                                        {selected.email || '—'}
                                    </p>
                                </div>
                            </div>

                            {/* Actions rapides — répondre directement */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t" style={{ borderColor: COLORS.navyBorder }}>
                                
                                <a    href={`https://wa.me/${selected.telephone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                        `Bonjour ${selected.nom}, merci pour votre message à l'Institut Gamaliel.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                                    style={{ backgroundColor: '#25D366' }}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z"/>
                                    </svg>
                                    Répondre sur WhatsApp
                                </a>

                                {selected.email && (
                                    
                                    <a    href={`mailto:${selected.email}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                                        style={{ backgroundColor: COLORS.green }}
                                    >
                                        <EnvelopeIcon className="w-4 h-4" />
                                        Répondre par email
                                    </a>
                                )}
                            </div>

                            <button
                                onClick={() => confirmDelete(selected)}
                                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                                style={{ color: COLORS.red, backgroundColor: COLORS.redSoftBg }}
                            >
                                <TrashIcon className="w-4 h-4" />
                                Supprimer ce message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}