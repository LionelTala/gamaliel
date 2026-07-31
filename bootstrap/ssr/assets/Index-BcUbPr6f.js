import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Formations/Index.tsx
function Index({ formations, currentType }) {
	const [type, setType] = useState(currentType || "enligne");
	const handleToggleActive = (formation) => {
		if (confirm(`Confirmer la ${formation.is_active ? "désactivation" : "activation"} de la formation "${formation.name}" ?`)) router.post(`/admin/formations/${formation.id}/toggle-active?type=${type}`);
	};
	const handleDelete = (formation) => {
		if (confirm(`Confirmer la suppression de la formation "${formation.name}" ? Cette action est irréversible.`)) router.delete(`/admin/formations/${formation.id}?type=${type}`);
	};
	const handleTypeChange = (newType) => {
		setType(newType);
		router.get("/admin/formations", { type: newType }, { preserveState: true });
	};
	const getCreateRoute = () => {
		return type === "enligne" ? "/admin/formations/create?type=enligne" : "/admin/formations/create-presentiel?type=presentiel";
	};
	const getEditRoute = (formation) => {
		return type === "enligne" ? `/admin/formations/${formation.id}/edit?type=enligne` : `/admin/formations/${formation.id}/edit-presentiel?type=presentiel`;
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des formations - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des formations",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => handleTypeChange("enligne"),
					className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${type === "enligne" ? "bg-cab-blue text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
					children: "💻 En ligne"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => handleTypeChange("presentiel"),
					className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${type === "presentiel" ? "bg-cab-blue text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
					children: "📍 Présentiel"
				})]
			}), /* @__PURE__ */ jsxs(Link, {
				href: getCreateRoute(),
				className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
				children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), type === "enligne" ? "Nouvelle formation en ligne" : "Nouvelle formation présentiel"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
			children: formations.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: type === "enligne" ? "Aucune formation en ligne trouvée" : "Aucune formation présentiel trouvée"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: getCreateRoute(),
						className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
						children: type === "enligne" ? "Créer votre première formation en ligne →" : "Créer votre première formation présentiel →"
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
								children: "Formation"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Abrév."
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Durée"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Prix"
							}),
							type === "presentiel" && /* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Icône"
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
						children: formations.map((formation) => {
							var _formation$descriptio;
							return /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [formation.image_url ? /* @__PURE__ */ jsx("img", {
												src: formation.image_url,
												alt: formation.name,
												className: "w-10 h-10 rounded-lg object-cover"
											}) : /* @__PURE__ */ jsx("div", {
												className: "w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center",
												children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gray-400" })
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900 line-clamp-1",
												children: formation.name
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500 line-clamp-1",
												children: ((_formation$descriptio = formation.description) === null || _formation$descriptio === void 0 ? void 0 : _formation$descriptio.substring(0, 60)) || "Aucune description"
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-600 text-xs font-mono",
										children: formation.abbreviation
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-600 text-xs",
										children: formation.duration
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-900 font-medium text-xs",
										children: formation.frais_formatted || "0 FCFA"
									}),
									type === "presentiel" && /* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-2xl",
										children: formation.icon || "📚"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formation.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
											children: formation.is_active ? "Actif" : "Inactif"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(formation),
													className: `p-1.5 rounded-lg transition-colors ${formation.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: formation.is_active ? "Désactiver" : "Activer",
													children: formation.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: getEditRoute(formation),
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(formation),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, formation.id);
						})
					})]
				})
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-BcUbPr6f.js.map