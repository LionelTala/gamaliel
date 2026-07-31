import { t as StudentLayout } from "./StudentLayout-MdC-2Al8.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CalendarIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, DocumentIcon, ExclamationTriangleIcon, LockClosedIcon, LockOpenIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Devoirs/Index.tsx
function Index({ devoirs, stats }) {
	const getStatutBadge = (devoir) => {
		if (devoir.est_verrouille) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(LockClosedIcon, { className: "w-3 h-3" }), "Verrouillé"]
		});
		if (devoir.soumis) {
			if (devoir.soumission_statut === "corrige") return /* @__PURE__ */ jsxs("span", {
				className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Corrigé"]
			});
			return /* @__PURE__ */ jsxs("span", {
				className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "Soumis"]
			});
		}
		if (devoir.est_depasse) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "Dépassé"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "En attente"]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Mes devoirs - Étudiant" }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: "Mes devoirs",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 md:grid-cols-6 gap-3 mb-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-cab-blue",
						children: stats.total
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Total"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-yellow-500",
						children: stats.en_attente
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "En attente"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-blue-500",
						children: stats.soumis
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Soumis"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-green-500",
						children: stats.corriges
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Corrigés"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-green-600",
						children: stats.accessibles
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Accessibles"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-red-500",
						children: stats.verrouilles
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Verrouillés"
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: devoirs.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-gray-500 text-sm",
					children: "Aucun devoir pour le moment"
				})]
			}) : devoirs.map((d) => {
				var _d$formation2;
				if (d.est_verrouille) {
					var _d$formation, _d$tranche_requise, _d$tranche_requise2, _d$tranche_requise3;
					return /* @__PURE__ */ jsx("div", {
						className: "bg-white rounded-2xl p-5 shadow-sm border-2 border-red-200/50 bg-red-50/30",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(LockClosedIcon, { className: "w-5 h-5 text-red-500" }),
											/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-semibold text-gray-500",
												children: d.titre
											}),
											/* @__PURE__ */ jsx("span", {
												className: "inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs",
												children: "Verrouillé"
											})
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-500 mt-1",
										children: (_d$formation = d.formation) === null || _d$formation === void 0 ? void 0 : _d$formation.name
									}),
									d.description && /* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-500 mt-2 line-clamp-2",
										children: d.description
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 mt-3",
										children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-4 h-4 text-yellow-500" }), /* @__PURE__ */ jsxs("span", {
											className: "text-sm text-yellow-700 font-medium",
											children: [
												"🔒 Tranche ",
												(_d$tranche_requise = d.tranche_requise) === null || _d$tranche_requise === void 0 ? void 0 : _d$tranche_requise.numero,
												" requise",
												((_d$tranche_requise2 = d.tranche_requise) === null || _d$tranche_requise2 === void 0 ? void 0 : _d$tranche_requise2.montant) && /* @__PURE__ */ jsxs("span", {
													className: "ml-1 text-gray-500 font-normal",
													children: [
														"(",
														d.tranche_requise.montant.toLocaleString(),
														" FCFA)"
													]
												})
											]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4 mt-2",
										children: [d.date_limite && /* @__PURE__ */ jsxs("span", {
											className: `text-xs flex items-center gap-1 ${d.est_depasse ? "text-red-500" : "text-gray-400"}`,
											children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-3 h-3" }), d.est_depasse ? "Dépassé" : `${d.jours_restants}j restants`]
										}), d.has_files && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-blue-500",
											children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3 h-3" }), "Fichiers"]
										})]
									})
								]
							}), ((_d$tranche_requise3 = d.tranche_requise) === null || _d$tranche_requise3 === void 0 ? void 0 : _d$tranche_requise3.lien) ? /* @__PURE__ */ jsxs(Link, {
								href: d.tranche_requise.lien,
								className: "inline-flex items-center gap-1 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-dark transition-colors shrink-0 mt-1",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-4 h-4" }), "Débloquer"]
							}) : /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-4 h-4" }), "Lien indisponible"]
							})]
						})
					}, d.id);
				}
				return /* @__PURE__ */ jsx(Link, {
					href: `/student/devoirs/${d.id}`,
					className: "block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-semibold text-gray-900",
										children: d.titre
									}), getStatutBadge(d)]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mt-1",
									children: (_d$formation2 = d.formation) === null || _d$formation2 === void 0 ? void 0 : _d$formation2.name
								}),
								d.description && /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 mt-2 line-clamp-2",
									children: d.description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 mt-3",
									children: [
										d.date_limite && /* @__PURE__ */ jsxs("span", {
											className: `text-xs flex items-center gap-1 ${d.est_depasse ? "text-red-500" : "text-gray-400"}`,
											children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-3 h-3" }), d.est_depasse ? "Dépassé" : `${d.jours_restants}j restants`]
										}),
										d.has_files && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-blue-500",
											children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3 h-3" }), "Fichiers"]
										}),
										d.soumis && d.note !== null && /* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold text-green-600",
											children: [
												"Note : ",
												d.note,
												"/20"
											]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5 text-gray-400 shrink-0 mt-1" })]
					})
				}, d.id);
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-BwcrRBcn.js.map