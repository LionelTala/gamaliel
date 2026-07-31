import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DocumentTextIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Galerie/Index.tsx
function Index({ medias, pagination }) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (media) => {
		if (confirm(`Confirmer la ${media.is_active ? "désactivation" : "activation"} de "${media.titre}" ?`)) router.post(`/admin/galerie/${media.id}/toggle-active`);
	};
	const handleDelete = (media) => {
		if (confirm(`Confirmer la suppression de "${media.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/galerie/${media.id}`);
	};
	const getTypeIcon = (media) => {
		if (media.is_image) return /* @__PURE__ */ jsx(PhotoIcon, { className: "w-5 h-5 text-blue-500" });
		if (media.is_video) return /* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" });
		return /* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-5 h-5 text-gray-500" });
	};
	const getTypeBadge = (media) => {
		const colors = {
			image: "bg-blue-100 text-blue-700",
			video: "bg-red-100 text-red-700",
			pdf: "bg-orange-100 text-orange-700",
			document: "bg-gray-100 text-gray-700"
		};
		return /* @__PURE__ */ jsx("span", {
			className: `px-2 py-0.5 rounded-full text-xs font-medium ${colors[media.type] || colors.document}`,
			children: media.type_label
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion de la galerie - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Galerie média",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [
						pagination.total,
						" média",
						pagination.total > 1 ? "s" : "",
						" au total"
					]
				}), /* @__PURE__ */ jsxs(Link, {
					href: "/admin/galerie/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Ajouter un média"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: medias.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(PhotoIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucun média dans la galerie"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/galerie/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Ajouter votre premier média →"
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
									children: "Aperçu"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Titre"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Taille"
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
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Ajouté le"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: medias.map((media) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: media.is_image ? /* @__PURE__ */ jsx("img", {
											src: media.url,
											alt: media.titre,
											className: "w-16 h-12 rounded-lg object-cover border border-gray-200"
										}) : media.is_video ? /* @__PURE__ */ jsx("video", {
											src: media.url,
											className: "w-16 h-12 rounded-lg object-cover border border-gray-200"
										}) : /* @__PURE__ */ jsx("div", {
											className: "w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200",
											children: getTypeIcon(media)
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium text-gray-900 line-clamp-1",
											children: media.titre
										}), media.description && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500 line-clamp-1",
											children: media.description
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: getTypeBadge(media)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-xs",
										children: media.taille_formatted
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${media.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
											children: media.is_active ? "Actif" : "Inactif"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-sm",
										children: media.ordre
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-xs",
										children: media.created_at
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(media),
													className: `p-1.5 rounded-lg transition-colors ${media.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: media.is_active ? "Désactiver" : "Activer",
													children: media.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/galerie/${media.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(media),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, media.id))
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

//# sourceMappingURL=Index-MFOfcmbM.js.map