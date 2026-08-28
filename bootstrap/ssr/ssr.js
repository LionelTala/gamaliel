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
		"./Pages/Admin/Activites/Create.tsx": () => import("./assets/Create-CPb3u-Xs.js"),
		"./Pages/Admin/Activites/Edit.tsx": () => import("./assets/Edit-J546Dp0W.js"),
		"./Pages/Admin/Activites/Index.tsx": () => import("./assets/Index-X-Pw31jS.js"),
		"./Pages/Admin/Bibliotheque/Create.tsx": () => import("./assets/Create-Dw3ngCwH.js"),
		"./Pages/Admin/Bibliotheque/Edit.tsx": () => import("./assets/Edit-BkB-6GJu.js"),
		"./Pages/Admin/Bibliotheque/Index.tsx": () => import("./assets/Index-CDqul-06.js"),
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-C78_FZ6R.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-cMLUB571.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-DQTBuOls.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-BkXkXDhJ.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-CAE8QMh7.js"),
		"./Pages/Admin/Cours/Create.tsx": () => import("./assets/Create-Cber5RU1.js"),
		"./Pages/Admin/Cours/Edit.tsx": () => import("./assets/Edit-C5cWTjww.js"),
		"./Pages/Admin/Cours/EditLesson.tsx": () => import("./assets/EditLesson-DiosOrEs.js"),
		"./Pages/Admin/Cours/Index.tsx": () => import("./assets/Index-Dfk73LjH.js"),
		"./Pages/Admin/Cours/Show.tsx": () => import("./assets/Show-tkqUf7vj.js"),
		"./Pages/Admin/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson-NevfpPGt.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-Bwouyk86.js"),
		"./Pages/Admin/Devoirs/Create.tsx": () => import("./assets/Create-s-aM7JaQ.js"),
		"./Pages/Admin/Devoirs/Edit.tsx": () => import("./assets/Edit-BCTtHqf8.js"),
		"./Pages/Admin/Devoirs/Index.tsx": () => import("./assets/Index-7MNWuoso.js"),
		"./Pages/Admin/Devoirs/Show.tsx": () => import("./assets/Show-CY4yd94c.js"),
		"./Pages/Admin/Evaluations/Create.tsx": () => import("./assets/Create-COcChZTf.js"),
		"./Pages/Admin/Evaluations/Edit.tsx": () => import("./assets/Edit-C363naSi.js"),
		"./Pages/Admin/Evaluations/Index.tsx": () => import("./assets/Index-B3lf-SPA.js"),
		"./Pages/Admin/Evaluations/Show.tsx": () => import("./assets/Show-Bq3OkDmI.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-Bk8QAl32.js"),
		"./Pages/Admin/Formations/CreatePresentiel.tsx": () => import("./assets/CreatePresentiel-sLbeexh_.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-CxlS0h0e.js"),
		"./Pages/Admin/Formations/EditPresentiel.tsx": () => import("./assets/EditPresentiel-BvEgeDUf.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-B3FH5rgH.js"),
		"./Pages/Admin/Galerie/Create.tsx": () => import("./assets/Create-Vlsnftbe.js"),
		"./Pages/Admin/Galerie/Edit.tsx": () => import("./assets/Edit-TndltI4o.js"),
		"./Pages/Admin/Galerie/Index.tsx": () => import("./assets/Index-B3tJ9V-G.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-BXzUt_eo.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-DRk7Ff-h.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-CnKjhJyQ.js"),
		"./Pages/Admin/Paiements/Create.tsx": () => import("./assets/Create-Dyin07Pe.js"),
		"./Pages/Admin/Paiements/Edit.tsx": () => import("./assets/Edit-BcW3olyb.js"),
		"./Pages/Admin/Paiements/Index.tsx": () => import("./assets/Index-B3-Rjdas.js"),
		"./Pages/Admin/PreInscriptions/Index.tsx": () => import("./assets/Index-CtCZ-gn6.js"),
		"./Pages/Admin/Students/Edit.tsx": () => import("./assets/Edit-8e97NU92.js"),
		"./Pages/Admin/Students/Index.tsx": () => import("./assets/Index-BsZ7pRUG.js"),
		"./Pages/Admin/Students/Show.tsx": () => import("./assets/Show-D3J1uWNN.js"),
		"./Pages/Admin/Tranches/Create.tsx": () => import("./assets/Create-DOuLwCAE.js"),
		"./Pages/Admin/Tranches/Edit.tsx": () => import("./assets/Edit-oD2IX1ov.js"),
		"./Pages/Admin/Tranches/Index.tsx": () => import("./assets/Index-BjQ0sAwu.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-ChjNpGJY.js"),
		"./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-C6WvbWkF.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-Cf157lnh.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-DOSK9st3.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-WIXbfHgM.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-CynRw7LN.js"),
		"./Pages/Admin/VisitStats.tsx": () => import("./assets/VisitStats-DoEBmfEG.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-J2Xl07UD.js"),
		"./Pages/Profile/Index.tsx": () => import("./assets/Index-Dr2Gabjg.js"),
		"./Pages/Student/Cours/Index.tsx": () => import("./assets/Index-BNGFFOp2.js"),
		"./Pages/Student/Cours/Notifications.tsx": () => import("./assets/Notifications-srUZnT5G.js"),
		"./Pages/Student/Cours/Show.tsx": () => import("./assets/Show-D6ibrf9D.js"),
		"./Pages/Student/Cours/ShowLesson.tsx": () => import("./assets/ShowLesson-tp2Rr-gk.js"),
		"./Pages/Student/Dashboard.tsx": () => import("./assets/Dashboard-B6vwtyvv.js"),
		"./Pages/Student/Devoirs/Index.tsx": () => import("./assets/Index-CbZoQY2-.js"),
		"./Pages/Student/Devoirs/Show.tsx": () => import("./assets/Show-CUNUneVQ.js"),
		"./Pages/Student/Evaluations/Index.tsx": () => import("./assets/Index-CgCJHWwr.js"),
		"./Pages/Student/Evaluations/Show.tsx": () => import("./assets/Show-DfydVe6D.js"),
		"./Pages/public/Bibliotheque/Index.tsx": () => import("./assets/Index-BpR0Hwlo.js"),
		"./Pages/public/Bibliotheque/Show.tsx": () => import("./assets/Show-Df3x6LuF.js"),
		"./Pages/public/Bibliotheque.tsx": () => import("./assets/Bibliotheque-tXCNMw0A.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-Dz9ukxUn.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-Dg0I7ud2.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-DReaNRgM.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-zWZoxNlk.js"),
		"./Pages/public/Galerie.tsx": () => import("./assets/Galerie-DWF42cEJ.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-CnbgZ6iQ.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-v3nVBq9F.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map