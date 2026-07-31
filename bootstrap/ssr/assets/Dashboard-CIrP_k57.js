import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AcademicCapIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, BookOpenIcon, CalendarIcon, ChartBarIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, EyeIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
//#region resources/js/Pages/Admin/Dashboard.tsx
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);
function Dashboard({ stats, monthlyStats, topFormations, repartition, recentActivities, tendance, vaguesStats }) {
	const monthlyChartData = {
		labels: monthlyStats.map((item) => item.month),
		datasets: [{
			label: "Étudiants",
			data: monthlyStats.map((item) => item.students),
			backgroundColor: "rgba(26, 86, 219, 0.7)",
			borderColor: "#1A56DB",
			borderWidth: 2,
			borderRadius: 4
		}, {
			label: "Candidatures",
			data: monthlyStats.map((item) => item.candidatures),
			backgroundColor: "rgba(210, 31, 47, 0.7)",
			borderColor: "#D21F2F",
			borderWidth: 2,
			borderRadius: 4
		}]
	};
	const repartitionChartData = {
		labels: Object.keys(repartition),
		datasets: [{
			data: Object.values(repartition),
			backgroundColor: [
				"#1A56DB",
				"#D21F2F",
				"#9CA3AF"
			],
			borderWidth: 2,
			borderColor: "#fff"
		}]
	};
	const topFormationsChartData = {
		labels: topFormations.map((f) => f.abbreviation || f.name.substring(0, 10)),
		datasets: [{
			label: "Nombre d'étudiants",
			data: topFormations.map((f) => f.count),
			backgroundColor: "rgba(26, 86, 219, 0.8)",
			borderColor: "#1A56DB",
			borderWidth: 2,
			borderRadius: 4
		}]
	};
	const statsCards = [
		{
			label: "Étudiants",
			value: stats.total_students,
			icon: /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-6 h-6" }),
			color: "bg-blue-500"
		},
		{
			label: "Formations",
			value: stats.total_formations,
			icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-6 h-6" }),
			color: "bg-green-500"
		},
		{
			label: "Certifications",
			value: stats.total_certifications,
			icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-6 h-6" }),
			color: "bg-purple-500"
		},
		{
			label: "Vagues",
			value: stats.total_vagues,
			icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-6 h-6" }),
			color: "bg-yellow-500"
		},
		{
			label: "Candidatures",
			value: stats.total_candidatures,
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-6 h-6" }),
			color: "bg-indigo-500"
		},
		{
			label: "En attente",
			value: stats.candidatures_en_attente,
			icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-6 h-6" }),
			color: "bg-orange-500"
		}
	];
	const getStatutBadge = (statut) => {
		const colors = {
			en_attente: {
				bg: "bg-yellow-100",
				text: "text-yellow-800",
				icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" })
			},
			en_cours: {
				bg: "bg-blue-100",
				text: "text-blue-800",
				icon: /* @__PURE__ */ jsx(EyeIcon, { className: "w-3 h-3" })
			},
			admis: {
				bg: "bg-green-100",
				text: "text-green-800",
				icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" })
			},
			Actif: {
				bg: "bg-green-100",
				text: "text-green-800",
				icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" })
			},
			Inactif: {
				bg: "bg-red-100",
				text: "text-red-800",
				icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" })
			}
		};
		const config = colors[statut] || colors.en_attente;
		return /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`,
			children: [config.icon, statut]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tableau de bord - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Tableau de bord",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6",
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
				className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "Étudiants ce mois"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-gray-900",
								children: tendance.mois_actuel
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1 mt-1",
								children: [tendance.variation > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ArrowTrendingUpIcon, { className: "w-4 h-4 text-green-500" }), /* @__PURE__ */ jsxs("span", {
									className: "text-sm text-green-500",
									children: [
										"+",
										tendance.variation,
										"%"
									]
								})] }) : tendance.variation < 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ArrowTrendingDownIcon, { className: "w-4 h-4 text-red-500" }), /* @__PURE__ */ jsxs("span", {
									className: "text-sm text-red-500",
									children: [tendance.variation, "%"]
								})] }) : /* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-400",
									children: "Stable"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-gray-400 ml-1",
									children: [
										"vs mois dernier (",
										tendance.mois_dernier,
										")"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "Vagues en cours"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-gray-900",
								children: vaguesStats.en_cours
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mt-1 text-xs text-gray-500",
								children: [/* @__PURE__ */ jsxs("span", { children: ["À venir: ", vaguesStats.a_venir] }), /* @__PURE__ */ jsxs("span", { children: ["Terminées: ", vaguesStats.terminees] })]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500",
							children: "Répartition des étudiants"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 mt-1",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-lg font-bold text-blue-600",
									children: stats.etudiants_online
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "En ligne"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-lg font-bold text-red-600",
									children: stats.etudiants_certification
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Certification"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-lg font-bold text-gray-400",
									children: stats.total_students - stats.etudiants_online - stats.etudiants_certification
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: "Non affectés"
								})] })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5 text-cab-blue" }), "Évolution des inscriptions"]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-64",
						children: /* @__PURE__ */ jsx(Bar, {
							data: monthlyChartData,
							options: {
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { position: "top" } },
								scales: { y: {
									beginAtZero: true,
									ticks: { stepSize: 1 }
								} }
							}
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-cab-blue" }), "Répartition des étudiants"]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-64 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(Pie, {
							data: repartitionChartData,
							options: {
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { position: "bottom" } }
							}
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-cab-blue" }), "Top 5 formations"]
					}), topFormations.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 text-center py-8",
						children: "Aucune formation avec des étudiants"
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "h-48",
						children: /* @__PURE__ */ jsx(Bar, {
							data: topFormationsChartData,
							options: {
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
								scales: { y: {
									beginAtZero: true,
									ticks: { stepSize: 1 }
								} }
							}
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-1",
						children: topFormations.map((f) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-gray-600",
								children: f.name
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-semibold text-gray-900",
								children: [f.count, " étudiants"]
							})]
						}, f.name))
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-cab-blue" }), "Activités récentes"]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-3 max-h-80 overflow-y-auto",
						children: recentActivities.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500 text-center py-8",
							children: "Aucune activité récente"
						}) : recentActivities.map((activity, index) => /* @__PURE__ */ jsx("a", {
							href: activity.link,
							className: "block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-gray-900",
									children: activity.message
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500",
									children: activity.detail
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-end gap-1",
									children: [getStatutBadge(activity.statut), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-gray-400",
										children: activity.created_at
									})]
								})]
							})
						}, index))
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { Dashboard as default };

//# sourceMappingURL=Dashboard-CIrP_k57.js.map