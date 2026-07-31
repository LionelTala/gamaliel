import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/HeroSlides/Index.tsx
function Index({ slides }) {
	var _slides$length;
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (slide) => {
		if (confirm(`Confirmer la ${slide.is_active ? "désactivation" : "activation"} du slide "${slide.titre}" ?`)) router.post(`/admin/hero-slides/${slide.id}/toggle-active`);
	};
	const handleDelete = (slide) => {
		if (confirm(`Confirmer la suppression du slide "${slide.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/hero-slides/${slide.id}`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion du Hero - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion du Hero (Carrousel)",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-gray-500",
				children: [
					(_slides$length = slides === null || slides === void 0 ? void 0 : slides.length) !== null && _slides$length !== void 0 ? _slides$length : 0,
					" slide",
					(slides === null || slides === void 0 ? void 0 : slides.length) !== 1 ? "s" : "",
					" au total"
				]
			}), /* @__PURE__ */ jsxs(Link, {
				href: "/admin/hero-slides/create",
				className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
				children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouveau slide"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
			children: !slides || slides.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx(PhotoIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucun slide trouvé"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/admin/hero-slides/create",
						className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
						children: "Créer votre premier slide →"
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
								children: "Ordre"
							}),
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
								children: "Badge"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Statut"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Créé le"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ jsx("tbody", {
						className: "divide-y divide-gray-100",
						children: slides.map((slide) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-gray-50 transition-colors",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-gray-600 text-sm",
									children: slide.ordre
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx("img", {
										src: slide.image_url || "/assets/images/placeholder.jpg",
										alt: slide.titre,
										className: "w-16 h-12 rounded-lg object-cover border border-gray-200",
										onError: (e) => {
											e.target.src = "/assets/images/placeholder.jpg";
										}
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx("p", {
										className: "font-medium text-gray-900 line-clamp-1",
										children: slide.titre
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: slide.badge ? /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs",
										children: slide.badge
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-gray-400 text-xs",
										children: "-"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx("span", {
										className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${slide.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
										children: slide.is_active ? "Actif" : "Inactif"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-gray-500 text-xs",
									children: slide.created_at
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-end gap-2",
										children: [
											/* @__PURE__ */ jsx("button", {
												onClick: () => handleToggleActive(slide),
												className: `p-1.5 rounded-lg transition-colors ${slide.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
												title: slide.is_active ? "Désactiver" : "Activer",
												children: slide.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ jsx(Link, {
												href: `/admin/hero-slides/${slide.id}/edit`,
												className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
												title: "Modifier",
												children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => handleDelete(slide),
												className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
												title: "Supprimer",
												children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
											})
										]
									})
								})
							]
						}, slide.id))
					})]
				})
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CpOm7clm.js.map