import { t as AdminLayout } from "./AdminLayout-BD3FfVJf.js";
import { t as uploadState } from "./uploadState-Baqu84Jo.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { ArrowLeftIcon, DocumentIcon, PencilSquareIcon, PlusIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/EditLesson.tsx
function EditLesson({ lesson, cours }) {
	const [files, setFiles] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const [videoPreview, setVideoPreview] = useState(lesson.video_stream_url || lesson.video_url || null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [progress, setProgress] = useState(null);
	const fileInputRef = useRef(null);
	const videoInputRef = useRef(null);
	const { data, setData, errors } = useForm({
		titre: lesson.titre,
		description: lesson.description || "",
		contenu: lesson.contenu || "",
		video: null,
		video_title: lesson.video_title || "",
		order: lesson.order,
		is_active: lesson.is_active,
		files: []
	});
	const handleVideoChange = (e) => {
		var _e$target$files;
		const file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
		if (file) {
			setData("video", file);
			if (videoPreview && videoPreview.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
			setVideoPreview(URL.createObjectURL(file));
		}
	};
	const removeVideo = () => {
		setData("video", null);
		if (videoPreview && videoPreview.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
		setVideoPreview(lesson.video_stream_url || lesson.video_url || null);
		if (videoInputRef.current) videoInputRef.current.value = "";
	};
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		const updatedFiles = [...files, ...selectedFiles];
		setFiles(updatedFiles);
		setData("files", updatedFiles);
		const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
		setFilePreviews([...filePreviews, ...newPreviews]);
	};
	const removeFile = (index) => {
		const newFiles = files.filter((_, i) => i !== index);
		const newPreviews = filePreviews.filter((_, i) => i !== index);
		setFiles(newFiles);
		setFilePreviews(newPreviews);
		setData("files", newFiles);
		if (filePreviews[index] && filePreviews[index].startsWith("blob:")) URL.revokeObjectURL(filePreviews[index]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setProgress(0);
		uploadState.setActive(true);
		const formData = new FormData();
		formData.append("_method", "PUT");
		formData.append("titre", data.titre);
		formData.append("description", data.description || "");
		formData.append("contenu", data.contenu || "");
		formData.append("video_title", data.video_title || "");
		formData.append("order", String(data.order));
		formData.append("is_active", data.is_active ? "1" : "0");
		if (data.video) formData.append("video", data.video);
		data.files.forEach((file) => {
			formData.append("files[]", file);
		});
		router.post(`/admin/cours/lesson/${lesson.id}`, formData, {
			forceFormData: true,
			headers: { "Content-Type": "multipart/form-data" },
			onProgress: (event) => {
				if ((event === null || event === void 0 ? void 0 : event.percentage) != null) setProgress(event.percentage);
			},
			onSuccess: () => {
				setIsSubmitting(false);
				setProgress(null);
				uploadState.setActive(false);
			},
			onError: () => {
				setIsSubmitting(false);
				setProgress(null);
				uploadState.setActive(false);
			},
			onFinish: () => {
				setIsSubmitting(false);
				setProgress(null);
				uploadState.setActive(false);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Modifier ${lesson.titre}` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Modifier la leçon",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: `/admin/cours/${cours.id}`,
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour au cours"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100",
					children: /* @__PURE__ */ jsxs("p", {
						className: "text-sm text-blue-700",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: "ℹ️ Accès hérité du cours"
							}),
							/* @__PURE__ */ jsx("br", {}),
							cours.tranche_requise ? /* @__PURE__ */ jsxs(Fragment, { children: ["Cette leçon est accessible aux étudiants ayant payé la ", /* @__PURE__ */ jsxs("strong", { children: ["Tranche ", cours.tranche_requise.numero] })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
								"Cette leçon est accessible à ",
								/* @__PURE__ */ jsx("strong", { children: "tous les étudiants" }),
								" (aucune tranche requise)"
							] })
						]
					})
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
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
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								required: true
							}),
							errors.titre && /* @__PURE__ */ jsx("span", {
								className: "text-xs text-red-500 mt-1",
								children: errors.titre
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Description"
						}), /* @__PURE__ */ jsx("textarea", {
							value: data.description,
							onChange: (e) => setData("description", e.target.value),
							rows: 2,
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Contenu"
						}), /* @__PURE__ */ jsx("textarea", {
							value: data.contenu,
							onChange: (e) => setData("contenu", e.target.value),
							rows: 4,
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4",
							children: [
								/* @__PURE__ */ jsxs("h3", {
									className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-cab-blue" }), "Vidéo de la leçon (optionnel)"]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Titre de la vidéo"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: data.video_title,
									onChange: (e) => setData("video_title", e.target.value),
									placeholder: "Ex: Introduction aux concepts clés",
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Fichier Vidéo (MP4, WebM - Max 500Mo)"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "file",
										ref: videoInputRef,
										accept: "video/mp4,video/webm,video/quicktime",
										onChange: handleVideoChange,
										className: "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-cab-blue hover:file:bg-blue-100 cursor-pointer"
									}),
									errors.video && /* @__PURE__ */ jsx("span", {
										className: "text-xs text-red-500 mt-1 block",
										children: errors.video
									})
								] }),
								videoPreview && /* @__PURE__ */ jsxs("div", {
									className: "mt-3 relative rounded-xl overflow-hidden border border-gray-200 bg-black max-w-md",
									children: [/* @__PURE__ */ jsx("video", {
										src: videoPreview,
										controls: true,
										className: "w-full h-auto max-h-56"
									}), data.video && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: removeVideo,
										className: "absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow",
										title: "Annuler la nouvelle vidéo",
										children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-gray-700 mb-3",
									children: "Fichiers joints"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white",
										children: [
											/* @__PURE__ */ jsx(PlusIcon, { className: "w-6 h-6 text-gray-400" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-500 mt-1",
												children: "Ajouter des fichiers"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												multiple: true,
												onChange: handleFileChange,
												className: "hidden",
												ref: fileInputRef
											})
										]
									})
								}),
								files.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2",
									children: files.map((file, index) => /* @__PURE__ */ jsxs("div", {
										className: "relative bg-white rounded-lg p-2 border border-gray-200 flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4 text-blue-500 flex-shrink-0" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-600 truncate flex-1",
												children: file.name
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeFile(index),
												className: "text-red-500 hover:text-red-700",
												children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
											})
										]
									}, index))
								}),
								lesson.files && lesson.files.length > 0 && /* @__PURE__ */ jsxs("div", {
									className: "mt-4 border-t border-gray-200 pt-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-medium text-gray-500 mb-2",
										children: "Fichiers existants :"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: lesson.files.map((file, index) => /* @__PURE__ */ jsxs("a", {
											href: file.url,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-xs text-cab-blue hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200",
											children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3.5 h-3.5" }), file.name]
										}, index))
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									id: "is_active",
									checked: data.is_active,
									onChange: (e) => setData("is_active", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded cursor-pointer"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "is_active",
									className: "text-sm text-gray-700 cursor-pointer",
									children: "Leçon active"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre"
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								value: data.order,
								onChange: (e) => setData("order", parseInt(e.target.value) || 0),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								min: "0"
							})] })]
						}),
						progress !== null && /* @__PURE__ */ jsxs("div", {
							className: "p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-center text-xs font-medium text-cab-blue",
								children: [/* @__PURE__ */ jsx("span", { children: progress < 100 ? "Envoi des fichiers en cours..." : "Traitement côté serveur..." }), /* @__PURE__ */ jsxs("span", { children: [progress, "%"] })]
							}), /* @__PURE__ */ jsx("div", {
								className: "w-full h-2 bg-blue-200 rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-cab-blue transition-all duration-200 ease-out",
									style: { width: `${progress}%` }
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 pt-4 border-t border-gray-100",
							children: [/* @__PURE__ */ jsx(Link, {
								href: `/admin/cours/${cours.id}`,
								className: "flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center",
								children: "Annuler"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
								children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
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
				})]
			})]
		})
	})] });
}
//#endregion
export { EditLesson as default };

//# sourceMappingURL=EditLesson-CjNJMaq4.js.map