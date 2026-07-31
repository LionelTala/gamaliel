import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { jsx } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.tsx
var renderPage = (page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* #__PURE__ */ Object.assign({
		"./Pages/Admin/Activites/Create.tsx": () => import("./assets/Create-BIobLISU.js"),
		"./Pages/Admin/Activites/Edit.tsx": () => import("./assets/Edit-lWVD-rps.js"),
		"./Pages/Admin/Activites/Index.tsx": () => import("./assets/Index-B5huTzlx.js"),
		"./Pages/Admin/Bibliotheque/Create.tsx": () => import("./assets/Create-K9_yS9BW.js"),
		"./Pages/Admin/Bibliotheque/Edit.tsx": () => import("./assets/Edit-BVjkecPl.js"),
		"./Pages/Admin/Bibliotheque/Index.tsx": () => import("./assets/Index-_S3Ms5n_.js"),
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-CjEv6eEc.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-BfNNcAQ9.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-D4qQvQB3.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-DND453RQ.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-DjyxIJt6.js"),
		"./Pages/Admin/Cours/Create.tsx": () => import("./assets/Create-DiLxWw3c.js"),
		"./Pages/Admin/Cours/Edit.tsx": () => import("./assets/Edit-BdUQkHDn.js"),
		"./Pages/Admin/Cours/EditLesson.tsx": () => import("./assets/EditLesson-HvmME86C.js"),
		"./Pages/Admin/Cours/Index.tsx": () => import("./assets/Index-Bmu-KENV.js"),
		"./Pages/Admin/Cours/Show.tsx": () => import("./assets/Show-CqT-tmyX.js"),
		"./Pages/Admin/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson-C3mXv9NP.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-CIrP_k57.js"),
		"./Pages/Admin/Devoirs/Create.tsx": () => import("./assets/Create-DvOtxBks.js"),
		"./Pages/Admin/Devoirs/Edit.tsx": () => import("./assets/Edit-De4uRbTe.js"),
		"./Pages/Admin/Devoirs/Index.tsx": () => import("./assets/Index-Dll4N8rj.js"),
		"./Pages/Admin/Devoirs/Show.tsx": () => import("./assets/Show-BYxDje_M.js"),
		"./Pages/Admin/Evaluations/Create.tsx": () => import("./assets/Create-B3k4Ydi7.js"),
		"./Pages/Admin/Evaluations/Edit.tsx": () => import("./assets/Edit-OJ7eFOhy.js"),
		"./Pages/Admin/Evaluations/Index.tsx": () => import("./assets/Index-1-NUIcR5.js"),
		"./Pages/Admin/Evaluations/Show.tsx": () => import("./assets/Show-CAHLOP6l.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-UR0lD1oV.js"),
		"./Pages/Admin/Formations/CreatePresentiel.tsx": () => import("./assets/CreatePresentiel-DVzE0ImG.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-UKIt8NK3.js"),
		"./Pages/Admin/Formations/EditPresentiel.tsx": () => import("./assets/EditPresentiel-B49R0n4F.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-BcUbPr6f.js"),
		"./Pages/Admin/Galerie/Create.tsx": () => import("./assets/Create-DofGD3Kr.js"),
		"./Pages/Admin/Galerie/Edit.tsx": () => import("./assets/Edit-DOPU4FUG.js"),
		"./Pages/Admin/Galerie/Index.tsx": () => import("./assets/Index-MFOfcmbM.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-DFECOWFT.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-D79apRYz.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-CpOm7clm.js"),
		"./Pages/Admin/Paiements/Create.tsx": () => import("./assets/Create-BONWmQiL2.js"),
		"./Pages/Admin/Paiements/Edit.tsx": () => import("./assets/Edit-CQ_XYsnQ2.js"),
		"./Pages/Admin/Paiements/Index.tsx": () => import("./assets/Index-Hm5JLkAq.js"),
		"./Pages/Admin/PreInscriptions/Index.tsx": () => import("./assets/Index-CByrh-HU2.js"),
		"./Pages/Admin/Students/Edit.tsx": () => import("./assets/Edit-Be9TxMoN.js"),
		"./Pages/Admin/Students/Index.tsx": () => import("./assets/Index-D0PNBqJg.js"),
		"./Pages/Admin/Students/Show.tsx": () => import("./assets/Show-BQ2wf_8O.js"),
		"./Pages/Admin/Tranches/Create.tsx": () => import("./assets/Create-Bnpf2CCb2.js"),
		"./Pages/Admin/Tranches/Edit.tsx": () => import("./assets/Edit-CPd_xxPU2.js"),
		"./Pages/Admin/Tranches/Index.tsx": () => import("./assets/Index-CgqFGeoC2.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-Bxm-xvVE.js"),
		"./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-Ol4uGgGD.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-DNGBaydS.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-pA6i4vHg.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-BgrJAAbM.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-CgiFUzDs.js"),
		"./Pages/Admin/VisitStats.tsx": () => import("./assets/VisitStats-BNr1mQOv.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-9T37YOrW.js"),
		"./Pages/Profile/Index.tsx": () => import("./assets/Index-CLffptdd2.js"),
		"./Pages/Student/Cours/Index.tsx": () => import("./assets/Index-DHWN8z6F.js"),
		"./Pages/Student/Cours/Notifications.tsx": () => import("./assets/Notifications-BuJhERMA.js"),
		"./Pages/Student/Cours/Show.tsx": () => import("./assets/Show-BV3EQ8-p.js"),
		"./Pages/Student/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson-D_ot3C-8.js"),
		"./Pages/Student/Dashboard.tsx": () => import("./assets/Dashboard-DR6Drdot.js"),
		"./Pages/Student/Devoirs/Index.tsx": () => import("./assets/Index-BwcrRBcn.js"),
		"./Pages/Student/Devoirs/Show.tsx": () => import("./assets/Show-Bf5vQa9-.js"),
		"./Pages/Student/Evaluations/Index.tsx": () => import("./assets/Index-B6oPywf8.js"),
		"./Pages/Student/Evaluations/Show.tsx": () => import("./assets/Show-Dtqa4DjQ.js"),
		"./Pages/public/Bibliotheque/Index.tsx": () => import("./assets/Index-rbJdjDP6.js"),
		"./Pages/public/Bibliotheque/Show.tsx": () => import("./assets/Show-DS1DYRQ7.js"),
		"./Pages/public/Bibliotheque.tsx": () => import("./assets/Bibliotheque-Cpywygup.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-DPFZ9dZC.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-D3LP2kJX.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-DReaNRgM.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-BkzHbHg6.js"),
		"./Pages/public/Galerie.tsx": () => import("./assets/Galerie-CdzDNB3m.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-BzJ599j7.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-DYXIx4Em.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map