import { t as StudentLayout } from "./StudentLayout-MdC-2Al8.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRightIcon, BookOpenIcon, CalendarIcon, ChartBarIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, CreditCardIcon, DocumentTextIcon, EyeIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Dashboard.tsx
function Dashboard({ student, stats, derniersCours, devoirsARendre, dernieresNotes }) {
	var _student$full_name;
	const handlePayerTranche = (trancheId) => {
		if (confirm("Confirmer le paiement de cette tranche ?")) router.post("/student/paiements", { tranche_id: trancheId });
	};
	const statsCards = [
		{
			label: "Cours",
			value: `${stats.cours_vus} / ${stats.total_cours}`,
			icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" }),
			color: "bg-blue-500"
		},
		{
			label: "Devoirs",
			value: `${stats.devoirs_soumis} / ${stats.total_devoirs}`,
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" }),
			color: "bg-orange-500"
		},
		{
			label: "Évaluations",
			value: `${stats.evaluations_soumis} / ${stats.total_evaluations}`,
			icon: /* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5" }),
			color: "bg-purple-500"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tableau de bord - Étudiant" }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: "Tableau de bord",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-16 h-16 rounded-full bg-cab-blue text-white flex items-center justify-center text-2xl font-bold",
							children: ((_student$full_name = student.full_name) === null || _student$full_name === void 0 || (_student$full_name = _student$full_name.charAt(0)) === null || _student$full_name === void 0 ? void 0 : _student$full_name.toUpperCase()) || "E"
						}), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-bold text-gray-900",
								children: student.full_name
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-500",
								children: ["Matricule: ", /* @__PURE__ */ jsx("span", {
									className: "font-mono font-semibold",
									children: student.matricule
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 mt-1 text-sm",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-gray-500",
										children: student.student_type
									}),
									/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-300" }),
									student.vague && /* @__PURE__ */ jsxs("span", {
										className: "text-gray-500",
										children: [
											student.vague.formation,
											" • Vague: ",
											student.vague.name
										]
									}),
									student.certification && /* @__PURE__ */ jsxs("span", {
										className: "text-gray-500",
										children: [
											student.certification.formation,
											" • Certification: ",
											student.certification.titre
										]
									})
								]
							})
						] })]
					}), /* @__PURE__ */ jsxs(Link, {
						href: "/profil",
						className: "inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors",
						children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), "Modifier mon profil"]
					})]
				})
			}),
			!student.is_certification && student.vague && student.tranches.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(CreditCardIcon, { className: "w-5 h-5 text-cab-blue" }), "Suivi des paiements"]
						}), student.toutes_tranches_payees && /* @__PURE__ */ jsx("span", {
							className: "px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium",
							children: "✅ Toutes les tranches payées"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: student.tranches.map((tranche) => /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-xl gap-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "font-medium text-gray-900",
										children: ["Tranche ", tranche.numero]
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-sm text-gray-600",
										children: [tranche.montant.toLocaleString(), " FCFA"]
									})]
								}),
								tranche.est_payee && /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 text-sm text-green-600 font-medium",
									children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Payée"]
								}),
								tranche.est_en_attente && /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 text-sm text-yellow-600 font-medium",
									children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }), "En attente de validation"]
								})
							] }), /* @__PURE__ */ jsx("div", {
								className: "flex gap-2",
								children: tranche.est_payee ? /* @__PURE__ */ jsx("span", {
									className: "px-4 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium",
									children: "✓ Payée"
								}) : tranche.est_en_attente ? /* @__PURE__ */ jsx("span", {
									className: "px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium",
									children: "En attente..."
								}) : /* @__PURE__ */ jsx(Fragment, { children: tranche.lien_paiement ? /* @__PURE__ */ jsx("a", {
									href: tranche.lien_paiement,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "px-4 py-1.5 bg-cab-blue text-white rounded-lg text-sm font-medium hover:bg-cab-dark transition-colors",
									children: "Payer"
								}) : /* @__PURE__ */ jsx("button", {
									onClick: () => handlePayerTranche(tranche.id),
									className: "px-4 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors",
									children: "Demander paiement"
								}) })
							})]
						}, tranche.id))
					}),
					student.vague.lien_paiement_total && !student.toutes_tranches_payees && /* @__PURE__ */ jsx("div", {
						className: "mt-4",
						children: /* @__PURE__ */ jsx("a", {
							href: student.vague.lien_paiement_total,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block w-full px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold text-center hover:bg-cab-dark transition-colors",
							children: "Payer toutes les tranches restantes"
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6",
				children: statsCards.map((stat) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500",
							children: stat.label
						}), /* @__PURE__ */ jsx("div", {
							className: `${stat.color} w-8 h-8 rounded-xl flex items-center justify-center text-white`,
							children: stat.icon
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-gray-900 mt-1",
						children: stat.value
					})]
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }), "Derniers cours"]
						}), /* @__PURE__ */ jsxs(Link, {
							href: "/student/cours",
							className: "text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1",
							children: ["Voir tout", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3 h-3" })]
						})]
					}), derniersCours.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 text-center py-4",
						children: "Aucun cours disponible"
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: derniersCours.map((cours) => /* @__PURE__ */ jsx(Link, {
							href: cours.link,
							className: "block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gray-900",
											children: cours.titre
										}), cours.vu ? /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs",
											children: "Vu"
										}) : /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs",
											children: "Non vu"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 mt-1",
										children: [
											cours.has_video && /* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-1 text-xs text-red-500",
												children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-3 h-3" }), "Vidéo"]
											}),
											cours.has_files && /* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-1 text-xs text-blue-500",
												children: [/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-3 h-3" }), "Fichiers"]
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-400",
												children: cours.created_at
											})
										]
									})]
								}), /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4 text-gray-400 shrink-0" })]
							})
						}, cours.id))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5 text-orange-500" }), "Devoirs à rendre"]
						}), /* @__PURE__ */ jsxs(Link, {
							href: "/student/devoirs",
							className: "text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1",
							children: ["Voir tout", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3 h-3" })]
						})]
					}), devoirsARendre.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 text-center py-4",
						children: "Aucun devoir en attente"
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: devoirsARendre.map((devoir) => /* @__PURE__ */ jsx(Link, {
							href: devoir.link,
							className: "block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-gray-900",
									children: devoir.titre
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 mt-1",
									children: [devoir.date_limite && /* @__PURE__ */ jsxs("span", {
										className: `text-xs flex items-center gap-1 ${devoir.est_depasse ? "text-red-500" : "text-gray-400"}`,
										children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-3 h-3" }), devoir.est_depasse ? "Dépassé" : `${devoir.jours_restants}j restants`]
									}), devoir.has_files && /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-blue-500 flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-3 h-3" }), "Fichiers"]
									})]
								})] }), /* @__PURE__ */ jsx(ClockIcon, { className: `w-4 h-4 shrink-0 ${devoir.est_depasse ? "text-red-500" : "text-gray-400"}` })]
							})
						}, devoir.id))
					})]
				})]
			}),
			dernieresNotes.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5 text-green-500" }), "Dernières notes"]
					}), /* @__PURE__ */ jsxs(Link, {
						href: "/student/devoirs",
						className: "text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1",
						children: ["Voir tout", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3 h-3" })]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-3",
					children: dernieresNotes.map((note) => /* @__PURE__ */ jsx(Link, {
						href: note.link,
						className: "block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-gray-900",
										children: note.titre
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-gray-400",
										children: note.type
									})]
								}),
								note.commentaire && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 line-clamp-1",
									children: note.commentaire
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: note.corrected_at
								})
							] }), /* @__PURE__ */ jsx("div", {
								className: "text-center",
								children: /* @__PURE__ */ jsxs("p", {
									className: "text-xl font-bold text-green-600",
									children: [note.note, "/20"]
								})
							})]
						})
					}, note.id))
				})]
			})
		]
	})] });
}
//#endregion
export { Dashboard as default };

//# sourceMappingURL=Dashboard-DR6Drdot.js.map