import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, EyeIcon, FunnelIcon, MagnifyingGlassIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Candidatures/Index.tsx
function Index({ candidatures, stats, filters }) {
	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const getStatutBadge = (statut, label) => {
		const colors = {
			en_attente: "bg-yellow-100 text-yellow-800",
			en_cours: "bg-blue-100 text-blue-800",
			admis: "bg-green-100 text-green-800",
			refuse: "bg-red-100 text-red-800"
		};
		const icons = {
			en_attente: /* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }),
			en_cours: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-3 h-3" }),
			admis: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }),
			refuse: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" })
		};
		return /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[statut] || "bg-gray-100 text-gray-800"}`,
			children: [icons[statut], label]
		});
	};
	const handleFilter = (key, value) => {
		const params = new URLSearchParams();
		if (value && value !== "all") params.set(key, value);
		if (filters.search) params.set("search", filters.search);
		if (filters.type && key !== "type") params.set("type", filters.type);
		if (filters.statut && key !== "statut") params.set("statut", filters.statut);
		const url = `/admin/candidatures${params.toString() ? "?" + params.toString() : ""}`;
		router.visit(url);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (filters.statut && filters.statut !== "all") params.set("statut", filters.statut);
		if (filters.type && filters.type !== "all") params.set("type", filters.type);
		const url = `/admin/candidatures${params.toString() ? "?" + params.toString() : ""}`;
		router.visit(url);
	};
	const clearFilters = () => {
		setSearchTerm("");
		router.visit("/admin/candidatures");
	};
	const statsCards = [
		{
			label: "Total",
			value: stats.total,
			color: "bg-gray-500",
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" })
		},
		{
			label: "En attente",
			value: stats.en_attente,
			color: "bg-yellow-500",
			icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5" })
		},
		{
			label: "En cours",
			value: stats.en_cours,
			color: "bg-blue-500",
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" })
		},
		{
			label: "Admis",
			value: stats.admis,
			color: "bg-green-500",
			icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" })
		},
		{
			label: "Refusés",
			value: stats.refuse,
			color: "bg-red-500",
			icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5" })
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des candidatures - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des candidatures",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6",
				children: statsCards.map((stat) => /* @__PURE__ */ jsx("div", {
					onClick: () => {
						if (stat.label !== "Total") handleFilter("statut", {
							"En attente": "en_attente",
							"En cours": "en_cours",
							"Admis": "admis",
							"Refusés": "refuse"
						}[stat.label] || null);
						else handleFilter("statut", null);
					},
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all",
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
							children: stat.icon
						})]
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
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
									placeholder: "Rechercher...",
									className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setShowFilters(!showFilters),
							className: "px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(FunnelIcon, { className: "w-4 h-4" }),
								"Filtres",
								(filters.statut || filters.type) && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-cab-blue rounded-full" })
							]
						}),
						(filters.statut || filters.type || filters.search) && /* @__PURE__ */ jsxs("button", {
							onClick: clearFilters,
							className: "px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }), "Effacer les filtres"]
						})
					]
				}), showFilters && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-xs font-medium text-gray-500 mb-1",
						children: "Statut"
					}), /* @__PURE__ */ jsxs("select", {
						value: filters.statut || "all",
						onChange: (e) => handleFilter("statut", e.target.value === "all" ? null : e.target.value),
						className: "px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "all",
								children: "Tous"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "en_attente",
								children: "En attente"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "en_cours",
								children: "En cours"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "admis",
								children: "Admis"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "refuse",
								children: "Refusé"
							})
						]
					})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-xs font-medium text-gray-500 mb-1",
						children: "Type"
					}), /* @__PURE__ */ jsxs("select", {
						value: filters.type || "all",
						onChange: (e) => handleFilter("type", e.target.value === "all" ? null : e.target.value),
						className: "px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "all",
								children: "Tous"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "formation",
								children: "Formation"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "certification",
								children: "Certification"
							})
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: candidatures.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune candidature trouvée"
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
									children: "Candidat"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Contact"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Formation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: candidatures.data.map((candidature) => {
								var _candidature$formatio, _candidature$certific;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold",
													children: candidature.nom_complet.charAt(0).toUpperCase()
												}), /* @__PURE__ */ jsx("span", {
													className: "font-medium text-gray-900",
													children: candidature.nom_complet
												})]
											})
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-4 py-3",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-gray-600 text-xs",
												children: candidature.email
											}), /* @__PURE__ */ jsx("p", {
												className: "text-gray-400 text-xs",
												children: candidature.telephone
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2 py-0.5 rounded-full text-xs font-medium ${candidature.type === "formation" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
												children: candidature.type_label
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-600 text-xs",
											children: ((_candidature$formatio = candidature.formation) === null || _candidature$formatio === void 0 ? void 0 : _candidature$formatio.name) || ((_candidature$certific = candidature.certification) === null || _candidature$certific === void 0 ? void 0 : _candidature$certific.titre) || "-"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: getStatutBadge(candidature.statut, candidature.statut_label)
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-500 text-xs",
											children: candidature.created_at
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ jsx(Link, {
												href: `/admin/candidatures/${candidature.id}`,
												className: "p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors inline-flex items-center gap-1",
												title: "Voir le détail",
												children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											})
										})
									]
								}, candidature.id);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Pagination, {
				links: candidatures.links,
				from: candidatures.from,
				to: candidatures.to,
				total: candidatures.total
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CjEv6eEc.js.map