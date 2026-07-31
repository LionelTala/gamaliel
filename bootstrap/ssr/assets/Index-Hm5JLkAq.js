import { t as ToastContainer } from "./ToastContainer-CdIokmOQ.js";
import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowPathIcon, BanknotesIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, MagnifyingGlassIcon, PlusIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Paiements/Index.tsx
function Index({ formations, students, selectedFormationId }) {
	var _students$data, _students$links, _students$from, _students$to, _students$total, _studentsData$;
	const [loadingKey, setLoadingKey] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const handleFormationChange = (formationId) => {
		router.get("/admin/paiements", formationId ? { formation_id: formationId } : {}, { preserveState: false });
	};
	const handleSearch = (e) => {
		e.preventDefault();
		router.get("/admin/paiements", {
			formation_id: selectedFormationId || "",
			search: searchTerm
		}, { preserveState: true });
	};
	const confirmer = (studentId, trancheId, numero, studentName) => {
		const note = prompt(`Confirmer le paiement de la tranche ${numero} pour ${studentName} ?\n\nAjouter une note (optionnelle) :`);
		if (note === null) return;
		const key = `${studentId}-${trancheId}`;
		setLoadingKey(key);
		router.post(`/admin/paiements/${studentId}/${trancheId}/confirmer`, { note }, {
			preserveScroll: true,
			onSuccess: () => {
				setLoadingKey(null);
				router.reload();
			},
			onError: () => {
				setLoadingKey(null);
			},
			onFinish: () => {
				setLoadingKey(null);
			}
		});
	};
	const annuler = (studentId, trancheId, numero, studentName) => {
		if (!confirm(`Annuler la confirmation de la tranche ${numero} pour ${studentName} ?`)) return;
		const key = `${studentId}-${trancheId}`;
		setLoadingKey(key);
		router.delete(`/admin/paiements/${studentId}/${trancheId}/annuler`, {
			preserveScroll: true,
			onSuccess: () => {
				setLoadingKey(null);
				router.reload();
			},
			onError: () => {
				setLoadingKey(null);
			},
			onFinish: () => {
				setLoadingKey(null);
			}
		});
	};
	const studentsData = (_students$data = students === null || students === void 0 ? void 0 : students.data) !== null && _students$data !== void 0 ? _students$data : [];
	const studentsLinks = (_students$links = students === null || students === void 0 ? void 0 : students.links) !== null && _students$links !== void 0 ? _students$links : [];
	const studentsFrom = (_students$from = students === null || students === void 0 ? void 0 : students.from) !== null && _students$from !== void 0 ? _students$from : null;
	const studentsTo = (_students$to = students === null || students === void 0 ? void 0 : students.to) !== null && _students$to !== void 0 ? _students$to : null;
	const studentsTotal = (_students$total = students === null || students === void 0 ? void 0 : students.total) !== null && _students$total !== void 0 ? _students$total : 0;
	const totalStudents = studentsData.length;
	let totalPaid = 0;
	let totalPending = 0;
	let totalAmountPaid = 0;
	studentsData.forEach((student) => {
		if ((student === null || student === void 0 ? void 0 : student.tranches) && Array.isArray(student.tranches)) student.tranches.forEach((t) => {
			if (t === null || t === void 0 ? void 0 : t.est_payee) {
				totalPaid++;
				totalAmountPaid += Number(t === null || t === void 0 ? void 0 : t.montant) || 0;
			} else totalPending++;
		});
	});
	const formatMontant = (montant) => {
		return new Intl.NumberFormat("fr-FR", {
			style: "currency",
			currency: "XAF",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(montant).replace("FCFA", "").trim() + " FCFA";
	};
	const allTrancheNumeros = studentsData.length > 0 && ((_studentsData$ = studentsData[0]) === null || _studentsData$ === void 0 ? void 0 : _studentsData$.tranches) ? studentsData[0].tranches.map((t) => {
		var _t$numero;
		return (_t$numero = t === null || t === void 0 ? void 0 : t.numero) !== null && _t$numero !== void 0 ? _t$numero : 0;
	}) : [];
	const filteredStudents = studentsData.filter((student) => {
		var _student$nom_complet, _student$matricule;
		if (!student) return false;
		const matchSearch = (((_student$nom_complet = student.nom_complet) === null || _student$nom_complet === void 0 ? void 0 : _student$nom_complet.toLowerCase()) || "").includes(searchTerm.toLowerCase()) || (((_student$matricule = student.matricule) === null || _student$matricule === void 0 ? void 0 : _student$matricule.toLowerCase()) || "").includes(searchTerm.toLowerCase());
		if (filterStatus === "all") return matchSearch;
		if (filterStatus === "pending") {
			var _student$tranches;
			return matchSearch && ((_student$tranches = student.tranches) === null || _student$tranches === void 0 ? void 0 : _student$tranches.some((t) => !(t === null || t === void 0 ? void 0 : t.est_payee)));
		}
		if (filterStatus === "paid") {
			var _student$tranches2;
			return matchSearch && ((_student$tranches2 = student.tranches) === null || _student$tranches2 === void 0 ? void 0 : _student$tranches2.every((t) => t === null || t === void 0 ? void 0 : t.est_payee));
		}
		return matchSearch;
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Paiements des tranches - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Paiements des tranches",
		children: [
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: ["Formation ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedFormationId || "",
							onChange: (e) => handleFormationChange(e.target.value),
							className: "w-full sm:w-96 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "-- Choisir une formation --"
							}), formations.map((f) => /* @__PURE__ */ jsxs("option", {
								value: f.id,
								children: [
									f.name,
									" ",
									f.abbreviation ? `(${f.abbreviation})` : ""
								]
							}, f.id))]
						})]
					}), selectedFormationId && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 text-sm text-gray-500",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }),
								totalStudents,
								" étudiant",
								totalStudents > 1 ? "s" : ""
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(BanknotesIcon, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
								className: "font-medium text-gray-700",
								children: formatMontant(totalAmountPaid)
							})]
						})]
					}), /* @__PURE__ */ jsxs(Link, {
						href: `/admin/paiements/create?formation_id=${selectedFormationId}`,
						className: "inline-flex items-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors whitespace-nowrap",
						children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle demande"]
					})] })]
				})
			}),
			!selectedFormationId ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ jsx(CreditCardIcon, { className: "w-10 h-10 text-gray-400" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold text-gray-700 mb-2",
						children: "Sélectionnez une formation"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Choisissez une formation pour gérer les paiements de ses étudiants"
					})
				]
			}) : studentsData.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ jsx(UserIcon, { className: "w-10 h-10 text-gray-400" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold text-gray-700 mb-2",
						children: "Aucun étudiant"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Aucun étudiant trouvé pour cette formation, ou aucune tranche définie"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: `/admin/paiements/create?formation_id=${selectedFormationId}`,
						className: "mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium inline-block",
						children: "Créer une demande de paiement →"
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 font-medium",
									children: "Total étudiants"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-2xl font-bold text-gray-900 mt-0.5",
									children: totalStudents
								})] }), /* @__PURE__ */ jsx("div", {
									className: "bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center",
									children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-cab-blue" })
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 font-medium",
									children: "Tranches payées"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-2xl font-bold text-green-600 mt-0.5",
									children: totalPaid
								})] }), /* @__PURE__ */ jsx("div", {
									className: "bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center",
									children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-600" })
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 font-medium",
									children: "En attente"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-2xl font-bold text-yellow-600 mt-0.5",
									children: totalPending
								})] }), /* @__PURE__ */ jsx("div", {
									className: "bg-yellow-50 w-10 h-10 rounded-xl flex items-center justify-center",
									children: /* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-yellow-600" })
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 font-medium",
									children: "Montant total payé"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-2xl font-bold text-cab-blue mt-0.5",
									children: formatMontant(totalAmountPaid)
								})] }), /* @__PURE__ */ jsx("div", {
									className: "bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center",
									children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-5 h-5 text-purple-600" })
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-3 items-center",
						children: [/* @__PURE__ */ jsx("form", {
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
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => setFilterStatus("all"),
									className: `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === "all" ? "bg-cab-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
									children: "Tous"
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => setFilterStatus("pending"),
									className: `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === "pending" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
									children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4 inline mr-1" }), "En attente"]
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => setFilterStatus("paid"),
									className: `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === "paid" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
									children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4 inline mr-1" }), "Payés"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-gray-50 border-b border-gray-100",
								children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50",
									children: "Étudiant"
								}), allTrancheNumeros.map((numero) => /* @__PURE__ */ jsxs("th", {
									className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]",
									children: ["Tranche ", numero]
								}, numero))] })
							}), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-gray-100",
								children: filteredStudents.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: allTrancheNumeros.length + 1,
									className: "px-4 py-12 text-center text-gray-500",
									children: "Aucun étudiant trouvé"
								}) }) : filteredStudents.map((student) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3 sticky left-0 bg-white hover:bg-gray-50 transition-colors",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium text-gray-900",
											children: student.nom_complet
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-400 font-mono",
											children: student.matricule
										})]
									}), student.tranches.map((t) => {
										const key = `${student.id}-${t.tranche_id}`;
										const isLoading = loadingKey === key;
										return /* @__PURE__ */ jsx("td", {
											className: "px-2 py-3 text-center",
											children: t.est_payee ? /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col items-center gap-1",
												children: [/* @__PURE__ */ jsxs("button", {
													onClick: () => annuler(student.id, t.tranche_id, t.numero, student.nom_complet),
													disabled: isLoading,
													className: "inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 transition-colors disabled:opacity-50 w-full justify-center",
													title: t.paye_le ? `Payé le ${t.paye_le}` : "Payé",
													children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3.5 h-3.5" }), isLoading ? "Annulation..." : "Payée"]
												}), t.paye_le && /* @__PURE__ */ jsx("span", {
													className: "text-[10px] text-gray-400",
													children: t.paye_le
												})]
											}) : /* @__PURE__ */ jsxs("button", {
												onClick: () => confirmer(student.id, t.tranche_id, t.numero, student.nom_complet),
												disabled: isLoading,
												className: "inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium hover:bg-yellow-100 hover:text-yellow-700 transition-colors disabled:opacity-50 w-full justify-center",
												children: [isLoading ? /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsx(XCircleIcon, { className: "w-3.5 h-3.5" }), isLoading ? "Chargement..." : "Confirmer"]
											})
										}, t.tranche_id);
									})]
								}, student.id))
							})]
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4 text-green-600" }), "Payée (cliquer pour annuler)"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4 text-gray-400" }), "Non payée (cliquer pour confirmer)"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-4 h-4 text-blue-500 animate-spin" }), "Chargement..."]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4",
					children: /* @__PURE__ */ jsx(Pagination, {
						links: studentsLinks,
						from: studentsFrom,
						to: studentsTo,
						total: studentsTotal
					})
				})
			] })
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-Hm5JLkAq.js.map