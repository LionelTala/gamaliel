import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, BanknotesIcon, ExclamationTriangleIcon, LinkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Tranches/Edit.tsx
function Edit({ tranche, formations }) {
	const { data, setData, put, processing, errors } = useForm({
		montant: tranche.montant.toString(),
		lien_paiement: tranche.lien_paiement || ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		put(`/admin/tranches/${tranche.id}`, {
			preserveScroll: true,
			onSuccess: () => {
				window.location.href = `/admin/tranches?formation_id=${tranche.formation_id}`;
			}
		});
	};
	const formation = formations.find((f) => f.id === tranche.formation_id);
	const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
	const hasContenus = tranche.cours_count && tranche.cours_count > 0 || tranche.devoirs_count && tranche.devoirs_count > 0 || tranche.evaluations_count && tranche.evaluations_count > 0;
	const isLocked = hasPaiements || hasContenus;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Modifier tranche ${tranche.numero} - Admin` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: `Modifier la tranche ${tranche.numero}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: `/admin/tranches?formation_id=${tranche.formation_id}`,
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste des tranches"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-3 bg-blue-50 rounded-xl",
							children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-6 h-6 text-cab-blue" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
							className: "text-xl font-bold text-gray-900",
							children: ["Tranche ", tranche.numero]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-500",
							children: [
								(formation === null || formation === void 0 ? void 0 : formation.name) || "Formation",
								" (",
								(formation === null || formation === void 0 ? void 0 : formation.abbreviation) || "-",
								")"
							]
						})] })]
					}),
					isLocked && /* @__PURE__ */ jsx("div", {
						className: "mb-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-yellow-800",
									children: "Cette tranche est verrouillée"
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "mt-1 text-xs text-yellow-700 space-y-1 list-disc list-inside",
									children: [hasPaiements && /* @__PURE__ */ jsxs("li", { children: [
										tranche.paiements_count,
										" paiement",
										tranche.paiements_count > 1 ? "s" : "",
										" existant",
										tranche.paiements_count > 1 ? "s" : ""
									] }), hasContenus && /* @__PURE__ */ jsxs("li", { children: [[
										tranche.cours_count ? `${tranche.cours_count} cours` : null,
										tranche.devoirs_count ? `${tranche.devoirs_count} devoirs` : null,
										tranche.evaluations_count ? `${tranche.evaluations_count} évaluations` : null
									].filter(Boolean).join(", "), " lié(s)"] })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-yellow-700",
									children: "Seul le montant et le lien de paiement peuvent être modifiés."
								})
							] })]
						})
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Numéro de tranche"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-sm font-bold text-cab-blue",
										children: ["#", tranche.numero]
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: "Le numéro est fixe et ne peut pas être modifié"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Formation"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-sm font-semibold text-gray-900",
										children: [
											(formation === null || formation === void 0 ? void 0 : formation.name) || "-",
											" (",
											(formation === null || formation === void 0 ? void 0 : formation.abbreviation) || "-",
											")"
										]
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: "La formation ne peut pas être modifiée"
								})]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "montant",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Montant (FCFA) ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "montant",
										type: "number",
										min: "0",
										step: "100",
										value: data.montant,
										onChange: (e) => setData("montant", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										required: true
									})]
								}),
								errors.montant && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.montant
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "lien_paiement",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Lien de paiement"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(LinkIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "lien_paiement",
										type: "url",
										value: data.lien_paiement,
										onChange: (e) => setData("lien_paiement", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "https://exemple.com/paiement-tranche"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-gray-400",
									children: "Lien vers la page de paiement pour cette tranche spécifique"
								}),
								errors.lien_paiement && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.lien_paiement
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-sm font-semibold text-gray-700 mb-2",
									children: "Résumé"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-1 text-sm",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Tranche :"
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-medium text-gray-900",
												children: ["#", tranche.numero]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Formation :"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-medium text-gray-900",
												children: (formation === null || formation === void 0 ? void 0 : formation.name) || "-"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Montant :"
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-medium text-gray-900",
												children: [Number(data.montant).toLocaleString(), " FCFA"]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Lien de paiement :"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-medium text-gray-900 truncate max-w-[200px]",
												children: data.lien_paiement || "Non défini"
											})]
										}),
										isLocked && /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between text-yellow-600",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-gray-500",
												children: "Statut :"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-medium",
												children: "🔒 Verrouillé"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ jsx(Link, {
									href: `/admin/tranches?formation_id=${tranche.formation_id}`,
									className: "flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-center",
									children: "Annuler"
								}), /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
									children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
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
									}), "Enregistrement..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" }), "Mettre à jour"] })
								})]
							})
						]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-CPd_xxPU2.js.map