import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CalendarIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Vagues/Index.tsx
function Index({ vagues }) {
	var _vagues$length;
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (vague) => {
		if (confirm(`Confirmer la ${vague.is_active ? "désactivation" : "activation"} de ${vague.name} ?`)) router.post(`/admin/vagues/${vague.id}/toggle-active`);
	};
	const handleDelete = (vague) => {
		if (confirm(`Confirmer la suppression de ${vague.name} ? Cette action est irréversible.`)) router.delete(`/admin/vagues/${vague.id}`);
	};
	const getStatutColor = (statut) => {
		return {
			"À venir": "bg-blue-100 text-blue-700",
			"En cours": "bg-green-100 text-green-700",
			"Terminée": "bg-gray-100 text-gray-700",
			"Inactive": "bg-red-100 text-red-700"
		}[statut] || "bg-gray-100 text-gray-700";
	};
	const getTauxColor = (taux) => {
		if (taux >= 80) return "text-green-600";
		if (taux >= 50) return "text-yellow-600";
		return "text-red-600";
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des vagues - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des vagues",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-gray-500",
				children: [
					(_vagues$length = vagues === null || vagues === void 0 ? void 0 : vagues.length) !== null && _vagues$length !== void 0 ? _vagues$length : 0,
					" vague",
					(vagues === null || vagues === void 0 ? void 0 : vagues.length) !== 1 ? "s" : "",
					" au total"
				]
			}), /* @__PURE__ */ jsxs(Link, {
				href: "/admin/vagues/create",
				className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
				children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle vague"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
			children: !vagues || vagues.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx(CalendarIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune vague trouvée"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/admin/vagues/create",
						className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
						children: "Créer votre première vague →"
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
								children: "Vague"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Formation"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Période"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Places"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Taux"
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
						children: vagues.map((vague) => {
							var _vague$formation, _vague$formation2, _vague$capacite;
							return /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-10 h-10 rounded-lg bg-cab-blue/10 text-cab-blue flex items-center justify-center",
												children: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-5 h-5" })
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900",
												children: vague.name
											}), /* @__PURE__ */ jsxs("p", {
												className: "text-xs text-gray-500",
												children: ["Ordre: ", vague.order]
											})] })]
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "px-2 py-1 bg-blue-50 text-cab-blue rounded-md text-xs font-medium",
											children: ((_vague$formation = vague.formation) === null || _vague$formation === void 0 ? void 0 : _vague$formation.abbreviation) || "-"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500 mt-0.5",
											children: ((_vague$formation2 = vague.formation) === null || _vague$formation2 === void 0 ? void 0 : _vague$formation2.name) || "Non associée"
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-600 text-sm",
										children: vague.formatted_dates
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-sm font-medium text-gray-900",
												children: [
													vague.inscrits,
													" / ",
													(_vague$capacite = vague.capacite) !== null && _vague$capacite !== void 0 ? _vague$capacite : "∞"
												]
											}), vague.capacite && /* @__PURE__ */ jsxs("span", {
												className: "text-xs text-gray-500",
												children: [vague.places_restantes, " restantes"]
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: vague.capacite ? /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden",
												children: /* @__PURE__ */ jsx("div", {
													className: `h-full rounded-full ${vague.taux_remplissage >= 80 ? "bg-green-500" : vague.taux_remplissage >= 50 ? "bg-yellow-500" : "bg-red-500"}`,
													style: { width: `${Math.min(vague.taux_remplissage, 100)}%` }
												})
											}), /* @__PURE__ */ jsxs("span", {
												className: `text-xs font-medium ${getTauxColor(vague.taux_remplissage)}`,
												children: [vague.taux_remplissage, "%"]
											})]
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-400",
											children: "Illimitée"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: `px-2 py-0.5 rounded-full text-xs font-medium ${getStatutColor(vague.statut)}`,
											children: vague.statut
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(vague),
													className: `p-1.5 rounded-lg transition-colors ${vague.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: vague.is_active ? "Désactiver" : "Activer",
													children: vague.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/vagues/${vague.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(vague),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													disabled: vague.inscrits > 0,
													children: /* @__PURE__ */ jsx(TrashIcon, { className: `w-5 h-5 ${vague.inscrits > 0 ? "opacity-40 cursor-not-allowed" : ""}` })
												})
											]
										})
									})
								]
							}, vague.id);
						})
					})]
				})
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CgiFUzDs.js.map