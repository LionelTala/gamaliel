import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, EnvelopeIcon, MagnifyingGlassIcon, MapPinIcon, PhoneIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/PreInscriptions/Index.tsx
function Index({ preInscriptions, stats, filters, sort }) {
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedStatut, setSelectedStatut] = useState(filters.statut || "");
	const applyFilters = (newParams) => {
		const queryParams = {
			search: searchTerm,
			statut: selectedStatut,
			sort: sort.field || "created_at",
			direction: sort.direction || "desc",
			...newParams
		};
		Object.keys(queryParams).forEach((key) => {
			if (!queryParams[key]) delete queryParams[key];
		});
		router.get("/admin/pre-inscriptions", queryParams, {
			preserveState: true,
			preserveScroll: true,
			replace: true
		});
	};
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilters({ search: searchTerm });
	};
	const handleStatutChange = (statut) => {
		setSelectedStatut(statut);
		applyFilters({ statut });
	};
	const handleSort = (field) => {
		const newDirection = sort.field === field && sort.direction === "asc" ? "desc" : "asc";
		applyFilters({
			sort: field,
			direction: newDirection
		});
	};
	const handleUpdateStatut = (id, statut) => {
		const commentaire = prompt("Ajouter un commentaire (optionnel) :");
		router.put(`/admin/pre-inscriptions/${id}`, {
			statut,
			commentaire: commentaire || ""
		}, { preserveScroll: true });
	};
	const handleDelete = (id, nom) => {
		if (confirm(`Supprimer la pré-inscription de "${nom}" ?`)) router.delete(`/admin/pre-inscriptions/${id}`);
	};
	const SortIcon = ({ field }) => {
		if (sort.field !== field) return /* @__PURE__ */ jsx(ArrowUpIcon, { className: "w-3 h-3 text-gray-300" });
		return sort.direction === "asc" ? /* @__PURE__ */ jsx(ArrowUpIcon, { className: "w-3 h-3 text-cab-blue" }) : /* @__PURE__ */ jsx(ArrowDownIcon, { className: "w-3 h-3 text-cab-blue" });
	};
	const statsCards = [
		{
			label: "Total",
			value: stats.total,
			color: "bg-blue-500",
			key: ""
		},
		{
			label: "En attente",
			value: stats.en_attente,
			color: "bg-yellow-500",
			key: "en_attente"
		},
		{
			label: "Contactés",
			value: stats.contacte,
			color: "bg-blue-500",
			key: "contacte"
		},
		{
			label: "Inscrits",
			value: stats.inscrit,
			color: "bg-green-500",
			key: "inscrit"
		},
		{
			label: "Refusés",
			value: stats.refuse,
			color: "bg-red-500",
			key: "refuse"
		}
	];
	const getStatutIcon = (statut) => {
		switch (statut) {
			case "en_attente": return /* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" });
			case "contacte": return /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" });
			case "inscrit": return /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" });
			case "refuse": return /* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" });
			default: return null;
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Pré-inscriptions - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Pré-inscriptions",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6",
				children: statsCards.map((stat) => /* @__PURE__ */ jsx("div", {
					onClick: () => handleStatutChange(stat.key),
					className: `bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer hover:shadow-md ${selectedStatut === stat.key ? "border-cab-blue ring-2 ring-cab-blue/10" : "border-gray-100"}`,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500 font-medium",
							children: stat.label
						}), /* @__PURE__ */ jsx("p", {
							className: "text-2xl font-bold text-gray-900 mt-0.5",
							children: stat.value
						})] }), /* @__PURE__ */ jsx("div", {
							className: `${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`,
							children: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" })
						})]
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSearch,
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1 min-w-[200px] relative",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
								children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-gray-400" })
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								placeholder: "Rechercher par nom, email, téléphone...",
								className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
							})]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: selectedStatut,
							onChange: (e) => handleStatutChange(e.target.value),
							className: "px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Tous les statuts"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "en_attente",
									children: "En attente"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "contacte",
									children: "Contacté"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "inscrit",
									children: "Inscrit"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "refuse",
									children: "Refusé"
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
							children: "Rechercher"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: preInscriptions.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune pré-inscription trouvée"
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700",
									onClick: () => handleSort("nom_complet"),
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: ["Candidat", /* @__PURE__ */ jsx(SortIcon, { field: "nom_complet" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700",
									onClick: () => handleSort("email"),
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: ["Contact", /* @__PURE__ */ jsx(SortIcon, { field: "email" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700",
									onClick: () => handleSort("formation"),
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: ["Formation", /* @__PURE__ */ jsx(SortIcon, { field: "formation" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Ville"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700",
									onClick: () => handleSort("statut"),
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: ["Statut", /* @__PURE__ */ jsx(SortIcon, { field: "statut" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700",
									onClick: () => handleSort("created_at"),
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: ["Date", /* @__PURE__ */ jsx(SortIcon, { field: "created_at" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: preInscriptions.data.map((p) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold",
												children: p.nom_complet.charAt(0).toUpperCase()
											}), /* @__PURE__ */ jsx("span", {
												className: "font-medium text-gray-900",
												children: p.nom_complet
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col text-xs",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-1 text-gray-600",
												children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-3 h-3" }), p.email]
											}), /* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-1 text-gray-500 mt-0.5",
												children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-3 h-3" }), p.telephone]
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-700 text-xs font-medium",
										children: p.formation
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: p.ville ? /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-gray-600",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-3 h-3" }), p.ville]
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-400",
											children: "-"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.statut_color || "bg-gray-100 text-gray-800"}`,
											children: [getStatutIcon(p.statut), p.statut_label || p.statut]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-xs",
										children: p.created_at
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-1",
											children: [/* @__PURE__ */ jsxs("select", {
												value: p.statut,
												onChange: (e) => handleUpdateStatut(p.id, e.target.value),
												className: "text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-cab-blue focus:border-cab-blue",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "en_attente",
														children: "En attente"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "contacte",
														children: "Contacté"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "inscrit",
														children: "Inscrit"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "refuse",
														children: "Refusé"
													})
												]
											}), /* @__PURE__ */ jsx("button", {
												onClick: () => handleDelete(p.id, p.nom_complet),
												className: "p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
												title: "Supprimer",
												children: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" })
											})]
										})
									})
								]
							}, p.id))
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Pagination, {
					links: preInscriptions.links,
					from: preInscriptions.from,
					to: preInscriptions.to,
					total: preInscriptions.total
				})
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CByrh-HU2.js.map