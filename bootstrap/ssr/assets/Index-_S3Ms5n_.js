import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BookOpenIcon, CheckCircleIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Bibliotheque/Index.tsx
function Index({ livres, stats, filters }) {
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const handleToggle = (id) => {
		if (confirm("Voulez-vous changer le statut de ce livre ?")) router.patch(`/admin/bibliotheque/${id}/toggle`);
	};
	const handleDelete = (id, titre) => {
		if (confirm(`Supprimer le livre "${titre}" ? Cette action est irréversible.`)) router.delete(`/admin/bibliotheque/${id}`);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (filters.statut && filters.statut !== "all") params.set("statut", filters.statut);
		router.visit(`/admin/bibliotheque${params.toString() ? "?" + params.toString() : ""}`);
	};
	const handleStatut = (value) => {
		const params = new URLSearchParams();
		if (value !== "all") params.set("statut", value);
		if (filters.search) params.set("search", filters.search);
		router.visit(`/admin/bibliotheque${params.toString() ? "?" + params.toString() : ""}`);
	};
	const clearFilters = () => {
		setSearchTerm("");
		router.visit("/admin/bibliotheque");
	};
	const statsCards = [
		{
			label: "Total livres",
			value: stats.total,
			color: "bg-blue-500",
			icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-white" })
		},
		{
			label: "Actifs",
			value: stats.actifs,
			color: "bg-green-500",
			icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5 text-white" })
		},
		{
			label: "Inactifs",
			value: stats.inactifs,
			color: "bg-gray-500",
			icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5 text-white" })
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Bibliothèque - Administration" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion de la bibliothèque",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-3 gap-3 mb-6",
				children: statsCards.map((stat) => /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500 font-medium",
							children: stat.label
						}), /* @__PURE__ */ jsx("p", {
							className: "text-2xl font-bold text-gray-900 mt-0.5",
							children: stat.value
						})] }), /* @__PURE__ */ jsx("div", {
							className: `${stat.color} w-10 h-10 rounded-xl flex items-center justify-center`,
							children: stat.icon
						})]
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-3 items-center",
					children: [
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleSearch,
							className: "flex-1 min-w-[200px]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									placeholder: "Rechercher un livre...",
									className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("select", {
							value: filters.statut || "all",
							onChange: (e) => handleStatut(e.target.value),
							className: "px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue bg-white",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "all",
									children: "Tous les statuts"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "actif",
									children: "Actif"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "inactif",
									children: "Inactif"
								})
							]
						}),
						(filters.statut || filters.search) && /* @__PURE__ */ jsxs("button", {
							onClick: clearFilters,
							className: "px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }), "Effacer"]
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/admin/bibliotheque/create",
							className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-blue-dark transition-colors flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-4 h-4" }), "Ajouter"]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: livres.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucun livre trouvé"
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Livre"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Prix"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: livres.data.map((livre) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [livre.image_url ? /* @__PURE__ */ jsx("img", {
												src: livre.image_url,
												alt: livre.titre,
												className: "w-12 h-16 object-cover rounded-lg"
											}) : /* @__PURE__ */ jsx("div", {
												className: "w-12 h-16 bg-gray-100 rounded-lg flex items-center justify-center",
												children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-6 h-6 text-gray-400" })
											}), /* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900",
												children: livre.titre
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: livre.prix ? /* @__PURE__ */ jsxs("span", {
											className: "font-medium text-gray-900",
											children: [Number(livre.prix).toLocaleString(), " FCFA"]
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-gray-400 text-xs",
											children: "Gratuit"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: `px-2 py-0.5 rounded-full text-xs font-medium ${livre.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
											children: livre.is_active ? "Actif" : "Inactif"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-1",
											children: [
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/bibliotheque/${livre.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggle(livre.id),
													className: `p-1.5 rounded-lg transition-colors ${livre.is_active ? "text-gray-500 hover:bg-gray-100" : "text-green-500 hover:bg-green-50"}`,
													title: livre.is_active ? "Désactiver" : "Activer",
													children: livre.is_active ? /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(livre.id, livre.titre),
													className: "p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, livre.id))
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Pagination, {
				links: livres.links,
				from: livres.from,
				to: livres.to,
				total: livres.total
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-_S3Ms5n_.js.map