import { t as AdminLayout } from "./AdminLayout-BD3FfVJf.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, CheckCircleIcon, EyeIcon, FunnelIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, UserGroupIcon, UserIcon, UsersIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Students/Index.tsx
function Index({ students, formations, vagues, certifications, stats, filters }) {
	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedFormation, setSelectedFormation] = useState(filters.formation_id || "");
	const [selectedVague, setSelectedVague] = useState(filters.vague_id || "");
	const [selectedCertification, setSelectedCertification] = useState(filters.certification_id || "");
	const [selectedType, setSelectedType] = useState(filters.student_type || "");
	const [availableVagues, setAvailableVagues] = useState([]);
	const [availableCertifications, setAvailableCertifications] = useState([]);
	useEffect(() => {
		if (selectedFormation) {
			fetch(`/admin/students/vagues/${selectedFormation}`).then((res) => res.json()).then((data) => setAvailableVagues(data)).catch(() => setAvailableVagues([]));
			fetch(`/admin/students/certifications/${selectedFormation}`).then((res) => res.json()).then((data) => setAvailableCertifications(data)).catch(() => setAvailableCertifications([]));
		} else {
			setAvailableVagues([]);
			setAvailableCertifications([]);
		}
	}, [selectedFormation]);
	const applyFilters = () => {
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (selectedFormation) params.set("formation_id", selectedFormation);
		if (selectedVague) params.set("vague_id", selectedVague);
		if (selectedCertification) params.set("certification_id", selectedCertification);
		if (selectedType) params.set("student_type", selectedType);
		router.visit(`/admin/students${params.toString() ? "?" + params.toString() : ""}`);
	};
	const clearFilters = () => {
		setSearchTerm("");
		setSelectedFormation("");
		setSelectedVague("");
		setSelectedCertification("");
		setSelectedType("");
		router.visit("/admin/students");
	};
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilters();
	};
	const handleToggleActive = (student) => {
		if (confirm(`Confirmer la ${student.is_active ? "désactivation" : "activation"} de ${student.full_name} ?`)) router.post(`/admin/students/${student.id}/toggle-active`);
	};
	const handleDelete = (student) => {
		if (confirm(`Confirmer la suppression de ${student.full_name} ? Cette action est irréversible.`)) router.delete(`/admin/students/${student.id}`);
	};
	const getStatutBadge = (isActive) => {
		if (isActive) return /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium",
			children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Actif"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium",
			children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "Inactif"]
		});
	};
	const getTypeBadge = (type) => {
		if (type === "online") return /* @__PURE__ */ jsx("span", {
			className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium",
			children: "En ligne"
		});
		return /* @__PURE__ */ jsx("span", {
			className: "px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium",
			children: "Certification"
		});
	};
	const statsCards = [
		{
			label: "Total",
			value: stats.total,
			icon: /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-5 h-5" }),
			color: "bg-cab-blue"
		},
		{
			label: "En ligne",
			value: stats.online,
			icon: /* @__PURE__ */ jsx(UsersIcon, { className: "w-5 h-5" }),
			color: "bg-blue-500"
		},
		{
			label: "Certification",
			value: stats.certification,
			icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" }),
			color: "bg-purple-500"
		},
		{
			label: "Inactifs",
			value: stats.inactifs,
			icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5" }),
			color: "bg-red-500"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des étudiants - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des étudiants",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
				children: statsCards.map((stat) => /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500",
							children: stat.label
						}), /* @__PURE__ */ jsx("p", {
							className: "text-2xl font-bold text-gray-900 mt-0.5",
							children: stat.value
						})] }), /* @__PURE__ */ jsx("div", {
							className: `${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`,
							children: stat.icon
						})]
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-3 items-center",
					children: [
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleSearch,
							className: "flex-1 min-w-[200px]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									placeholder: "Rechercher un étudiant...",
									className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setShowFilters(!showFilters),
							className: "px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(FunnelIcon, { className: "w-4 h-4" }),
								"Filtres",
								(filters.formation_id || filters.vague_id || filters.certification_id || filters.student_type || filters.search) && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-cab-blue rounded-full" })
							]
						}),
						(filters.formation_id || filters.vague_id || filters.certification_id || filters.student_type || filters.search) && /* @__PURE__ */ jsxs("button", {
							onClick: clearFilters,
							className: "px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }), "Effacer les filtres"]
						})
					]
				}), showFilters && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-xs font-medium text-gray-500 mb-1",
							children: "Formation"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedFormation,
							onChange: (e) => {
								setSelectedFormation(e.target.value);
								setSelectedVague("");
								setSelectedCertification("");
							},
							className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Toutes"
							}), formations.map((f) => /* @__PURE__ */ jsx("option", {
								value: f.id,
								children: f.name
							}, f.id))]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-xs font-medium text-gray-500 mb-1",
							children: "Vague"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedVague,
							onChange: (e) => setSelectedVague(e.target.value),
							className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Toutes"
							}), availableVagues.map((v) => /* @__PURE__ */ jsx("option", {
								value: v.id,
								children: v.name
							}, v.id))]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-xs font-medium text-gray-500 mb-1",
							children: "Certification"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedCertification,
							onChange: (e) => setSelectedCertification(e.target.value),
							className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Toutes"
							}), availableCertifications.map((c) => /* @__PURE__ */ jsx("option", {
								value: c.id,
								children: c.titre
							}, c.id))]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-xs font-medium text-gray-500 mb-1",
							children: "Type"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedType,
							onChange: (e) => setSelectedType(e.target.value),
							className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Tous"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "online",
									children: "En ligne"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "certification",
									children: "Certification"
								})
							]
						})] })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-3 flex justify-end",
					children: /* @__PURE__ */ jsx("button", {
						onClick: applyFilters,
						className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
						children: "Appliquer le filtre"
					})
				})] })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: students.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ jsx(UserGroupIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucun étudiant trouvé"
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Étudiant"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Matricule"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Formation / Vague"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Inscrit le"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: students.data.map((student) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold",
												children: [student.first_name.charAt(0).toUpperCase(), student.last_name.charAt(0).toUpperCase()]
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-medium text-gray-900",
												children: student.full_name
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-400",
												children: student.email
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs bg-gray-100 px-2 py-1 rounded-md",
											children: student.matricule
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: student.vague ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gray-900",
											children: student.vague.formation
										}), /* @__PURE__ */ jsxs("p", {
											className: "text-xs text-gray-500",
											children: ["Vague: ", student.vague.name]
										})] }) : student.certification ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gray-900",
											children: student.certification.formation
										}), /* @__PURE__ */ jsxs("p", {
											className: "text-xs text-gray-500",
											children: ["Certification: ", student.certification.titre]
										})] }) : /* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-400",
											children: "Non affecté"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: getTypeBadge(student.student_type)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: getStatutBadge(student.is_active)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-xs",
										children: student.created_at
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(student),
													className: `p-1.5 rounded-lg transition-colors ${student.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
													title: student.is_active ? "Désactiver" : "Activer",
													children: student.is_active ? /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/students/${student.id}`,
													className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
													title: "Voir",
													children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/students/${student.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												/* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(student),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												})
											]
										})
									})
								]
							}, student.id))
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Pagination, {
				links: students.links,
				from: students.from,
				to: students.to,
				total: students.total
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-CQxkMwWY.js.map