import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, BanknotesIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Tranches/Create.tsx
function Create({ formations, formationId }) {
	var _formations$find;
	const { data, setData, post, processing, errors } = useForm({
		formation_id: formationId || "",
		montant: "",
		lien_paiement: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/admin/tranches", {
			preserveScroll: true,
			onSuccess: () => {
				window.location.href = `/admin/tranches?formation_id=${data.formation_id}`;
			}
		});
	};
	formations.find((f) => f.id === Number(data.formation_id));
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Ajouter une tranche - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Ajouter une tranche",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: `/admin/tranches${data.formation_id ? `?formation_id=${data.formation_id}` : ""}`,
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste des tranches"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-3 bg-blue-50 rounded-xl",
						children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-6 h-6 text-cab-blue" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-xl font-bold text-gray-900",
						children: "Ajouter une tranche"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Définissez une nouvelle tranche de paiement pour une formation"
					})] })]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "formation_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Formation ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "formation_id",
								value: data.formation_id,
								onChange: (e) => setData("formation_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								required: true,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une formation --"
								}), formations.map((f) => /* @__PURE__ */ jsxs("option", {
									value: f.id,
									children: [
										f.name,
										" (",
										f.abbreviation,
										")"
									]
								}, f.id))]
							}),
							errors.formation_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.formation_id
							})
						] }),
						data.formation_id && /* @__PURE__ */ jsxs("div", {
							className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-blue-700",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "Numéro de la tranche :"
								}), /* @__PURE__ */ jsxs("span", {
									className: "ml-2",
									children: [
										"Tranche ",
										formations.find((f) => f.id === Number(data.formation_id)) ? "Nouvelle" : "1",
										" (auto-incrémenté)"
									]
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-blue-500 mt-1",
								children: "Le numéro de la tranche sera automatiquement attribué par le système"
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
									placeholder: "Ex: 150000",
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
						data.formation_id && data.montant && /* @__PURE__ */ jsxs("div", {
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
											children: "Formation :"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-medium text-gray-900",
											children: ((_formations$find = formations.find((f) => f.id === Number(data.formation_id))) === null || _formations$find === void 0 ? void 0 : _formations$find.name) || "-"
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
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 pt-4 border-t border-gray-100",
							children: [/* @__PURE__ */ jsx(Link, {
								href: `/admin/tranches${data.formation_id ? `?formation_id=${data.formation_id}` : ""}`,
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
								}), "Création..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Ajouter la tranche"] })
							})]
						})
					]
				})]
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-Bnpf2CCb2.js.map