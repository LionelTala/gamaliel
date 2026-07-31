import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, CalendarIcon, DocumentIcon, PlusIcon, UserGroupIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Evaluations/Create.tsx
function Create({ formations }) {
	const [vagues, setVagues] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [students, setStudents] = useState([]);
	const [tranches, setTranches] = useState([]);
	const [files, setFiles] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const [loadingVagues, setLoadingVagues] = useState(false);
	const [loadingCertifications, setLoadingCertifications] = useState(false);
	const [loadingStudents, setLoadingStudents] = useState(false);
	const [loadingTranches, setLoadingTranches] = useState(false);
	const { data, setData, processing, errors } = useForm({
		titre: "",
		description: "",
		formation_id: "",
		type_destinataire: "",
		vague_id: "",
		certification_id: "",
		student_id: "",
		tranche_requise_id: "",
		date: "",
		coefficient: "1",
		is_active: true,
		order: 0,
		send_notification: true,
		files: []
	});
	useEffect(() => {
		if (data.formation_id && data.type_destinataire === "vague") {
			setLoadingVagues(true);
			fetch(`/admin/evaluations/vagues/${data.formation_id}`).then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			}).then((data) => {
				setVagues(Array.isArray(data) ? data : []);
				setLoadingVagues(false);
			}).catch(() => {
				setVagues([]);
				setLoadingVagues(false);
			});
		} else setVagues([]);
	}, [data.formation_id, data.type_destinataire]);
	useEffect(() => {
		if (data.formation_id && data.type_destinataire === "certification") {
			setLoadingCertifications(true);
			fetch(`/admin/evaluations/certifications/${data.formation_id}`).then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			}).then((data) => {
				setCertifications(Array.isArray(data) ? data : []);
				setLoadingCertifications(false);
			}).catch(() => {
				setCertifications([]);
				setLoadingCertifications(false);
			});
		} else setCertifications([]);
	}, [data.formation_id, data.type_destinataire]);
	useEffect(() => {
		if (data.formation_id) {
			setLoadingTranches(true);
			fetch(`/admin/evaluations/tranches/${data.formation_id}`).then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			}).then((data) => {
				setTranches(Array.isArray(data) ? data : []);
				setLoadingTranches(false);
			}).catch(() => {
				setTranches([]);
				setLoadingTranches(false);
			});
		} else setTranches([]);
	}, [data.formation_id]);
	useEffect(() => {
		if (data.certification_id && data.type_destinataire === "certification") {
			setLoadingStudents(true);
			fetch(`/admin/evaluations/students-by-certification/${data.certification_id}`).then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			}).then((data) => {
				setStudents(Array.isArray(data) ? data : []);
				setLoadingStudents(false);
			}).catch(() => {
				setStudents([]);
				setLoadingStudents(false);
			});
		} else setStudents([]);
	}, [data.certification_id, data.type_destinataire]);
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		setFiles([...files, ...selectedFiles]);
		setData("files", [...files, ...selectedFiles]);
		const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
		setFilePreviews([...filePreviews, ...newPreviews]);
	};
	const removeFile = (index) => {
		const newFiles = files.filter((_, i) => i !== index);
		const newPreviews = filePreviews.filter((_, i) => i !== index);
		setFiles(newFiles);
		setFilePreviews(newPreviews);
		setData("files", newFiles);
		URL.revokeObjectURL(filePreviews[index]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("titre", data.titre);
		formData.append("description", data.description || "");
		formData.append("formation_id", data.formation_id);
		formData.append("type", data.type_destinataire);
		formData.append("mode_envoi", data.type_destinataire === "vague" ? "groupe" : "individuel");
		if (data.type_destinataire === "vague") {
			formData.append("vague_id", data.vague_id || "");
			if (data.tranche_requise_id) formData.append("tranche_requise_id", data.tranche_requise_id);
		} else {
			formData.append("certification_id", data.certification_id || "");
			formData.append("student_id", data.student_id || "");
		}
		if (data.date) formData.append("date", data.date);
		formData.append("coefficient", data.coefficient);
		formData.append("is_active", data.is_active ? "1" : "0");
		formData.append("order", String(data.order));
		formData.append("send_notification", data.send_notification ? "1" : "0");
		data.files.forEach((file) => {
			formData.append("files[]", file);
		});
		router.post("/admin/evaluations", formData, {
			forceFormData: true,
			headers: { "Content-Type": "multipart/form-data" }
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Créer une évaluation - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Créer une évaluation",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/evaluations",
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
								htmlFor: "titre",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Titre de l'évaluation ", /* @__PURE__ */ jsx("span", {
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
								placeholder: "Ex: Examen final",
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
								children: "Description"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "description",
								value: data.description,
								onChange: (e) => setData("description", e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
								placeholder: "Description détaillée de l'évaluation..."
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
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
								onChange: (e) => {
									setData("formation_id", e.target.value);
									setData("type_destinataire", "");
									setData("vague_id", "");
									setData("certification_id", "");
									setData("student_id", "");
								},
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
						data.formation_id && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Type de destinataire ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => {
										setData("type_destinataire", "vague");
										setData("certification_id", "");
										setData("student_id", "");
									},
									className: `p-4 border-2 rounded-xl text-center transition-all ${data.type_destinataire === "vague" ? "border-cab-blue bg-blue-50" : "border-gray-200 hover:border-gray-300"}`,
									children: [
										/* @__PURE__ */ jsx(UserGroupIcon, { className: `w-8 h-8 mx-auto mb-2 ${data.type_destinataire === "vague" ? "text-cab-blue" : "text-gray-400"}` }),
										/* @__PURE__ */ jsx("p", {
											className: `text-sm font-medium ${data.type_destinataire === "vague" ? "text-cab-blue" : "text-gray-600"}`,
											children: "Vague de formation"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-400 mt-1",
											children: "Envoi groupé"
										})
									]
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => {
										setData("type_destinataire", "certification");
										setData("vague_id", "");
										setData("tranche_requise_id", "");
									},
									className: `p-4 border-2 rounded-xl text-center transition-all ${data.type_destinataire === "certification" ? "border-cab-blue bg-blue-50" : "border-gray-200 hover:border-gray-300"}`,
									children: [
										/* @__PURE__ */ jsx(UserIcon, { className: `w-8 h-8 mx-auto mb-2 ${data.type_destinataire === "certification" ? "text-cab-blue" : "text-gray-400"}` }),
										/* @__PURE__ */ jsx("p", {
											className: `text-sm font-medium ${data.type_destinataire === "certification" ? "text-cab-blue" : "text-gray-600"}`,
											children: "Certification"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-400 mt-1",
											children: "Envoi individuel"
										})
									]
								})]
							}),
							errors.type && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.type
							})
						] }),
						data.type_destinataire === "vague" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "vague_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Vague de formation ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "vague_id",
								value: data.vague_id,
								onChange: (e) => setData("vague_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								required: true,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une vague --"
								}), loadingVagues ? /* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Chargement..."
								}) : vagues.length === 0 ? /* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Aucune vague active"
								}) : vagues.map((v) => /* @__PURE__ */ jsxs("option", {
									value: v.id,
									children: [
										v.name,
										" (",
										v.date_debut,
										")"
									]
								}, v.id))]
							}),
							errors.vague_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.vague_id
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "tranche_requise_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Accessible à partir de la tranche"
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "tranche_requise_id",
								value: data.tranche_requise_id,
								onChange: (e) => setData("tranche_requise_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Tous les étudiants --"
								}), loadingTranches ? /* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Chargement..."
								}) : tranches.map((t) => /* @__PURE__ */ jsxs("option", {
									value: t.id,
									children: [
										"Tranche ",
										t.numero,
										" - ",
										t.montant.toLocaleString(),
										" FCFA"
									]
								}, t.id))]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-400 mt-1",
								children: "Les étudiants devront avoir payé cette tranche pour accéder à l'évaluation"
							}),
							errors.tranche_requise_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.tranche_requise_id
							})
						] })] }),
						data.type_destinataire === "certification" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "certification_id",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Certification ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("select", {
									id: "certification_id",
									value: data.certification_id,
									onChange: (e) => {
										setData("certification_id", e.target.value);
										setData("student_id", "");
									},
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
									required: true,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "-- Sélectionnez une certification --"
									}), loadingCertifications ? /* @__PURE__ */ jsx("option", {
										value: "",
										disabled: true,
										children: "Chargement..."
									}) : certifications.map((c) => /* @__PURE__ */ jsx("option", {
										value: c.id,
										children: c.titre
									}, c.id))]
								}),
								errors.certification_id && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.certification_id
								})
							] }),
							data.certification_id && /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "student_id",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Étudiant ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("select", {
									id: "student_id",
									value: data.student_id,
									onChange: (e) => setData("student_id", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
									required: true,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "-- Sélectionnez un étudiant --"
									}), loadingStudents ? /* @__PURE__ */ jsx("option", {
										value: "",
										disabled: true,
										children: "Chargement..."
									}) : students.map((s) => /* @__PURE__ */ jsxs("option", {
										value: s.id,
										children: [
											s.name,
											" (",
											s.matricule,
											")"
										]
									}, s.id))]
								}),
								errors.student_id && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.student_id
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-blue-800",
									children: "Accès total pour les certifications"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-blue-600 mt-1",
									children: "Les étudiants en certification ont accès à toutes les évaluations sans restriction de tranche."
								})]
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "date",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Date"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "date",
										type: "datetime-local",
										value: data.date,
										onChange: (e) => setData("date", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: "Laisser vide pour aucune date"
								}),
								errors.date && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.date
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "coefficient",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Coefficient"
								}),
								/* @__PURE__ */ jsx("input", {
									id: "coefficient",
									type: "number",
									value: data.coefficient,
									onChange: (e) => setData("coefficient", e.target.value),
									step: "0.5",
									min: "0",
									max: "20",
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "1"
								}),
								errors.coefficient && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.coefficient
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-gray-700 mb-3",
									children: "Fichiers (optionnel)"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors",
										children: [
											/* @__PURE__ */ jsx(PlusIcon, { className: "w-8 h-8 text-gray-400" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-500 mt-1",
												children: "Ajouter des fichiers"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												multiple: true,
												onChange: handleFileChange,
												className: "hidden"
											})
										]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-400",
										children: "PDF, Images, etc. (Max 20MB par fichier)"
									})]
								}),
								filePreviews.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3",
									children: files.map((file, index) => /* @__PURE__ */ jsxs("div", {
										className: "relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4 text-blue-500" }),
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
								})
							]
						}),
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
									children: "Évaluation active"
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
						/* @__PURE__ */ jsx("div", {
							className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									id: "send_notification",
									type: "checkbox",
									checked: data.send_notification,
									onChange: (e) => setData("send_notification", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "send_notification",
									className: "text-sm text-blue-700 font-medium",
									children: "🔔 Envoyer une notification aux étudiants concernés"
								})]
							})
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
							}), "Création en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Créer l'évaluation"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-B3k4Ydi7.js.map