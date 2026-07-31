import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Bibliotheque/Create.tsx
function Create() {
	const [imagePreview, setImagePreview] = useState(null);
	const { data, setData, post, processing, errors } = useForm({
		titre: "",
		description: "",
		prix: "",
		lien_achat: "",
		image: null,
		is_active: true
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/admin/bibliotheque", { forceFormData: true });
	};
	const handleImageChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setData("image", file);
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Ajouter un livre" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Ajouter un livre",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-6",
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/bibliotheque",
					className: "inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cab-blue transition-colors",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
				})
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-medium text-gray-700 mb-4",
							children: "Image du livre"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-6",
							children: [/* @__PURE__ */ jsx("div", {
								className: "relative",
								children: imagePreview ? /* @__PURE__ */ jsxs("div", {
									className: "relative group",
									children: [/* @__PURE__ */ jsx("img", {
										src: imagePreview,
										alt: "Aperçu",
										className: "w-32 h-44 object-cover rounded-xl border border-gray-200"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => {
											setImagePreview(null);
											setData("image", null);
										},
										className: "absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors",
										children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
									})]
								}) : /* @__PURE__ */ jsxs("div", {
									className: "w-32 h-44 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300",
									children: [/* @__PURE__ */ jsx(PhotoIcon, { className: "w-8 h-8 text-gray-400" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-gray-400 mt-1",
										children: "Pas d'image"
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsx("input", {
									type: "file",
									accept: "image/*",
									onChange: handleImageChange,
									className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-cab-blue file:text-white hover:file:bg-cab-blue-dark cursor-pointer"
								}), errors.image && /* @__PURE__ */ jsx("p", {
									className: "text-red-500 text-sm mt-1",
									children: errors.image
								})]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Titre ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: data.titre,
									onChange: (e) => setData("titre", e.target.value),
									className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								}),
								errors.titre && /* @__PURE__ */ jsx("p", {
									className: "text-red-500 text-sm mt-1",
									children: errors.titre
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Description ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: data.description,
									onChange: (e) => setData("description", e.target.value),
									rows: 4,
									className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								}),
								errors.description && /* @__PURE__ */ jsx("p", {
									className: "text-red-500 text-sm mt-1",
									children: errors.description
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Prix (FCFA)"
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									value: data.prix,
									onChange: (e) => setData("prix", e.target.value),
									className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Laissez vide si gratuit"
								})] }), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Lien d'achat"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "url",
										value: data.lien_achat,
										onChange: (e) => setData("lien_achat", e.target.value),
										className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "https://..."
									}),
									errors.lien_achat && /* @__PURE__ */ jsx("p", {
										className: "text-red-500 text-sm mt-1",
										children: errors.lien_achat
									})
								] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									id: "is_active",
									checked: data.is_active,
									onChange: (e) => setData("is_active", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "is_active",
									className: "text-sm font-medium text-gray-700",
									children: "Actif"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/admin/bibliotheque",
							className: "px-6 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
							children: "Annuler"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "px-6 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-blue-dark transition-colors disabled:opacity-50",
							children: processing ? "Enregistrement..." : "Ajouter le livre"
						})]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-K9_yS9BW.js.map