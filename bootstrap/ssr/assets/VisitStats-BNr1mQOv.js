import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { EyeIcon, UsersIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/VisitStats.tsx
var periods = [
	{
		key: "today",
		label: "Aujourd'hui"
	},
	{
		key: "week",
		label: "Cette semaine"
	},
	{
		key: "month",
		label: "Ce mois"
	},
	{
		key: "all",
		label: "Tout (depuis le lancement)"
	}
];
function VisitStats({ period, totalVisits, totalUniques, perPage }) {
	const changePeriod = (key) => {
		router.get("/admin/stats-visites", { period: key }, { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Statistiques de visites - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Statistiques de visites",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit",
				children: periods.map((p) => /* @__PURE__ */ jsx("button", {
					onClick: () => changePeriod(p.key),
					className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${period === p.key ? "bg-white text-cab-blue shadow-sm" : "text-gray-500 hover:text-gray-700"}`,
					children: p.label
				}, p.key))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 border border-gray-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-gray-500 mb-2",
						children: [/* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Vues totales"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-3xl font-bold text-gray-900",
						children: totalVisits
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 border border-gray-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-gray-500 mb-2",
						children: [/* @__PURE__ */ jsx(UsersIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Visiteurs uniques"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-3xl font-bold text-gray-900",
						children: totalUniques
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl border border-gray-100 overflow-hidden",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "bg-gray-50 border-b border-gray-100",
						children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left font-medium text-gray-500",
								children: "Page"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-right font-medium text-gray-500",
								children: "Vues"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-right font-medium text-gray-500",
								children: "Visiteurs uniques"
							})
						] })
					}), /* @__PURE__ */ jsx("tbody", {
						className: "divide-y divide-gray-100",
						children: perPage.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 3,
							className: "text-center py-8 text-gray-400",
							children: "Aucune donnée pour cette période"
						}) }) : perPage.map((p) => /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 font-medium text-gray-900",
								children: p.label
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 text-right",
								children: p.total
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 text-right",
								children: p.uniques
							})
						] }, p.path))
					})]
				})
			})
		]
	})] });
}
//#endregion
export { VisitStats as default };

//# sourceMappingURL=VisitStats-BNr1mQOv.js.map