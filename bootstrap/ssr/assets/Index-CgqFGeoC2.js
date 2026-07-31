import { t as ToastContainer } from "./ToastContainer-CdIokmOQ.js";
import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BanknotesIcon, CheckCircleIcon, DocumentTextIcon, ExclamationTriangleIcon, LinkIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Tranches/Index.tsx
function Index({ formations, tranches, selectedFormationId, formation }) {
	const [showLienTotal, setShowLienTotal] = useState(false);
	const [lienTotal, setLienTotal] = useState((formation === null || formation === void 0 ? void 0 : formation.lien_paiement_total) || "");
	const [isSubmittingLien, setIsSubmittingLien] = useState(false);
	const handleFormationChange = (formationId) => {
		router.get("/admin/tranches", formationId ? { formation_id: formationId } : {}, { preserveState: false });
	};
	const handleDelete = (tranche) => {
		const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
		const hasContenus = tranche.cours_count && tranche.cours_count > 0 || tranche.devoirs_count && tranche.devoirs_count > 0 || tranche.evaluations_count && tranche.evaluations_count > 0;
		if (hasPaiements || hasContenus) {
			alert("❌ Impossible de supprimer cette tranche car elle est liée à des paiements ou contenus.");
			return;
		}
		if (confirm(`Supprimer la tranche ${tranche.numero} ? Cette action est irréversible.`)) router.delete(`/admin/tranches/${tranche.id}`, {
			preserveScroll: true,
			onSuccess: () => router.reload({ only: ["tranches"] })
		});
	};
	const handleLienTotalSubmit = (e) => {
		e.preventDefault();
		if (!selectedFormationId) return;
		setIsSubmittingLien(true);
		router.put(`/admin/formations/${selectedFormationId}/lien-paiement-total`, { lien_paiement_total: lienTotal }, {
			preserveScroll: true,
			onSuccess: () => {
				setIsSubmittingLien(false);
				setShowLienTotal(false);
				router.reload({ only: ["formation"] });
			},
			onError: () => setIsSubmittingLien(false)
		});
	};
	const totalTranches = tranches.length;
	const montantTotal = tranches.reduce((sum, t) => sum + Number(t.montant), 0);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tranches de paiement - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des tranches de paiement",
		children: [
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: ["Formation ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedFormationId || "",
							onChange: (e) => handleFormationChange(e.target.value),
							className: "w-full sm:w-96 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "-- Choisir une formation --"
							}), formations.map((f) => /* @__PURE__ */ jsxs("option", {
								value: f.id,
								children: [
									f.name,
									" ",
									f.abbreviation ? `(${f.abbreviation})` : ""
								]
							}, f.id))]
						})]
					}), selectedFormationId && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 text-sm text-gray-500",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(BanknotesIcon, { className: "w-4 h-4" }),
								totalTranches,
								" tranche",
								totalTranches > 1 ? "s" : ""
							]
						}), totalTranches > 0 && /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-medium text-gray-700",
								children: [montantTotal.toLocaleString(), " FCFA"]
							}), "au total"]
						})]
					})]
				})
			}),
			!selectedFormationId ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-10 h-10 text-gray-400" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold text-gray-700 mb-2",
						children: "Sélectionnez une formation"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Choisissez une formation pour gérer ses tranches de paiement"
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "p-2 bg-blue-50 rounded-xl",
								children: /* @__PURE__ */ jsx(LinkIcon, { className: "w-5 h-5 text-cab-blue" })
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-gray-700",
									children: "Lien de paiement total"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Lien pour payer toutes les tranches d'un coup"
								}),
								(formation === null || formation === void 0 ? void 0 : formation.lien_paiement_total) && !showLienTotal && /* @__PURE__ */ jsx("a", {
									href: formation.lien_paiement_total,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-xs text-cab-blue hover:underline mt-1 inline-block truncate max-w-md",
									children: formation.lien_paiement_total
								})
							] })]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setShowLienTotal(!showLienTotal),
							className: "px-4 py-2 text-sm font-medium text-cab-blue hover:bg-blue-50 rounded-xl transition-colors whitespace-nowrap",
							children: (formation === null || formation === void 0 ? void 0 : formation.lien_paiement_total) ? "Modifier" : "Ajouter un lien"
						})]
					}), showLienTotal && /* @__PURE__ */ jsxs("form", {
						onSubmit: handleLienTotalSubmit,
						className: "mt-4 flex flex-col sm:flex-row gap-3",
						children: [/* @__PURE__ */ jsx("input", {
							type: "url",
							value: lienTotal,
							onChange: (e) => setLienTotal(e.target.value),
							placeholder: "https://exemple.com/paiement-total",
							className: "flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
							required: true
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: isSubmittingLien,
								className: "px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
								children: isSubmittingLien ? "Enregistrement..." : "Enregistrer"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setShowLienTotal(false);
									setLienTotal((formation === null || formation === void 0 ? void 0 : formation.lien_paiement_total) || "");
								},
								className: "px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors",
								children: "Annuler"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end mb-6",
					children: /* @__PURE__ */ jsxs(Link, {
						href: `/admin/tranches/create?formation_id=${selectedFormationId}`,
						className: "inline-flex items-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
						children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Ajouter une tranche"]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
					children: [/* @__PURE__ */ jsx("div", {
						className: "px-6 py-4 border-b border-gray-100 bg-gray-50",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-semibold text-gray-700",
								children: "Liste des tranches"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-gray-500",
								children: [
									totalTranches,
									" tranche",
									totalTranches > 1 ? "s" : ""
								]
							})]
						})
					}), tranches.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-16",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
								children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-8 h-8 text-gray-400" })
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-sm",
								children: "Aucune tranche définie pour cette formation"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: `/admin/tranches/create?formation_id=${selectedFormationId}`,
								className: "mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium inline-block",
								children: "Ajouter votre première tranche →"
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "divide-y divide-gray-100",
						children: tranches.map((tranche) => {
							const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
							const hasContenus = tranche.cours_count && tranche.cours_count > 0 || tranche.devoirs_count && tranche.devoirs_count > 0 || tranche.evaluations_count && tranche.evaluations_count > 0;
							const isLocked = hasPaiements || hasContenus;
							return /* @__PURE__ */ jsx("div", {
								className: "p-6 hover:bg-gray-50 transition-colors",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl flex-shrink-0",
											children: /* @__PURE__ */ jsxs("span", {
												className: "text-sm font-bold text-cab-blue",
												children: ["#", tranche.numero]
											})
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 flex-wrap",
											children: [
												/* @__PURE__ */ jsxs("p", {
													className: "font-semibold text-gray-900",
													children: ["Tranche ", tranche.numero]
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "text-sm font-medium text-gray-700",
													children: [Number(tranche.montant).toLocaleString(), " FCFA"]
												}),
												hasPaiements && /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium",
													children: [
														/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }),
														tranche.paiements_count,
														" paiement",
														tranche.paiements_count > 1 ? "s" : ""
													]
												}),
												hasContenus && /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",
													children: [/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-3 h-3" }), [
														tranche.cours_count ? `${tranche.cours_count} cours` : null,
														tranche.devoirs_count ? `${tranche.devoirs_count} devoirs` : null,
														tranche.evaluations_count ? `${tranche.evaluations_count} évals` : null
													].filter(Boolean).join(", ")]
												}),
												isLocked && /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium",
													children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-3 h-3" }), "Verrouillée"]
												})
											]
										}), tranche.lien_paiement ? /* @__PURE__ */ jsxs("a", {
											href: tranche.lien_paiement,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-xs text-cab-blue hover:underline inline-flex items-center gap-1 mt-1",
											children: [/* @__PURE__ */ jsx(LinkIcon, { className: "w-3 h-3" }), "Lien de paiement"]
										}) : /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-400 mt-1",
											children: "Aucun lien de paiement"
										})] })]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Link, {
											href: `/admin/tranches/${tranche.id}/edit`,
											className: "p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors",
											title: "Modifier",
											children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => handleDelete(tranche),
											className: `p-2 rounded-xl transition-colors ${isLocked ? "text-gray-300 cursor-not-allowed" : "text-red-600 hover:bg-red-50"}`,
											title: isLocked ? "Cette tranche ne peut pas être supprimée" : "Supprimer",
											disabled: isLocked,
											children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
										})]
									})]
								})
							}, tranche.id);
						})
					})]
				}),
				tranches.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-gray-600",
								children: "Total des tranches :"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-gray-900 ml-1",
								children: totalTranches
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-gray-600",
								children: "Montant total :"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-semibold text-gray-900 ml-1",
								children: [montantTotal.toLocaleString(), " FCFA"]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-gray-600",
								children: "Dernière tranche :"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-semibold text-gray-900 ml-1",
								children: [Number(tranches[tranches.length - 1].montant).toLocaleString(), " FCFA"]
							})] })
						]
					})
				})
			] })
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CgqFGeoC2.js.map