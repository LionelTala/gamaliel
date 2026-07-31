import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, PencilSquareIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Galerie/Edit.tsx
function Edit({ media }) {
	var _media$is_active, _media$ordre;
	const [preview, setPreview] = useState(media.is_image ? media.url : null);
	const [fileName, setFileName] = useState(media.fichier);
	const { data, setData, processing, errors } = useForm({
		titre: media.titre || "",
		description: media.description || "",
		fichier: null,
		is_active: (_media$is_active = media.is_active) !== null && _media$is_active !== void 0 ? _media$is_active : true,
		ordre: (_media$ordre = media.ordre) !== null && _media$ordre !== void 0 ? _media$ordre : 0
	});
	const handleFileChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setData("fichier", file);
			setFileName(file.name);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const removeFile = () => {
		setData("fichier", null);
		setPreview(null);
		setFileName(media.fichier);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("_method", "PUT");
		formData.append("titre", data.titre);
		formData.append("description", data.description || "");
		formData.append("is_active", data.is_active ? "1" : "0");
		formData.append("ordre", String(data.ordre));
		if (data.fichier) formData.append("fichier", data.fichier);
		console.log("📤 Payload Galerie envoyé au serveur :");
		for (let pair of formData.entries()) console.log(`${pair[0]}:`, pair[1]);
		router.post(`/admin/galerie/${media.id}`, formData, {
			forceFormData: true,
			headers: { "Content-Type": "multipart/form-data" },
			onSuccess: () => {
				console.log("✅ Galerie mise à jour avec succès !");
			},
			onError: (err) => {
				console.error("❌ Erreurs de validation reçues :", err);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Modifier le média - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Modifier le média",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/galerie",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la galerie"]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					encType: "multipart/form-data",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "titre",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Titre ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "titre",
								type: "text",
								value: data.titre,
								onChange: (e) => setData("titre", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								required: true
							}),
							errors.titre && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.titre
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "description",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Description (optionnel)"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "description",
								value: data.description,
								onChange: (e) => setData("description", e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Fichier actuel"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [media.is_image ? /* @__PURE__ */ jsx("img", {
								src: media.url,
								alt: media.titre,
								className: "w-32 h-32 rounded-xl object-cover border border-gray-200"
							}) : media.is_video ? /* @__PURE__ */ jsx("video", {
								src: media.url,
								className: "w-32 h-32 rounded-xl object-cover border border-gray-200"
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200",
								children: /* @__PURE__ */ jsx(PhotoIcon, { className: "w-12 h-12 text-gray-400" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-gray-700",
								children: media.fichier
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: media.type_label
							})] })]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Remplacer le fichier (optionnel)"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [preview && data.fichier ? /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx("img", {
											src: preview,
											alt: "Aperçu",
											className: "w-32 h-32 rounded-xl object-cover border border-gray-200"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: removeFile,
											className: "absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors",
											children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500 mt-1",
											children: fileName
										})
									]
								}) : /* @__PURE__ */ jsxs("label", {
									className: "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white",
									children: [
										/* @__PURE__ */ jsx(PhotoIcon, { className: "w-8 h-8 text-gray-400" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-500 mt-1",
											children: "Choisir un fichier"
										}),
										/* @__PURE__ */ jsx("input", {
											type: "file",
											accept: "image/*,video/*,application/pdf,.doc,.docx",
											onChange: handleFileChange,
											className: "hidden"
										})
									]
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400",
									children: "Formats acceptés : images, vidéos, PDF, documents"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400",
									children: "Taille max : 20MB"
								})] })]
							}),
							errors.fichier && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.fichier
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
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
									children: "Média actif"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "ordre",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx("input", {
								id: "ordre",
								type: "number",
								value: data.ordre,
								onChange: (e) => setData("ordre", parseInt(e.target.value) || 0),
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
							}), "Mise à jour en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" }), "Mettre à jour"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-DOPU4FUG.js.map