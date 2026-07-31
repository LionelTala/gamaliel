import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Formations/Create.tsx
function Create() {
	const [previewImage, setPreviewImage] = useState(null);
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		abbreviation: "",
		description: "",
		debouches: "",
		duration: "",
		diplome: "",
		frais: "",
		image: null,
		lien_externe: "",
		lien_label: "",
		is_active: true,
		order: 0
	});
	const handleImageChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setData("image", file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const removeImage = () => {
		setData("image", null);
		setPreviewImage(null);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/admin/formations", { forceFormData: true });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Créer une formation - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Créer une formation",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/formations",
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
								htmlFor: "name",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Nom de la formation ", /* @__PURE__ */ jsx("span", {
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
								placeholder: "Ex: Réseaux & Maintenance Informatique",
								required: true
							}),
							errors.name && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.name
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "abbreviation",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Abréviation ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "abbreviation",
								type: "text",
								value: data.abbreviation,
								onChange: (e) => setData("abbreviation", e.target.value.toUpperCase()),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors uppercase",
								placeholder: "Ex: RES",
								maxLength: 10,
								required: true
							}),
							errors.abbreviation && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.abbreviation
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Image de la formation"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-1 flex items-center gap-4",
								children: previewImage ? /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("img", {
										src: previewImage,
										alt: "Aperçu",
										className: "w-32 h-32 rounded-xl object-cover border border-gray-200"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: removeImage,
										className: "absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors",
										children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
									})]
								}) : /* @__PURE__ */ jsxs("label", {
									className: "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-2xl",
											children: "📷"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-500 mt-1",
											children: "Ajouter"
										}),
										/* @__PURE__ */ jsx("input", {
											type: "file",
											accept: "image/*",
											onChange: handleImageChange,
											className: "hidden"
										})
									]
								})
							}),
							errors.image && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.image
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "duration",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Durée ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "duration",
									type: "text",
									value: data.duration,
									onChange: (e) => setData("duration", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: 8 mois + 2 mois de stage",
									required: true
								}),
								errors.duration && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.duration
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "diplome",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Diplôme obtenu ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "diplome",
									type: "text",
									value: data.diplome,
									onChange: (e) => setData("diplome", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: Certificat de Professionnalisation",
									required: true
								}),
								errors.diplome && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.diplome
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "frais",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Frais de formation (FCFA) ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "frais",
								type: "number",
								value: data.frais,
								onChange: (e) => setData("frais", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: 300000",
								min: "0",
								required: true
							}),
							errors.frais && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.frais
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "description",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Description ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "description",
								value: data.description,
								onChange: (e) => setData("description", e.target.value),
								rows: 4,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								placeholder: "Description détaillée de la formation...",
								required: true
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "debouches",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Débouchés ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "debouches",
								value: data.debouches,
								onChange: (e) => setData("debouches", e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								placeholder: "Liste des métiers possibles après la formation...",
								required: true
							}),
							errors.debouches && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.debouches
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-gray-700 mb-3",
									children: "Bouton dynamique (optionnel)"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "lien_label",
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Libellé du bouton"
									}), /* @__PURE__ */ jsx("input", {
										id: "lien_label",
										type: "text",
										value: data.lien_label,
										onChange: (e) => setData("lien_label", e.target.value),
										className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Ex: Voir les détails"
									})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "lien_externe",
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "URL du lien"
									}), /* @__PURE__ */ jsx("input", {
										id: "lien_externe",
										type: "url",
										value: data.lien_externe,
										onChange: (e) => setData("lien_externe", e.target.value),
										className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "https://example.com/formation"
									})] })]
								}),
								errors.lien_label && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.lien_label
								}),
								errors.lien_externe && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.lien_externe
								})
							]
						}),
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
									children: "Formation active"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "order",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx("input", {
								id: "order",
								type: "number",
								value: data.order,
								onChange: (e) => setData("order", parseInt(e.target.value)),
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
							}), "Création en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Créer la formation"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-UR0lD1oV.js.map