import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Vagues/Create.tsx
function Create({ formations }) {
	const { data, setData, post, processing, errors } = useForm({
		formation_id: "",
		name: "",
		date_debut: "",
		date_fin: "",
		capacite: "",
		is_active: true,
		order: 0
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/admin/vagues");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Créer une vague - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Créer une vague",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/vagues",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
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
								}), formations.map((formation) => /* @__PURE__ */ jsxs("option", {
									value: formation.id,
									children: [
										formation.name,
										" (",
										formation.abbreviation,
										")"
									]
								}, formation.id))]
							}),
							errors.formation_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.formation_id
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "name",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Nom de la vague ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "name",
								type: "text",
								value: data.name,
								onChange: (e) => setData("name", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: Vague Janvier 2027",
								required: true
							}),
							errors.name && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.name
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "date_debut",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Date de début ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "date_debut",
									type: "date",
									value: data.date_debut,
									onChange: (e) => setData("date_debut", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								}),
								errors.date_debut && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.date_debut
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "date_fin",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Date de fin ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "date_fin",
									type: "date",
									value: data.date_fin,
									onChange: (e) => setData("date_fin", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								}),
								errors.date_fin && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.date_fin
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "capacite",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Capacité (nombre de places)"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "capacite",
								type: "number",
								value: data.capacite,
								onChange: (e) => setData("capacite", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: 30 (laisser vide pour illimité)",
								min: "1"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-400 mt-1",
								children: "Laissez vide pour une capacité illimitée"
							}),
							errors.capacite && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.capacite
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									id: "is_active",
									type: "checkbox",
									checked: data.is_active,
									onChange: (e) => setData("is_active", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "is_active",
									className: "text-sm text-gray-700",
									children: "Vague active"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "order",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx("input", {
								id: "order",
								type: "number",
								value: data.order,
								onChange: (e) => setData("order", parseInt(e.target.value) || 0),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								min: "0"
							})] })]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
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
							}), "Création en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Créer la vague"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-pA6i4vHg.js.map