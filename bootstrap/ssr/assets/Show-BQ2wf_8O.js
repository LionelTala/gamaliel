import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AcademicCapIcon, ArrowLeftIcon, BuildingOfficeIcon, CalendarDaysIcon, CheckCircleIcon, IdentificationIcon, MapPinIcon, PencilSquareIcon, SparklesIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Students/Show.tsx
function Show({ student }) {
	const handleToggleActive = () => {
		if (confirm(`Confirmer la ${student.is_active ? "désactivation" : "activation"} de ${student.full_name} ?`)) router.post(`/admin/students/${student.id}/toggle-active`);
	};
	const getStatutBadge = (isActive) => isActive ? /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium",
		children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Actif"]
	}) : /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium",
		children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" }), "Inactif"]
	});
	const getTypeBadge = (type) => type === "online" ? /* @__PURE__ */ jsx("span", {
		className: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium",
		children: "En ligne"
	}) : /* @__PURE__ */ jsx("span", {
		className: "px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium",
		children: "Certification"
	});
	const getAffectation = () => {
		if (student.vague) return {
			type: "Vague",
			name: student.vague.name,
			formation: student.vague.formation.name,
			icon: /* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-5 h-5 text-blue-500" })
		};
		if (student.certification) return {
			type: "Certification",
			name: student.certification.titre,
			formation: student.certification.formation.name,
			icon: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5 text-purple-500" })
		};
		return null;
	};
	const affectation = getAffectation();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${student.full_name} - Détails de l'étudiant` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Détails de l'étudiant",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/admin/students",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between flex-wrap gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-cab-blue to-cab-dark flex items-center justify-center text-white text-3xl font-bold",
								children: [student.first_name.charAt(0).toUpperCase(), student.last_name.charAt(0).toUpperCase()]
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold text-gray-900",
									children: student.full_name
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2 mt-1",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: "text-sm text-gray-500",
											children: ["Matricule: ", /* @__PURE__ */ jsx("span", {
												className: "font-mono font-semibold",
												children: student.matricule
											})]
										}),
										/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-300" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-500",
											children: student.created_at
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2 mt-2",
									children: [getStatutBadge(student.is_active), getTypeBadge(student.student_type)]
								})
							] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: handleToggleActive,
								className: `px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${student.is_active ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`,
								children: [student.is_active ? /* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), student.is_active ? "Désactiver" : "Activer"]
							}), /* @__PURE__ */ jsxs(Link, {
								href: `/admin/students/${student.id}/edit`,
								className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-4 h-4" }), "Modifier"]
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-cab-blue" }), "Informations personnelles"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Nom complet"
								}), /* @__PURE__ */ jsx("p", {
									className: "font-medium text-gray-900",
									children: student.full_name
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Email"
								}), /* @__PURE__ */ jsx("a", {
									href: `mailto:${student.email}`,
									className: "text-cab-blue hover:underline",
									children: student.email
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Téléphone"
								}), /* @__PURE__ */ jsx("a", {
									href: `tel:${student.phone}`,
									className: "text-cab-blue hover:underline",
									children: student.phone
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-gray-500 flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(CalendarDaysIcon, { className: "w-3.5 h-3.5" }), "Date de naissance"]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-700",
									children: student.birth_date || "Non renseignée"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-gray-500 flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-3.5 h-3.5" }), "Adresse"]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-700",
									children: student.address || "Non renseignée"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Ville"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-700",
									children: student.city || "Non renseignée"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Niveau scolaire"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-700",
									children: student.school_level || "Non renseigné"
								})] })
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-cab-blue" }), "Informations académiques"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Matricule"
								}), /* @__PURE__ */ jsx("p", {
									className: "font-mono font-bold text-gray-900",
									children: student.matricule
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Type"
								}), getTypeBadge(student.student_type)] }),
								affectation && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
									className: "pt-3 border-t border-gray-100",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: affectation.type
									}), /* @__PURE__ */ jsx("p", {
										className: "font-medium text-gray-900",
										children: affectation.name
									})]
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Formation associée"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-700",
									children: affectation.formation
								})] })] }),
								!affectation && /* @__PURE__ */ jsx("div", {
									className: "pt-3 border-t border-gray-100",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-500",
										children: "Non affecté à une vague ou certification"
									})
								})
							]
						})]
					})]
				}),
				student.user && /* @__PURE__ */ jsxs("div", {
					className: "mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(IdentificationIcon, { className: "w-5 h-5 text-blue-600" }), "Informations de connexion"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-blue-600",
							children: "Nom d'utilisateur"
						}), /* @__PURE__ */ jsx("p", {
							className: "font-mono font-bold text-blue-900",
							children: student.user.name
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-blue-600",
							children: "Email"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-blue-900",
							children: student.user.email
						})] })]
					})]
				})
			]
		})
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-BQ2wf_8O.js.map