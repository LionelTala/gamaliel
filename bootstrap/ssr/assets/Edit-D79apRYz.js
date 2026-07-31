import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/HeroSlides/Edit.tsx
function Edit({ slide }) {
	const [previewImage, setPreviewImage] = useState(slide.image_url);
	const { data, setData, put, processing, errors } = useForm({
		titre: slide.titre,
		description: slide.description || "",
		badge: slide.badge || "",
		image: null,
		carte_titre: slide.carte_titre || "Rentrée académique",
		carte_date: slide.carte_date || "Lundi 05 Octobre 2026",
		carte_tags: slide.carte_tags || [],
		statistiques: slide.statistiques || [],
		cta_secondary_text: slide.cta_secondary_text || "",
		cta_secondary_link: slide.cta_secondary_link || "",
		is_active: slide.is_active,
		ordre: slide.ordre
	});
	const handleImageChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setData("image", file);
			const reader = new FileReader();
			reader.onloadend = () => setPreviewImage(reader.result);
			reader.readAsDataURL(file);
		}
	};
	const removeImage = () => {
		setData("image", null);
		setPreviewImage(null);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		put(`/admin/hero-slides/${slide.id}`, { forceFormData: true });
	};
	const displayImage = previewImage || "/assets/images/img1.jpeg";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Modifier un slide" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Modifier le slide Hero",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/hero-slides",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ jsx("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: handleSubmit,
							encType: "multipart/form-data",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: "Titre *"
										}),
										/* @__PURE__ */ jsx("input", {
											type: "text",
											value: data.titre,
											onChange: (e) => setData("titre", e.target.value),
											className: "w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue",
											required: true
										}),
										errors.titre && /* @__PURE__ */ jsx("p", {
											className: "text-sm text-red-600 mt-1",
											children: errors.titre
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Badge"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: data.badge,
										onChange: (e) => setData("badge", e.target.value),
										className: "w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Description"
									}), /* @__PURE__ */ jsx("textarea", {
										value: data.description,
										onChange: (e) => setData("description", e.target.value),
										rows: 2,
										className: "w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue resize-none"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: "Image"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ jsxs("label", {
												className: "flex items-center gap-2 px-4 py-2.5 border rounded-xl cursor-pointer hover:bg-gray-50",
												children: [
													/* @__PURE__ */ jsx("span", { children: "📷" }),
													/* @__PURE__ */ jsx("span", {
														className: "text-sm",
														children: "Changer l'image"
													}),
													/* @__PURE__ */ jsx("input", {
														type: "file",
														accept: "image/*",
														onChange: handleImageChange,
														className: "hidden"
													})
												]
											}), previewImage && /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: removeImage,
												className: "text-sm text-red-500 hover:text-red-700",
												children: "Supprimer"
											})]
										}),
										errors.image && /* @__PURE__ */ jsx("p", {
											className: "text-sm text-red-600 mt-1",
											children: errors.image
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-4 p-4 bg-gray-50 rounded-xl",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-gray-700 mb-2",
										children: "Bouton personnalisé (optionnel)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ jsx("input", {
											type: "text",
											value: data.cta_secondary_text,
											onChange: (e) => setData("cta_secondary_text", e.target.value),
											className: "px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue",
											placeholder: "Texte du bouton"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: data.cta_secondary_link,
											onChange: (e) => setData("cta_secondary_link", e.target.value),
											className: "px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue",
											placeholder: "Lien (URL)"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-4 mb-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: data.is_active,
											onChange: (e) => setData("is_active", e.target.checked),
											className: "w-4 h-4 text-cab-blue rounded"
										}), /* @__PURE__ */ jsx("label", {
											className: "text-sm text-gray-700",
											children: "Slide actif"
										})]
									}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", {
										type: "number",
										value: data.ordre,
										onChange: (e) => setData("ordre", parseInt(e.target.value) || 0),
										className: "w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue",
										placeholder: "Ordre",
										min: "0"
									}) })]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "w-full py-3 bg-cab-blue text-white rounded-xl font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
									children: processing ? "Mise à jour..." : "Mettre à jour"
								})
							]
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "lg:col-span-1",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-4 shadow-sm border sticky top-20",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-semibold text-gray-700 mb-3",
								children: "Aperçu en direct"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative rounded-xl overflow-hidden bg-gray-900 aspect-[16/9]",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: displayImage,
										alt: "Preview",
										className: "w-full h-full object-cover",
										onError: (e) => {
											e.target.src = "/assets/images/img1.jpeg";
										}
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" }),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute inset-0 p-4 flex flex-col justify-center",
										children: [
											data.badge && /* @__PURE__ */ jsx("span", {
												className: "inline-block w-fit bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs mb-2",
												children: data.badge
											}),
											/* @__PURE__ */ jsx("h4", {
												className: "text-white font-bold text-sm leading-tight line-clamp-2",
												children: data.titre || "Titre du slide"
											}),
											data.description && /* @__PURE__ */ jsx("p", {
												className: "text-white/70 text-xs mt-1 line-clamp-2",
												children: data.description
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap gap-2 mt-2",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]",
														children: "Certification"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]",
														children: "Découvrir"
													}),
													data.cta_secondary_text && /* @__PURE__ */ jsx("span", {
														className: "px-3 py-1 bg-cab-red rounded-full text-white text-[10px]",
														children: data.cta_secondary_text
													})
												]
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-2 w-28 text-center",
										children: [
											/* @__PURE__ */ jsx("div", { className: "w-8 h-8 mx-auto rounded-full border-2 border-cab-blue bg-white" }),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] font-bold text-gray-800 mt-1",
												children: data.carte_titre || "CAB"
											}),
											data.carte_date && /* @__PURE__ */ jsx("p", {
												className: "text-[8px] text-cab-red font-semibold",
												children: data.carte_date
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-400 mt-3 text-center",
								children: "Aperçu en temps réel"
							})
						]
					})
				})]
			})]
		})
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-D79apRYz.js.map