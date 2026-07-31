import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, EyeIcon, EyeSlashIcon, FunnelIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon, UserGroupIcon, UserIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/Index.tsx
function Index({ cours, formations, stats, filters, sort }) {
	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedFormation, setSelectedFormation] = useState(filters.formation_id || "");
	const handleToggleActive = (c) => {
		if (confirm(`Confirmer la ${c.is_active ? "désactivation" : "activation"} du cours "${c.titre}" ?`)) router.post(`/admin/cours/${c.id}/toggle-active`);
	};
	const handleDelete = (c) => {
		if (confirm(`Confirmer la suppression du cours "${c.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/cours/${c.id}`);
	};
	const handleResendNotification = (c) => {
		if (confirm(`Renvoyer les notifications pour le cours "${c.titre}" ?`)) router.post(`/admin/cours/${c.id}/resend-notifications`);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilters();
	};
	const applyFilters = () => {
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (selectedFormation) params.set("formation_id", selectedFormation);
		if (sort.field) params.set("sort", sort.field);
		if (sort.direction) params.set("direction", sort.direction);
		router.get(`/admin/cours${params.toString() ? "?" + params.toString() : ""}`);
	};
	const clearFilters = () => {
		setSearchTerm("");
		setSelectedFormation("");
		router.get("/admin/cours");
	};
	const handleSort = (field) => {
		const newDirection = sort.field === field && sort.direction === "asc" ? "desc" : "asc";
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (selectedFormation) params.set("formation_id", selectedFormation);
		params.set("sort", field);
		params.set("direction", newDirection);
		router.get(`/admin/cours?${params.toString()}`);
	};
	const SortIcon = ({ field }) => {
		if (sort.field !== field) return /* @__PURE__ */ jsx("span", {
			className: "text-gray-300 ml-1",
			children: "↕"
		});
		return /* @__PURE__ */ jsx("span", {
			className: "text-cab-blue ml-1",
			children: sort.direction === "asc" ? "↑" : "↓"
		});
	};
	const statsCards = [
		{
			label: "Total",
			value: stats.total,
			color: "bg-blue-500"
		},
		{
			label: "Actifs",
			value: stats.actifs,
			color: "bg-green-500"
		},
		{
			label: "Inactifs",
			value: stats.inactifs,
			color: "bg-gray-500"
		},
		{
			label: "Vagues",
			value: stats.vague,
			color: "bg-purple-500"
		},
		{
			label: "Certifications",
			value: stats.certification,
			color: "bg-orange-500"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des cours - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des cours",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6",
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
							className: `${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`,
							children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" })
						})]
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
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
										placeholder: "Rechercher un cours...",
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
									filters.formation_id && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-cab-blue rounded-full" })
								]
							}),
							(filters.formation_id || filters.search) && /* @__PURE__ */ jsxs("button", {
								onClick: clearFilters,
								className: "px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }), "Effacer"]
							}),
							/* @__PURE__ */ jsxs(Link, {
								href: "/admin/cours/create",
								className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouveau cours"]
							})
						]
					}),
					showFilters && /* @__PURE__ */ jsx("div", {
						className: "mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-xs font-medium text-gray-500 mb-1",
							children: "Formation"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedFormation,
							onChange: (e) => setSelectedFormation(e.target.value),
							className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Toutes les formations"
							}), formations.map((f) => /* @__PURE__ */ jsxs("option", {
								value: f.id,
								children: [
									f.name,
									" (",
									f.abbreviation,
									")"
								]
							}, f.id))]
						})] })
					}),
					showFilters && /* @__PURE__ */ jsx("div", {
						className: "mt-3 flex justify-end",
						children: /* @__PURE__ */ jsx("button", {
							onClick: applyFilters,
							className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
							children: "Appliquer le filtre"
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: cours.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucun cours trouvé"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/cours/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Créer votre premier cours →"
						})
					]
				}) : /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: /* @__PURE__ */ jsxs("button", {
										onClick: () => handleSort("titre"),
										className: "flex items-center hover:text-cab-blue transition-colors",
										children: ["Cours ", /* @__PURE__ */ jsx(SortIcon, { field: "titre" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Formation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: /* @__PURE__ */ jsxs("button", {
										onClick: () => handleSort("type"),
										className: "flex items-center hover:text-cab-blue transition-colors",
										children: ["Type ", /* @__PURE__ */ jsx(SortIcon, { field: "type" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Envoi"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Leçons"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: /* @__PURE__ */ jsxs("button", {
										onClick: () => handleSort("viewed_count"),
										className: "flex items-center hover:text-cab-blue transition-colors",
										children: ["Vues ", /* @__PURE__ */ jsx(SortIcon, { field: "viewed_count" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Contenu"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Notif."
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: /* @__PURE__ */ jsxs("button", {
										onClick: () => handleSort("is_active"),
										className: "flex items-center hover:text-cab-blue transition-colors",
										children: ["Statut ", /* @__PURE__ */ jsx(SortIcon, { field: "is_active" })]
									})
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: cours.data.map((c) => {
								var _c$formation;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "font-medium text-gray-900 line-clamp-1",
													children: c.titre
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-gray-500 line-clamp-1",
													children: c.description || "Aucune description"
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-600 text-xs",
											children: ((_c$formation = c.formation) === null || _c$formation === void 0 ? void 0 : _c$formation.name) || "-"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2 py-0.5 rounded-full text-xs font-medium ${c.type === "vague" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
												children: c.type === "vague" ? "Vague" : "Certification"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
												children: [c.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-3 h-3" }), c.mode_envoi === "individuel" ? "Individuel" : "Groupe"]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-center",
											children: /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",
												children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-3 h-3" }), c.lessons_count]
											})
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-4 py-3 text-gray-600 text-sm",
											children: [
												c.viewed_count,
												" / ",
												c.total_students
											]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1",
												children: [
													c.has_video && /* @__PURE__ */ jsx(VideoCameraIcon, {
														className: "w-4 h-4 text-red-500",
														title: "Vidéo"
													}),
													c.has_files && /* @__PURE__ */ jsx(DocumentTextIcon, {
														className: "w-4 h-4 text-blue-500",
														title: "Fichiers"
													}),
													!c.has_video && !c.has_files && /* @__PURE__ */ jsx("span", {
														className: "text-xs text-gray-400",
														children: "-"
													})
												]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: c.notification_sent ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-green-600",
												children: "✅ Envoyée"
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => handleResendNotification(c),
												className: "text-xs text-yellow-600 hover:text-yellow-800",
												children: "📤 Envoyer"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
												children: c.is_active ? "Actif" : "Inactif"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleToggleActive(c),
														className: `p-1.5 rounded-lg transition-colors ${c.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
														title: c.is_active ? "Désactiver" : "Activer",
														children: c.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/cours/${c.id}`,
														className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
														title: "Voir",
														children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/cours/${c.id}/edit`,
														className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
														title: "Modifier",
														children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleDelete(c),
														className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
														title: "Supprimer",
														children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
													})
												]
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Pagination, {
					links: cours.links,
					from: cours.from,
					to: cours.to,
					total: cours.total
				})
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-Bmu-KENV.js.map