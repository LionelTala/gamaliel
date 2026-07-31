import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChartBarIcon, CheckCircleIcon, ClockIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon, UserGroupIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Evaluations/Index.tsx
function Index({ evaluations }) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (e) => {
		if (confirm(`Confirmer la ${e.is_active ? "désactivation" : "activation"} de l'évaluation "${e.titre}" ?`)) router.post(`/admin/evaluations/${e.id}/toggle-active`);
	};
	const handleDelete = (e) => {
		if (confirm(`Confirmer la suppression de l'évaluation "${e.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/evaluations/${e.id}`);
	};
	const handleResendNotification = (e) => {
		if (confirm(`Renvoyer les notifications pour l'évaluation "${e.titre}" ?`)) router.post(`/admin/evaluations/${e.id}/resend-notifications`);
	};
	const getStatutBadge = (evaluation) => {
		if (!evaluation.is_active) return /* @__PURE__ */ jsx("span", {
			className: "px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium",
			children: "Inactive"
		});
		if (evaluation.est_depasse) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "Dépassée"]
		});
		if (evaluation.jours_restants !== null && evaluation.jours_restants <= 3) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "Bientôt fin"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Active"]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des évaluations - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des évaluations",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [
						evaluations.total,
						" évaluation",
						evaluations.total !== 1 ? "s" : "",
						" au total"
					]
				}), /* @__PURE__ */ jsxs(Link, {
					href: "/admin/evaluations/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle évaluation"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: evaluations.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucune évaluation trouvée"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/evaluations/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Créer votre première évaluation →"
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
									children: "Évaluation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Formation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Envoi"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Tranche"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Coeff."
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Soumissions"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Notif."
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: evaluations.data.map((e) => {
								var _e$formation;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5 text-cab-blue" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "font-medium text-gray-900 line-clamp-1",
													children: e.titre
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-gray-500 line-clamp-1",
													children: e.description || "Aucune description"
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-600 text-xs",
											children: ((_e$formation = e.formation) === null || _e$formation === void 0 ? void 0 : _e$formation.name) || "-"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2 py-0.5 rounded-full text-xs font-medium ${e.type === "vague" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
												children: e.type === "vague" ? "Vague" : "Certification"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${e.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
												children: [e.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-3 h-3" }), e.mode_envoi === "individuel" ? "Individuel" : "Groupe"]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: e.tranche_requise ? /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium",
												children: ["T", e.tranche_requise.numero]
											}) : /* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-400",
												children: "Tous"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-600",
													children: e.date || "Non définie"
												}), e.jours_restants !== null && /* @__PURE__ */ jsx("span", {
													className: `text-xs ${e.jours_restants <= 3 ? "text-red-500" : "text-gray-400"}`,
													children: e.jours_restants === 0 ? "Dépassée" : `${e.jours_restants}j restants`
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-center",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-sm font-semibold text-gray-900",
												children: e.coefficient
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-sm font-medium text-gray-900",
													children: [
														e.soumissions_count,
														" / ",
														e.total_etudiants
													]
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400",
													children: [
														e.taux_soumission,
														"% • ",
														e.corrige_count,
														" corrigés"
													]
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: getStatutBadge(e)
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: e.has_notification_sent ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-green-600",
												children: "✅ Envoyée"
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => handleResendNotification(e),
												className: "text-xs text-yellow-600 hover:text-yellow-800",
												children: "📤 Envoyer"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleToggleActive(e),
														className: `p-1.5 rounded-lg transition-colors ${e.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
														title: e.is_active ? "Désactiver" : "Activer",
														children: e.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/evaluations/${e.id}`,
														className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
														title: "Voir",
														children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/evaluations/${e.id}/edit`,
														className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
														title: "Modifier",
														children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleDelete(e),
														className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
														title: "Supprimer",
														children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
													})
												]
											})
										})
									]
								}, e.id);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Pagination, {
					links: evaluations.links,
					from: evaluations.from,
					to: evaluations.to,
					total: evaluations.total
				})
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-1-NUIcR5.js.map