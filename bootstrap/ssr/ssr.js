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
		"./Pages/Admin/Activites/Create.tsx": () => import("./assets/Create-Cbz9NNCf.js"),
		"./Pages/Admin/Activites/Edit.tsx": () => import("./assets/Edit-DSYYntRJ.js"),
		"./Pages/Admin/Activites/Index.tsx": () => import("./assets/Index-CmdvF9WI.js"),
		"./Pages/Admin/Bibliotheque/Create.tsx": () => import("./assets/Create-BbMV_lXK.js"),
		"./Pages/Admin/Bibliotheque/Edit.tsx": () => import("./assets/Edit-D2T5bcrZ.js"),
		"./Pages/Admin/Bibliotheque/Index.tsx": () => import("./assets/Index-BkzhHk6K.js"),
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-kx6nbnf2.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-CyqDrnsB.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-ABJnJy1g.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-Ctla2xDr.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-DjrPpkQ5.js"),
		"./Pages/Admin/Contacts.tsx": () => import("./assets/Contacts-GbYjZ2xR.js"),
		"./Pages/Admin/Cours/Create.tsx": () => import("./assets/Create-BilHYO_9.js"),
		"./Pages/Admin/Cours/Edit.tsx": () => import("./assets/Edit-B6GWBSgH.js"),
		"./Pages/Admin/Cours/EditLesson.tsx": () => import("./assets/EditLesson-CjNJMaq4.js"),
		"./Pages/Admin/Cours/Index.tsx": () => import("./assets/Index-Cb5evOZY.js"),
		"./Pages/Admin/Cours/Show.tsx": () => import("./assets/Show-B4Hx8QJm.js"),
		"./Pages/Admin/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson-CFvfnrVS.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-D6q9U60G.js"),
		"./Pages/Admin/Devoirs/Create.tsx": () => import("./assets/Create-C5TjEi3t.js"),
		"./Pages/Admin/Devoirs/Edit.tsx": () => import("./assets/Edit-eYt4nEId.js"),
		"./Pages/Admin/Devoirs/Index.tsx": () => import("./assets/Index-CBSQwHSy.js"),
		"./Pages/Admin/Devoirs/Show.tsx": () => import("./assets/Show-CyHkOz1N.js"),
		"./Pages/Admin/Evaluations/Create.tsx": () => import("./assets/Create-CS_Pnplg.js"),
		"./Pages/Admin/Evaluations/Edit.tsx": () => import("./assets/Edit-D48q6RaM.js"),
		"./Pages/Admin/Evaluations/Index.tsx": () => import("./assets/Index-C_JONIBd.js"),
		"./Pages/Admin/Evaluations/Show.tsx": () => import("./assets/Show-BNRDRpHM.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-1hkSyl_j.js"),
		"./Pages/Admin/Formations/CreatePresentiel.tsx": () => import("./assets/CreatePresentiel-BJtInMFO.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-DPrETjTm.js"),
		"./Pages/Admin/Formations/EditPresentiel.tsx": () => import("./assets/EditPresentiel--gWrnVOu.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-56g8sKoR.js"),
		"./Pages/Admin/Galerie/Create.tsx": () => import("./assets/Create-BKhk7uA5.js"),
		"./Pages/Admin/Galerie/Edit.tsx": () => import("./assets/Edit-CpvYC35n.js"),
		"./Pages/Admin/Galerie/Index.tsx": () => import("./assets/Index-DF4vMrMU.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-DnVK9g9j.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-DWP0zOi9.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-F4EhjGIg.js"),
		"./Pages/Admin/Paiements/Create.tsx": () => import("./assets/Create-C9LXmurl.js"),
		"./Pages/Admin/Paiements/Edit.tsx": () => import("./assets/Edit-CuyLtRXh.js"),
		"./Pages/Admin/Paiements/Index.tsx": () => import("./assets/Index-COXe4bcw.js"),
		"./Pages/Admin/PreInscriptions/Index.tsx": () => import("./assets/Index-rvVUKR6L.js"),
		"./Pages/Admin/Students/Edit.tsx": () => import("./assets/Edit-B-8CzYgy.js"),
		"./Pages/Admin/Students/Index.tsx": () => import("./assets/Index-CQxkMwWY.js"),
		"./Pages/Admin/Students/Show.tsx": () => import("./assets/Show-BMgzJA5y.js"),
		"./Pages/Admin/Tranches/Create.tsx": () => import("./assets/Create-BbDZyIwq.js"),
		"./Pages/Admin/Tranches/Edit.tsx": () => import("./assets/Edit-CBzh_jdJ.js"),
		"./Pages/Admin/Tranches/Index.tsx": () => import("./assets/Index-CSRE4HcC.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-j_wMXylJ.js"),
		"./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-DV622tpW.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-pzGsSgBW.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-DCzJnIF0.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-BEDSdaUx.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-C-0vhtjg.js"),
		"./Pages/Admin/VisitStats.tsx": () => import("./assets/VisitStats-Cx9aRI7b.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-BYO4kGCt.js"),
		"./Pages/Profile/Index.tsx": () => import("./assets/Index-CpTDdtl7.js"),
		"./Pages/Student/Cours/Index.tsx": () => import("./assets/Index-DiSKODTg.js"),
		"./Pages/Student/Cours/Notifications.tsx": () => import("./assets/Notifications-CK8QGEph.js"),
		"./Pages/Student/Cours/Show.tsx": () => import("./assets/Show-BuKzSEfW.js"),
		"./Pages/Student/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson--kowM5Eu.js"),
		"./Pages/Student/Dashboard.tsx": () => import("./assets/Dashboard-CZGGGAQO.js"),
		"./Pages/Student/Devoirs/Index.tsx": () => import("./assets/Index-PMie7acv.js"),
		"./Pages/Student/Devoirs/Show.tsx": () => import("./assets/Show-Bm-s3gbt.js"),
		"./Pages/Student/Evaluations/Index.tsx": () => import("./assets/Index-AoglRp35.js"),
		"./Pages/Student/Evaluations/Show.tsx": () => import("./assets/Show-CHcytAKg.js"),
		"./Pages/public/Bibliotheque/Index.tsx": () => import("./assets/Index-C3VTA1Xb.js"),
		"./Pages/public/Bibliotheque/Show.tsx": () => import("./assets/Show-B__ex0eo.js"),
		"./Pages/public/Bibliotheque.tsx": () => import("./assets/Bibliotheque-Hr8UXsyb.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-DHEh7F-_.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-CqVEmFIU.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-DReaNRgM.js"),
		"./Pages/public/Contact.tsx": () => import("./assets/Contact-DRWkTxe9.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-CUb8WVfz.js"),
		"./Pages/public/Galerie.tsx": () => import("./assets/Galerie-C_zjH1H7.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-CfqPxZ_Z.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-CwI7t7DK.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map