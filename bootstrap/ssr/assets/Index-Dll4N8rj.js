import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon, UserGroupIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Devoirs/Index.tsx
function Index({ devoirs }) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (d) => {
		if (confirm(`Confirmer la ${d.is_active ? "désactivation" : "activation"} du devoir "${d.titre}" ?`)) router.post(`/admin/devoirs/${d.id}/toggle-active`);
	};
	const handleDelete = (d) => {
		if (confirm(`Confirmer la suppression du devoir "${d.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/devoirs/${d.id}`);
	};
	const handleResendNotification = (d) => {
		if (confirm(`Renvoyer les notifications pour le devoir "${d.titre}" ?`)) router.post(`/admin/devoirs/${d.id}/resend-notifications`);
	};
	const getStatutBadge = (devoir) => {
		if (!devoir.is_active) return /* @__PURE__ */ jsx("span", {
			className: "px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium",
			children: "Inactif"
		});
		if (devoir.est_depasse) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "Dépassé"]
		});
		if (devoir.jours_restants !== null && devoir.jours_restants <= 3) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "Bientôt fin"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Actif"]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des devoirs - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des devoirs",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [
						devoirs.total,
						" devoir",
						devoirs.total !== 1 ? "s" : "",
						" au total"
					]
				}), /* @__PURE__ */ jsxs(Link, {
					href: "/admin/devoirs/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouveau devoir"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: devoirs.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucun devoir trouvé"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/devoirs/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Créer votre premier devoir →"
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
									children: "Devoir"
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
									children: "Date limite"
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
							children: devoirs.data.map((d) => {
								var _d$formation;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5 text-cab-blue" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "font-medium text-gray-900 line-clamp-1",
													children: d.titre
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-gray-500 line-clamp-1",
													children: d.description || "Aucune description"
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-600 text-xs",
											children: ((_d$formation = d.formation) === null || _d$formation === void 0 ? void 0 : _d$formation.name) || "-"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `px-2 py-0.5 rounded-full text-xs font-medium ${d.type === "vague" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
												children: d.type === "vague" ? "Vague" : "Certification"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${d.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
												children: [d.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-3 h-3" }), d.mode_envoi === "individuel" ? "Individuel" : "Groupe"]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: d.tranche_requise ? /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium",
												children: ["T", d.tranche_requise.numero]
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
													children: d.date_limite || "Non définie"
												}), d.jours_restants !== null && /* @__PURE__ */ jsx("span", {
													className: `text-xs ${d.jours_restants <= 3 ? "text-red-500" : "text-gray-400"}`,
													children: d.jours_restants === 0 ? "Dépassé" : `${d.jours_restants}j restants`
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-sm font-medium text-gray-900",
													children: [
														d.soumissions_count,
														" / ",
														d.total_etudiants
													]
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400",
													children: [
														d.taux_soumission,
														"% • ",
														d.corrige_count,
														" corrigés"
													]
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: getStatutBadge(d)
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: d.has_notification_sent ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-green-600",
												children: "✅ Envoyée"
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => handleResendNotification(d),
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
														onClick: () => handleToggleActive(d),
														className: `p-1.5 rounded-lg transition-colors ${d.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
														title: d.is_active ? "Désactiver" : "Activer",
														children: d.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/devoirs/${d.id}`,
														className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
														title: "Voir",
														children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/devoirs/${d.id}/edit`,
														className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
														title: "Modifier",
														children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleDelete(d),
														className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
														title: "Supprimer",
														children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
													})
												]
											})
										})
									]
								}, d.id);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Pagination, {
					links: devoirs.links,
					from: devoirs.from,
					to: devoirs.to,
					total: devoirs.total
				})
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-Dll4N8rj.js.map