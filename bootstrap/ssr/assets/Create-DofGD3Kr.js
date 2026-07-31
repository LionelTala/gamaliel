import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, PhotoIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Galerie/Create.tsx
function Create() {
	const [preview, setPreview] = useState(null);
	const [fileName, setFileName] = useState("");
	const [fichier, setFichier] = useState(null);
	const [titre, setTitre] = useState("");
	const [description, setDescription] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [ordre, setOrdre] = useState(0);
	const [processing, setProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const handleFileChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setFichier(file);
			setFileName(file.name);
			const reader = new FileReader();
			reader.onload = (e) => {
				var _e$target;
				setPreview((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const removeFile = () => {
		setFichier(null);
		setPreview(null);
		setFileName("");
		const fileInput = document.getElementById("file-input");
		if (fileInput) fileInput.value = "";
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setProcessing(true);
		setErrors({});
		const formData = new FormData();
		formData.append("titre", titre);
		formData.append("description", description || "");
		formData.append("is_active", isActive ? "1" : "0");
		formData.append("ordre", String(ordre));
		if (fichier) formData.append("fichier", fichier);
		router.post("/admin/galerie", formData, {
			forceFormData: true,
			headers: { "Content-Type": "multipart/form-data" },
			onSuccess: () => {
				setProcessing(false);
			},
			onError: (err) => {
				setProcessing(false);
				setErrors(err);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Ajouter un média - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Ajouter un média",
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
								value: titre,
								onChange: (e) => setTitre(e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: Photo de la rentrée",
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
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								placeholder: "Description du média..."
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Fichier ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
								children: [preview ? /* @__PURE__ */ jsxs("div", {
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
											className: "text-xs text-gray-500 mt-1 truncate max-w-[128px]",
											children: fileName
										})
									]
								}) : /* @__PURE__ */ jsxs("div", {
									className: "w-32 h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300",
									children: [/* @__PURE__ */ jsx(PhotoIcon, { className: "w-10 h-10 text-gray-400" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-gray-400 mt-1",
										children: "Aucune image"
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "flex-1",
									children: /* @__PURE__ */ jsxs("label", {
										className: "block w-full cursor-pointer",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-cab-blue transition-colors bg-gray-50 hover:bg-gray-100",
											children: [
												/* @__PURE__ */ jsx(PhotoIcon, { className: "w-8 h-8 text-gray-400" }),
												/* @__PURE__ */ jsx("span", {
													className: "text-sm text-gray-500 mt-1",
													children: preview ? "Changer l'image" : "Choisir une image"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-400 mt-0.5",
													children: "JPG, PNG, GIF, WEBP jusqu'à 20MB"
												})
											]
										}), /* @__PURE__ */ jsx("input", {
											id: "file-input",
											type: "file",
											accept: "image/*",
											onChange: handleFileChange,
											className: "hidden"
										})]
									})
								})]
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
									checked: isActive,
									onChange: (e) => setIsActive(e.target.checked),
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
								value: ordre,
								onChange: (e) => setOrdre(parseInt(e.target.value) || 0),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								min: "0"
							})] })]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing || !fichier,
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
							}), "Ajout en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Ajouter le média"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-DofGD3Kr.js.map