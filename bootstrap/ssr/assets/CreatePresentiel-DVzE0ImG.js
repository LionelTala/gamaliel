import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Formations/CreatePresentiel.tsx
function CreatePresentiel() {
	const [previewImage, setPreviewImage] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [diplome, setDiplome] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);
	const [icon, setIcon] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [ordre, setOrdre] = useState(0);
	const [couleur, setCouleur] = useState("blue");
	const [tags, setTags] = useState(["Cours du jour", "Cours du soir"]);
	const [debouches, setDebouches] = useState([]);
	const [programme, setProgramme] = useState([]);
	const [newTag, setNewTag] = useState("");
	const [newDebouche, setNewDebouche] = useState("");
	const [newProgramme, setNewProgramme] = useState("");
	const handleImageChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const removeImage = () => {
		setImage(null);
		setPreviewImage(null);
		const fileInput = document.getElementById("image-input");
		if (fileInput) fileInput.value = "";
	};
	const addItem = (list, setList, value, setValue) => {
		if (value.trim() && !list.includes(value.trim())) {
			setList([...list, value.trim()]);
			setValue("");
		}
	};
	const removeItem = (list, setList, item) => {
		setList(list.filter((i) => i !== item));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setProcessing(true);
		setErrors({});
		const formData = new FormData();
		formData.append("type", "presentiel");
		formData.append("title", title);
		formData.append("abbreviation", abbreviation);
		formData.append("description", description);
		formData.append("duration", duration);
		formData.append("diplome", diplome);
		formData.append("price", price);
		if (icon) formData.append("icon", icon);
		formData.append("tags", JSON.stringify(tags));
		formData.append("debouches", JSON.stringify(debouches));
		formData.append("programme", JSON.stringify(programme));
		formData.append("couleur", couleur);
		formData.append("is_active", isActive ? "1" : "0");
		formData.append("ordre", String(ordre));
		if (image) formData.append("image", image);
		router.post("/admin/formations", formData, {
			forceFormData: true,
			headers: { "Content-Type": "multipart/form-data" }
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Créer une formation présentiel" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Créer une formation présentiel",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/formations?type=presentiel",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					encType: "multipart/form-data",
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
								value: title,
								onChange: (e) => setTitle(e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: Secrétariat Bureautique",
								required: true
							}),
							errors.title && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.title
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Abréviation ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								value: abbreviation,
								onChange: (e) => setAbbreviation(e.target.value.toUpperCase()),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors uppercase",
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
								children: "Image"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [previewImage ? /* @__PURE__ */ jsxs("div", {
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
									className: "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white",
									children: [
										/* @__PURE__ */ jsx(PhotoIcon, { className: "w-8 h-8 text-gray-400" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-500 mt-1",
											children: "Ajouter une image"
										}),
										/* @__PURE__ */ jsx("input", {
											id: "image-input",
											type: "file",
											accept: "image/*",
											onChange: handleImageChange,
											className: "hidden"
										})
									]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400",
									children: "Format recommandé: 800x500 (max 2MB)"
								})]
							}),
							errors.image && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.image
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Icône (emoji)"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: icon,
							onChange: (e) => setIcon(e.target.value),
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
							placeholder: "Ex: 📋, 💻, 🎨",
							maxLength: 5
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Durée ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: duration,
									onChange: (e) => setDuration(e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "8 mois + 2 mois de stage",
									required: true
								}),
								errors.duration && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.duration
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Diplôme ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: diplome,
									onChange: (e) => setDiplome(e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Certificat de Professionnalisation",
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
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Prix (FCFA) ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "number",
								value: price,
								onChange: (e) => setPrice(e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "Ex: 250000",
								min: "0",
								step: "1000",
								required: true
							}),
							errors.price && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.price
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
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 4,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								required: true
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Tags"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									value: newTag,
									onChange: (e) => setNewTag(e.target.value),
									className: "flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: Cours du jour",
									onKeyDown: (e) => e.key === "Enter" && addItem(tags, setTags, newTag, setNewTag)
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => addItem(tags, setTags, newTag, setNewTag),
									className: "px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
									children: "Ajouter"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 mt-2",
								children: tags.map((item) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm",
									children: [item, /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => removeItem(tags, setTags, item),
										className: "text-red-500 hover:text-red-700",
										children: "×"
									})]
								}, item))
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Débouchés"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									value: newDebouche,
									onChange: (e) => setNewDebouche(e.target.value),
									className: "flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: Graphiste digital",
									onKeyDown: (e) => e.key === "Enter" && addItem(debouches, setDebouches, newDebouche, setNewDebouche)
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => addItem(debouches, setDebouches, newDebouche, setNewDebouche),
									className: "px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
									children: "Ajouter"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 mt-2",
								children: debouches.map((item) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm",
									children: [item, /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => removeItem(debouches, setDebouches, item),
										className: "text-red-500 hover:text-red-700",
										children: "×"
									})]
								}, item))
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Programme"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									value: newProgramme,
									onChange: (e) => setNewProgramme(e.target.value),
									className: "flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: Adobe Illustrator",
									onKeyDown: (e) => e.key === "Enter" && addItem(programme, setProgramme, newProgramme, setNewProgramme)
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => addItem(programme, setProgramme, newProgramme, setNewProgramme),
									className: "px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
									children: "Ajouter"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 mt-2",
								children: programme.map((item) => /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-sm",
									children: [item, /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => removeItem(programme, setProgramme, item),
										className: "text-red-500 hover:text-red-700",
										children: "×"
									})]
								}, item))
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Couleur"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									value: "blue",
									checked: couleur === "blue",
									onChange: (e) => setCouleur(e.target.value),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-700",
									children: "🔵 Bleu"
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									value: "red",
									checked: couleur === "red",
									onChange: (e) => setCouleur(e.target.value),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-700",
									children: "🔴 Rouge"
								})]
							})]
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: isActive,
									onChange: (e) => setIsActive(e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									className: "text-sm text-gray-700",
									children: "Formation active"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								value: ordre,
								onChange: (e) => setOrdre(parseInt(e.target.value) || 0),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								min: "0"
							})] })]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
							children: processing ? "Création en cours..." : "Créer la formation présentiel"
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { CreatePresentiel as default };

//# sourceMappingURL=CreatePresentiel-DVzE0ImG.js.map