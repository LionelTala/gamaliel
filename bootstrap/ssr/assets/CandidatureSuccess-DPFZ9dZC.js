import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/CandidatureSuccess.tsx
function CandidatureSuccess() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Candidature envoyée - CAB Informatique" }), /* @__PURE__ */ jsx(PublicLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "min-h-[60vh] flex items-center justify-center py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6",
					children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-12 h-12 text-green-600" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl md:text-4xl font-extrabold text-gray-900",
					children: "✅ Candidature envoyée !"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-lg text-gray-600",
					children: "Votre candidature a été reçue avec succès. Notre équipe l'examine et vous contactera sous 48h."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-left",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-blue-700",
						children: ["📱 ", /* @__PURE__ */ jsx("strong", { children: "Prochaines étapes :" })]
					}), /* @__PURE__ */ jsxs("ul", {
						className: "text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Notre équipe étudiera votre dossier" }),
							/* @__PURE__ */ jsx("li", { children: "Vous serez contacté(e) par WhatsApp sous 48h" }),
							/* @__PURE__ */ jsx("li", { children: "Si votre candidature est acceptée, vous recevrez vos identifiants" })
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap justify-center gap-4",
					children: [/* @__PURE__ */ jsx(Link, {
						href: "/formations",
						className: "px-6 py-3 bg-cab-blue text-white rounded-xl font-semibold hover:bg-cab-dark transition-colors",
						children: "Voir les formations"
					}), /* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors",
						children: "Retour à l'accueil"
					})]
				})
			]
		})
	}) })] });
}
//#endregion
export { CandidatureSuccess as default };

//# sourceMappingURL=CandidatureSuccess-DPFZ9dZC.js.map