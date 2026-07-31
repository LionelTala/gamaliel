// resources/js/Components/UI/Pagination.tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
}

export default function Pagination({ links, from, to, total }: PaginationProps) {
    if (links.length <= 3) return null; // rien à afficher s'il n'y a qu'une seule page

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
                {total > 0 ? (
                    <>Affichage de <span className="font-medium">{from}</span> à <span className="font-medium">{to}</span> sur <span className="font-medium">{total}</span> résultats</>
                ) : (
                    'Aucun résultat'
                )}
            </p>

            <div className="flex items-center gap-1">
                {links.map((link, index) => {
                    if (link.label.includes('Previous')) {
                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                className={`p-2 rounded-lg transition-colors ${
                                    link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed pointer-events-none'
                                }`}
                            >
                                <ChevronLeftIcon className="w-4 h-4" />
                            </Link>
                        );
                    }

                    if (link.label.includes('Next')) {
                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                className={`p-2 rounded-lg transition-colors ${
                                    link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed pointer-events-none'
                                }`}
                            >
                                <ChevronRightIcon className="w-4 h-4" />
                            </Link>
                        );
                    }

                    // "..." (points de suspension Laravel)
                    if (link.label === '...') {
                        return (
                            <span key={index} className="px-3 py-1.5 text-sm text-gray-400">
                                ...
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            preserveScroll
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-cab-blue text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
