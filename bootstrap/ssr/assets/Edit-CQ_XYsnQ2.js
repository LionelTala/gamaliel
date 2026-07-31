import { t as ToastContainer } from "./ToastContainer-CdIokmOQ.js";
import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, BanknotesIcon, CheckCircleIcon, CreditCardIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Paiements/Edit.tsx
function Edit({ paiement }) {
	const { data, setData, put, processing, errors } = useForm({
		reference_paiement: paiement.reference_paiement || "",
		note: paiement.note || ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		put(`/admin/paiements/${paiement.id}`, {
			preserveScroll: true,
			onSuccess: () => {
				window.location.href = `/admin/paiements?formation_id=${paiement.tranche.formation.id}`;
			}
		});
	};
	const isPaid = !!paiement.paye_le;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Modifier paiement - ${paiement.student.full_name}` }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Modifier le paiement",
		children: [/* @__PURE__ */ jsx(ToastContainer, {}), /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: `/admin/paiements?formation_id=${paiement.tranche.formation.id}`,
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste des paiements"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-3 bg-blue-50 rounded-xl",
							children: /* @__PURE__ */ jsx(CreditCardIcon, { className: "w-6 h-6 text-cab-blue" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-xl font-bold text-gray-900",
							children: "Modifier le paiement"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-500",
							children: [
								paiement.student.full_name,
								" - Tranche ",
								paiement.tranche.numero
							]
						})] })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4 text-sm",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Étudiant :"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900 ml-2",
									children: paiement.student.full_name
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Matricule :"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900 ml-2",
									children: paiement.student.matricule
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Formation :"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900 ml-2",
									children: paiement.tranche.formation.name
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Tranche :"
								}), /* @__PURE__ */ jsxs("span", {
									className: "font-medium text-gray-900 ml-2",
									children: [
										"#",
										paiement.tranche.numero,
										" - ",
										paiement.tranche.montant.toLocaleString(),
										" FCFA"
									]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Statut :"
								}), /* @__PURE__ */ jsx("span", {
									className: `ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
									children: isPaid ? /* @__PURE__ */ jsxs(Fragment, { children: [
										/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }),
										"Payé le ",
										new Date(paiement.paye_le).toLocaleDateString("fr-FR")
									] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "En attente"] })
								})] }),
								paiement.confirmateur && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Confirmé par :"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900 ml-2",
									children: paiement.confirmateur.name
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500",
									children: "Créé le :"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900 ml-2",
									children: new Date(paiement.created_at).toLocaleDateString("fr-FR")
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "reference_paiement",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Référence de paiement"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "reference_paiement",
										type: "text",
										value: data.reference_paiement,
										onChange: (e) => setData("reference_paiement", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Ex: ORANGE-123456"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-gray-400",
									children: "Référence du paiement (Orange Money, MTN Mobile Money, etc.)"
								}),
								errors.reference_paiement && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.reference_paiement
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "note",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Note"
								}),
								/* @__PURE__ */ jsx("textarea", {
									id: "note",
									value: data.note,
									onChange: (e) => setData("note", e.target.value),
									rows: 3,
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
									placeholder: "Note sur le paiement..."
								}),
								errors.note && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.note
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Statut du paiement"
									}), /* @__PURE__ */ jsx("span", {
										className: `inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
										children: isPaid ? "✅ Payé" : "⏳ En attente"
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: isPaid ? "Le paiement a déjà été confirmé. Vous ne pouvez modifier que la référence et la note." : "Le paiement est en attente de validation."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ jsx(Link, {
									href: `/admin/paiements?formation_id=${paiement.tranche.formation.id}`,
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
		})]
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-CQ_XYsnQ2.js.map