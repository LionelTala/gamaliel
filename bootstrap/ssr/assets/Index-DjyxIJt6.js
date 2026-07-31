import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DocumentTextIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Certifications/Index.tsx
function Index({ certifications }) {
	var _certifications$lengt;
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (certification) => {
		if (confirm(`Confirmer la ${certification.is_active ? "désactivation" : "activation"} de ${certification.titre} ?`)) router.post(`/admin/certifications/${certification.id}/toggle-active`);
	};
	const handleDelete = (certification) => {
		if (confirm(`Confirmer la suppression de ${certification.titre} ? Cette action est irréversible.`)) router.delete(`/admin/certifications/${certification.id}`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des certifications - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des certifications",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-gray-500",
				children: [
					(_certifications$lengt = certifications === null || certifications === void 0 ? void 0 : certifications.length) !== null && _certifications$lengt !== void 0 ? _certifications$lengt : 0,
					" certification",
					(certifications === null || certifications === void 0 ? void 0 : certifications.length) !== 1 ? "s" : "",
					" au total"
				]
			}), /* @__PURE__ */ jsxs(Link, {
				href: "/admin/certifications/create",
				className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
				children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle certification"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
			children: !certifications || certifications.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune certification trouvée"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/admin/certifications/create",
						className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
						children: "Créer votre première certification →"
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
								children: "Certification"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Formation"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Durée"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Frais"
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
						children: certifications.map((certification) => {
							var _certification$format, _certification$format2;
							return /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("img", {
												src: certification.image_url || "/assets/images/placeholder.jpg",
												alt: certification.titre,
												className: "w-12 h-12 rounded-lg object-cover border border-gray-200",
												onError: (e) => {
													e.target.src = "/assets/images/placeholder.jpg";
												}
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900",
												children: certification.titre
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: ((_certification$format = certification.formation) === null || _certification$format === void 0 ? void 0 : _certification$format.name) || "Non associée"
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: "px-2 py-1 bg-blue-50 text-cab-blue rounded-md text-xs font-medium",
											children: ((_certification$format2 = certification.formation) === null || _certification$format2 === void 0 ? void 0 : _certification$format2.abbreviation) || "-"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-600 text-sm",
										children: certification.duree || "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 font-semibold text-gray-900",
										children: certification.frais_formatted || "0 FCFA"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${certification.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
											children: certification.is_active ? "Active" : "Inactive"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												certification.lien_externe && certification.lien_label && /* @__PURE__ */ jsx("a", {
													href: certification.lien_externe,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors",
													title: certification.lien_label,
													children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(certification),
													className: `p-1.5 rounded-lg transition-colors ${certification.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: certification.is_active ? "Désactiver" : "Activer",
													children: certification.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/certifications/${certification.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(certification),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, certification.id);
						})
					})]
				})
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-DjyxIJt6.js.map