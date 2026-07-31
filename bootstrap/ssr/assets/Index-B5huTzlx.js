import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CalendarIcon, ClockIcon, EyeIcon, EyeSlashIcon, MapPinIcon, PencilSquareIcon, PlusIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Activites/Index.tsx
function Index({ activites, pagination }) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (activite) => {
		if (confirm(`Confirmer la ${activite.is_active ? "désactivation" : "activation"} de "${activite.title}" ?`)) router.post(`/admin/activites/${activite.id}/toggle-active`);
	};
	const handleDelete = (activite) => {
		if (confirm(`Confirmer la suppression de "${activite.title}" ? Cette action est irréversible.`)) router.delete(`/admin/activites/${activite.id}`);
	};
	const getStatusBadge = (status, color) => {
		const colors = {
			green: "bg-green-100 text-green-700",
			red: "bg-red-100 text-red-700",
			gray: "bg-gray-100 text-gray-600"
		};
		return /* @__PURE__ */ jsx("span", {
			className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`,
			children: status
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des activités - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des activités",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [
						pagination.total,
						" activité",
						pagination.total > 1 ? "s" : "",
						" au total"
					]
				}), /* @__PURE__ */ jsxs(Link, {
					href: "/admin/activites/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle activité"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: activites.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(CalendarIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucune activité"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/activites/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Créer votre première activité →"
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
									children: "Activité"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Tag"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Ordre"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: activites.map((activite) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("img", {
												src: activite.image_url,
												alt: activite.title,
												className: "w-12 h-12 rounded-lg object-cover border border-gray-200"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900 line-clamp-1",
												children: activite.title
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500 line-clamp-1",
												children: activite.excerpt
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-sm text-gray-600",
													children: activite.formatted_date
												}),
												activite.heure && /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400 flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), activite.heure]
												}),
												activite.lieu && /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400 flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-3 h-3" }), activite.lieu]
												})
											]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: activite.tag ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",
											children: [/* @__PURE__ */ jsx(TagIcon, { className: "w-3 h-3" }), activite.tag]
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-400",
											children: "-"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: getStatusBadge(activite.status, activite.status_color)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-sm",
										children: activite.ordre
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(activite),
													className: `p-1.5 rounded-lg transition-colors ${activite.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: activite.is_active ? "Désactiver" : "Activer",
													children: activite.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/activites/${activite.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(activite),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, activite.id))
						})]
					})
				})
			}),
			pagination && pagination.last_page > 1 && /* @__PURE__ */ jsx(Pagination, {
				links: pagination.links,
				currentPage: pagination.current_page,
				lastPage: pagination.last_page,
				total: pagination.total,
				perPage: pagination.per_page
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-B5huTzlx.js.map