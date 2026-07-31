import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, ArrowLeftIcon, BuildingOfficeIcon, CalendarDaysIcon, MapPinIcon, PencilSquareIcon, PhoneIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Students/Edit.tsx
function Edit({ student, formations, vagues, certifications }) {
	var _student$vague_id, _student$certificatio;
	const [selectedFormation, setSelectedFormation] = useState(student.formation_id ? String(student.formation_id) : "");
	const [availableVagues, setAvailableVagues] = useState(vagues);
	const [availableCertifications, setAvailableCertifications] = useState(certifications);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [type, setType] = useState(student.vague_id ? "vague" : student.certification_id ? "certification" : "none");
	const { data, setData, put, processing, errors } = useForm({
		first_name: student.first_name,
		last_name: student.last_name,
		phone: student.phone,
		school_level: student.school_level || "",
		birth_date: student.birth_date || "",
		address: student.address || "",
		city: student.city || "",
		is_active: student.is_active,
		vague_id: ((_student$vague_id = student.vague_id) === null || _student$vague_id === void 0 ? void 0 : _student$vague_id.toString()) || "",
		certification_id: ((_student$certificatio = student.certification_id) === null || _student$certificatio === void 0 ? void 0 : _student$certificatio.toString()) || ""
	});
	useState(true);
	useEffect(() => {
		if (!selectedFormation) {
			setAvailableVagues([]);
			setAvailableCertifications([]);
			return;
		}
		setLoadingOptions(true);
		Promise.all([fetch(`/admin/students/vagues/${selectedFormation}`).then((res) => res.ok ? res.json() : []), fetch(`/admin/students/certifications/${selectedFormation}`).then((res) => res.ok ? res.json() : [])]).then(([vaguesData, certificationsData]) => {
			setAvailableVagues(Array.isArray(vaguesData) ? vaguesData : []);
			setAvailableCertifications(Array.isArray(certificationsData) ? certificationsData : []);
		}).catch(() => {
			setAvailableVagues([]);
			setAvailableCertifications([]);
		}).finally(() => setLoadingOptions(false));
	}, [selectedFormation]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.vague_id && data.certification_id) {
			alert("Un étudiant ne peut pas être dans une vague ET une certification en même temps.");
			return;
		}
		put(`/admin/students/${student.id}`);
	};
	const handleTypeChange = (newType) => {
		setType(newType);
		setData("vague_id", "");
		setData("certification_id", "");
	};
	const handleFormationChange = (value) => {
		setSelectedFormation(value);
		setData("vague_id", "");
		setData("certification_id", "");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Modifier ${student.first_name} ${student.last_name}` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Modifier l'étudiant",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/students",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center text-xl font-bold",
						children: [student.first_name.charAt(0).toUpperCase(), student.last_name.charAt(0).toUpperCase()]
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-xl font-bold text-gray-900",
						children: [
							student.first_name,
							" ",
							student.last_name
						]
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-sm text-gray-500",
						children: ["Matricule: ", student.matricule]
					})] })]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "first_name",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Prénom ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "first_name",
										type: "text",
										value: data.first_name,
										onChange: (e) => setData("first_name", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										required: true
									})]
								}),
								errors.first_name && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.first_name
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "last_name",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Nom ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "last_name",
										type: "text",
										value: data.last_name,
										onChange: (e) => setData("last_name", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										required: true
									})]
								}),
								errors.last_name && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.last_name
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "phone",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Téléphone ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "phone",
									type: "tel",
									value: data.phone,
									onChange: (e) => setData("phone", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "+237 690 666 245",
									required: true
								})]
							}),
							errors.phone && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.phone
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "birth_date",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Date de naissance"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "birth_date",
									type: "date",
									value: data.birth_date,
									onChange: (e) => setData("birth_date", e.target.value),
									max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
								})]
							}),
							errors.birth_date && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.birth_date
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "address",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Adresse"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "address",
										type: "text",
										value: data.address,
										onChange: (e) => setData("address", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Quartier, rue..."
									})]
								}),
								errors.address && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.address
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "city",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Ville"
								}),
								/* @__PURE__ */ jsx("input", {
									id: "city",
									type: "text",
									value: data.city,
									onChange: (e) => setData("city", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Douala, Yaoundé..."
								}),
								errors.city && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.city
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "school_level",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Niveau scolaire"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsxs("select", {
									id: "school_level",
									value: data.school_level,
									onChange: (e) => setData("school_level", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "",
											children: "-- Sélectionnez --"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "CEP",
											children: "CEP"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BEPC",
											children: "BEPC"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "PROBATOIRE",
											children: "Probatoire"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BAC",
											children: "Baccalauréat"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BAC+2",
											children: "BAC+2"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "LICENCE",
											children: "Licence"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "MASTER",
											children: "Master ou plus"
										})
									]
								})]
							}),
							errors.school_level && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.school_level
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Affectation"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-4",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "radio",
										checked: type === "vague",
										onChange: () => handleTypeChange("vague"),
										className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-sm text-gray-700 flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-4 h-4 text-blue-500" }), "Vague"]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "radio",
										checked: type === "certification",
										onChange: () => handleTypeChange("certification"),
										className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-sm text-gray-700 flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-4 h-4 text-purple-500" }), "Certification"]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "radio",
										checked: type === "none",
										onChange: () => handleTypeChange("none"),
										className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-sm text-gray-700",
										children: "Aucune"
									})]
								})
							]
						})] }),
						(type === "vague" || type === "certification") && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Formation"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedFormation,
							onChange: (e) => handleFormationChange(e.target.value),
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "-- Sélectionnez une formation --"
							}), formations.map((f) => /* @__PURE__ */ jsx("option", {
								value: f.id,
								children: f.name
							}, f.id))]
						})] }),
						type === "vague" && selectedFormation && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "vague_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Vague"
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "vague_id",
								value: data.vague_id,
								onChange: (e) => setData("vague_id", e.target.value),
								disabled: loadingOptions,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white disabled:bg-gray-50",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une vague --"
								}), availableVagues.map((v) => /* @__PURE__ */ jsx("option", {
									value: v.id,
									children: v.name
								}, v.id))]
							}),
							errors.vague_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.vague_id
							})
						] }),
						type === "certification" && selectedFormation && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "certification_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Certification"
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "certification_id",
								value: data.certification_id,
								onChange: (e) => setData("certification_id", e.target.value),
								disabled: loadingOptions,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white disabled:bg-gray-50",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une certification --"
								}), availableCertifications.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.id,
									children: c.titre
								}, c.id))]
							}),
							errors.certification_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.certification_id
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
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
								children: "Compte actif"
							})]
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
				})]
			})]
		})
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-Be9TxMoN.js.map