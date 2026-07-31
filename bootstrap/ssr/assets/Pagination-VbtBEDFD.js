import { Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/UI/Pagination.tsx
function Pagination({ links, from, to, total }) {
	if (links.length <= 3) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-100",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm text-gray-500",
			children: total > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
				"Affichage de ",
				/* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: from
				}),
				" à ",
				/* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: to
				}),
				" sur ",
				/* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: total
				}),
				" résultats"
			] }) : "Aucun résultat"
		}), /* @__PURE__ */ jsx("div", {
			className: "flex items-center gap-1",
			children: links.map((link, index) => {
				if (link.label.includes("Previous")) return /* @__PURE__ */ jsx(Link, {
					href: link.url || "#",
					preserveScroll: true,
					className: `p-2 rounded-lg transition-colors ${link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed pointer-events-none"}`,
					children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-4 h-4" })
				}, index);
				if (link.label.includes("Next")) return /* @__PURE__ */ jsx(Link, {
					href: link.url || "#",
					preserveScroll: true,
					className: `p-2 rounded-lg transition-colors ${link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed pointer-events-none"}`,
					children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-4 h-4" })
				}, index);
				if (link.label === "...") return /* @__PURE__ */ jsx("span", {
					className: "px-3 py-1.5 text-sm text-gray-400",
					children: "..."
				}, index);
				return /* @__PURE__ */ jsx(Link, {
					href: link.url || "#",
					preserveScroll: true,
					className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-cab-blue text-white" : "text-gray-600 hover:bg-gray-100"}`,
					children: link.label
				}, index);
			})
		})]
	});
}
//#endregion
export { Pagination as t };

//# sourceMappingURL=Pagination-VbtBEDFD.js.map