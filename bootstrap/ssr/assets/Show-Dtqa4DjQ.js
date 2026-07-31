import { t as StudentLayout } from "./StudentLayout-MdC-2Al8.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, CalendarIcon, CheckCircleIcon, ClockIcon, DocumentIcon, ExclamationTriangleIcon, LockClosedIcon, LockOpenIcon, PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Evaluations/Show.tsx
function Show({ evaluation, soumission }) {
	var _evaluation$formation;
	const [file, setFile] = useState(null);
	const [commentaire, setCommentaire] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!file) {
			alert("Veuillez sélectionner un fichier.");
			return;
		}
		setLoading(true);
		const formData = new FormData();
		formData.append("fichier", file);
		formData.append("commentaire", commentaire);
		router.post(`/student/evaluations/${evaluation.id}/soumettre`, formData, {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: () => {
				setLoading(false);
				router.reload();
			},
			onError: () => {
				setLoading(false);
			}
		});
	};
	const getStatutBadge = () => {
		if (!soumission) return /* @__PURE__ */ jsx("span", {
			className: "px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium",
			children: "Non soumis"
		});
		if (soumission.statut === "corrige") return /* @__PURE__ */ jsxs("span", {
			className: "px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Corrigé"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }), "Soumis"]
		});
	};
	if (evaluation.est_verrouille) {
		var _evaluation$tranche_r, _evaluation$tranche_r2, _evaluation$tranche_r3;
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${evaluation.titre} - Verrouillé` }), /* @__PURE__ */ jsx(StudentLayout, {
			title: evaluation.titre,
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: "/student/evaluations",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes évaluations"]
				}), /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-8 shadow-sm border-2 border-red-200/50 bg-red-50/30 text-center",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ jsx(LockClosedIcon, { className: "w-10 h-10 text-red-500" })
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold text-gray-900",
								children: evaluation.titre
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-yellow-500" }), /* @__PURE__ */ jsxs("span", {
									className: "text-lg font-medium text-yellow-700",
									children: [
										"🔒 Tranche ",
										(_evaluation$tranche_r = evaluation.tranche_requise) === null || _evaluation$tranche_r === void 0 ? void 0 : _evaluation$tranche_r.numero,
										" requise"
									]
								})]
							}),
							((_evaluation$tranche_r2 = evaluation.tranche_requise) === null || _evaluation$tranche_r2 === void 0 ? void 0 : _evaluation$tranche_r2.montant) && /* @__PURE__ */ jsxs("p", {
								className: "text-gray-600",
								children: [
									"Payez la tranche ",
									evaluation.tranche_requise.numero,
									" de",
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "font-semibold",
										children: [evaluation.tranche_requise.montant.toLocaleString(), " FCFA"]
									}),
									" ",
									"pour accéder à cette évaluation."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500 max-w-md",
								children: "Une fois la tranche payée et validée, vous pourrez soumettre votre évaluation."
							}),
							((_evaluation$tranche_r3 = evaluation.tranche_requise) === null || _evaluation$tranche_r3 === void 0 ? void 0 : _evaluation$tranche_r3.lien_paiement) ? /* @__PURE__ */ jsxs("a", {
								href: evaluation.tranche_requise.lien_paiement,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-5 h-5" }), "Débloquer"]
							}) : /* @__PURE__ */ jsx("span", {
								className: "inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium cursor-not-allowed",
								children: "Lien indisponible"
							})
						]
					})
				})]
			})
		})] });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${evaluation.titre} - Détails de l'évaluation` }), /* @__PURE__ */ jsx(StudentLayout, {
		title: evaluation.titre,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/student/evaluations",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes évaluations"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold text-gray-900",
								children: evaluation.titre
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500 mt-1",
								children: (_evaluation$formation = evaluation.formation) === null || _evaluation$formation === void 0 ? void 0 : _evaluation$formation.name
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mt-2",
								children: [
									evaluation.date && /* @__PURE__ */ jsxs("span", {
										className: `text-sm flex items-center gap-1 ${evaluation.est_depasse ? "text-red-500" : "text-gray-500"}`,
										children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4" }), evaluation.est_depasse ? "Dépassé" : `${evaluation.jours_restants}j restants`]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "text-sm text-gray-500 flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), getStatutBadge()]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "text-sm text-gray-500 flex items-center gap-1",
										children: ["Coeff. ", evaluation.coefficient]
									})
								]
							})
						] }), soumission && soumission.note !== null && /* @__PURE__ */ jsxs("div", {
							className: "text-center bg-green-50 rounded-xl px-6 py-3 border border-green-200",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs text-green-600",
								children: "Note"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-green-700",
								children: [soumission.note, "/20"]
							})]
						})]
					})
				}),
				evaluation.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed",
						children: evaluation.description
					})]
				}),
				evaluation.contenu && evaluation.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Fichiers joints"]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: evaluation.contenu.map((file, index) => /* @__PURE__ */ jsxs("a", {
							href: file.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
							children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ jsx("span", {
								className: "text-sm text-gray-600 truncate",
								children: file.name
							})]
						}, index))
					})]
				}),
				soumission ? /* @__PURE__ */ jsxs("div", {
					className: "bg-green-50 rounded-2xl p-6 border border-green-200",
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-green-800 mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" }), "Évaluation soumise"]
						}),
						soumission.fichier && /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ jsx("a", {
								href: soumission.fichier.url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-cab-blue hover:underline text-sm",
								children: soumission.fichier.name
							})]
						}),
						soumission.commentaire && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-600 mt-2",
							children: soumission.commentaire
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 mt-3 text-xs text-gray-500",
							children: [/* @__PURE__ */ jsxs("span", { children: ["Soumis le : ", soumission.submitted_at] }), soumission.est_en_retard && /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "⚠️ En retard"
							})]
						})
					]
				}) : /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3",
						children: "📤 Soumettre mon évaluation"
					}), evaluation.est_depasse ? /* @__PURE__ */ jsx("div", {
						className: "bg-red-50 rounded-xl p-4 border border-red-200",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-red-700 text-sm",
							children: "⚠️ La date limite de cette évaluation est dépassée. Vous ne pouvez plus soumettre."
						})
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Fichier ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									type: "file",
									onChange: (e) => {
										var _e$target$files;
										return setFile(((_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0]) || null);
									},
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: "PDF, Images, etc. (Max 20MB)"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Commentaire (optionnel)"
							}), /* @__PURE__ */ jsx("textarea", {
								value: commentaire,
								onChange: (e) => setCommentaire(e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								placeholder: "Votre commentaire..."
							})] }),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
								children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
									className: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ jsx("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4"
									}), /* @__PURE__ */ jsx("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), "Envoi en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PaperAirplaneIcon, { className: "w-5 h-5" }), "Soumettre mon évaluation"] })
							})
						]
					})]
				})
			]
		})
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-Dtqa4DjQ.js.map