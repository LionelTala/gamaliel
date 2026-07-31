import { Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, Bars3Icon, CalendarIcon, EnvelopeIcon, HomeIcon, SparklesIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/hooks/useScroll.ts
var useScroll = (threshold = 50) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setScrollY(currentScrollY);
			setIsScrolled(currentScrollY > threshold);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);
	return {
		isScrolled,
		scrollY
	};
};
//#endregion
//#region resources/js/Pages/public/Components/Navigation.tsx
var Navigation = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { isScrolled } = useScroll(50);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		document.body.style.overflow = isMobileMenuOpen ? "" : "hidden";
	};
	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		document.body.style.overflow = "";
	};
	const scrollTo = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) element.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
		closeMobileMenu();
	};
	const navLinks = [
		{
			label: "Accueil",
			href: "/",
			type: "link",
			icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-5 h-5" })
		},
		{
			label: "Formations",
			href: "/formations",
			type: "link",
			icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" })
		},
		{
			label: "Certification",
			href: "/certification",
			type: "link",
			icon: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" })
		},
		{
			label: "Activités",
			href: "#activites",
			type: "anchor",
			icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-5 h-5" })
		},
		{
			label: "Contact",
			href: "#contact",
			type: "anchor",
			icon: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5" })
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("a", {
		href: "#contenu-principal",
		className: "sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-4 focus:z-[9999] focus:bg-white focus:p-4 focus:rounded-xl focus:shadow-lg focus:text-cab-blue focus:ring-2 focus:ring-cab-blue",
		children: "Aller au contenu principal"
	}), /* @__PURE__ */ jsxs("nav", {
		className: `
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500 ease-in-out
                    ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100/50" : "bg-transparent py-5"}
                `,
		role: "navigation",
		"aria-label": "Navigation principale",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/",
					className: "flex items-center shrink-0 group",
					"aria-label": "CAB Informatique - Accueil",
					children: [/* @__PURE__ */ jsx("div", {
						className: `
                            transition-all duration-300
                            ${isScrolled ? "scale-100" : "scale-105"}
                        `,
						children: /* @__PURE__ */ jsx("img", {
							src: "/assets/images/logo.jpeg",
							alt: "CAB Informatique",
							className: "h-12 w-12 rounded-full object-cover border-2 border-white/20 shadow-lg transition-all duration-300",
							loading: "lazy"
						})
					}), /* @__PURE__ */ jsxs("span", {
						className: `
                            ml-2 text-xl font-bold tracking-tight transition-all duration-300
                            ${isScrolled ? "text-gray-900" : "text-white"}
                        `,
						children: ["CAB ", /* @__PURE__ */ jsx("span", {
							className: `${isScrolled ? "text-cab-red" : "text-[#f2b705]"}`,
							children: "Informatique"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "hidden md:flex items-center gap-1 list-none",
					role: "menubar",
					children: navLinks.map((link) => /* @__PURE__ */ jsx("li", {
						role: "none",
						children: link.type === "link" ? /* @__PURE__ */ jsxs(Link, {
							href: link.href,
							className: `
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                                            transition-all duration-300 relative
                                            hover:bg-white/10
                                            ${isScrolled ? "text-gray-600 hover:text-cab-blue hover:bg-blue-50/80" : "text-white/90 hover:text-white hover:bg-white/10"}
                                        `,
							role: "menuitem",
							children: [/* @__PURE__ */ jsx("span", {
								className: "opacity-60",
								children: link.icon
							}), link.label]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: () => scrollTo(link.href.replace("#", "")),
							className: `
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                                            transition-all duration-300 relative
                                            hover:bg-white/10
                                            ${isScrolled ? "text-gray-600 hover:text-cab-blue hover:bg-blue-50/80" : "text-white/90 hover:text-white hover:bg-white/10"}
                                        `,
							role: "menuitem",
							children: [/* @__PURE__ */ jsx("span", {
								className: "opacity-60",
								children: link.icon
							}), link.label]
						})
					}, link.label))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							href: "/login",
							className: `
                                hidden md:inline-flex items-center gap-2 px-5 py-2.5
                                rounded-full text-sm font-semibold
                                border-2 transition-all duration-300 cursor-pointer
                                ${isScrolled ? "border-gray-200 text-gray-600 hover:border-cab-blue hover:text-cab-blue hover:bg-blue-50 hover:shadow-md" : "border-white/30 text-white hover:border-white hover:bg-white/10 hover:shadow-lg"}
                            `,
							children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), "Connexion"]
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/certification",
							className: `
                                inline-flex items-center gap-2 px-5 py-2.5
                                bg-cab-blue text-white rounded-full text-sm font-semibold
                                hover:bg-cab-dark hover:-translate-y-0.5 hover:shadow-lg
                                transition-all duration-300 cursor-pointer no-underline
                                ${isScrolled ? "shadow-md" : "shadow-lg shadow-cab-blue/30"}
                            `,
							children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-4 h-4" }), "Certification"]
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: toggleMobileMenu,
							className: `
                                md:hidden p-2 rounded-xl bg-none border-none cursor-pointer
                                transition-all duration-300 hover:bg-white/10
                                ${isScrolled ? "hover:bg-gray-100" : ""}
                            `,
							"aria-label": isMobileMenuOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile",
							"aria-expanded": isMobileMenuOpen,
							children: isMobileMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: `w-7 h-7 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}` }) : /* @__PURE__ */ jsx(Bars3Icon, { className: `w-7 h-7 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}` })
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: `
                        md:hidden absolute left-0 right-0
                        transition-all duration-400 ease-in-out overflow-hidden
                        ${isScrolled ? "bg-white/98 backdrop-blur-xl shadow-2xl border-t border-gray-100/50" : "bg-white/95 backdrop-blur-xl shadow-2xl border-t border-white/10"}
                        ${isMobileMenuOpen ? "max-h-[calc(100vh-64px)] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"}
                    `,
			style: { top: "100%" },
			role: "menu",
			"aria-label": "Menu mobile",
			children: /* @__PURE__ */ jsxs("ul", {
				className: "flex flex-col p-4 space-y-1 list-none",
				children: [
					navLinks.map((link) => /* @__PURE__ */ jsx("li", {
						role: "none",
						children: link.type === "link" ? /* @__PURE__ */ jsxs(Link, {
							href: link.href,
							onClick: closeMobileMenu,
							className: "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-all duration-200 group",
							role: "menuitem",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-cab-blue/60 group-hover:text-cab-blue transition-colors",
									children: link.icon
								}),
								link.label,
								/* @__PURE__ */ jsx("span", {
									className: "ml-auto text-gray-300 group-hover:text-cab-blue/40 transition-colors",
									children: "→"
								})
							]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: () => scrollTo(link.href.replace("#", "")),
							className: "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-all duration-200 group",
							role: "menuitem",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-cab-blue/60 group-hover:text-cab-blue transition-colors",
									children: link.icon
								}),
								link.label,
								/* @__PURE__ */ jsx("span", {
									className: "ml-auto text-gray-300 group-hover:text-cab-blue/40 transition-colors",
									children: "→"
								})
							]
						})
					}, link.label)),
					/* @__PURE__ */ jsxs("li", {
						className: "flex items-center gap-3 px-4 py-2",
						role: "separator",
						children: [
							/* @__PURE__ */ jsx("span", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium text-gray-400 uppercase tracking-wider",
								children: "Accès rapide"
							}),
							/* @__PURE__ */ jsx("span", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" })
						]
					}),
					/* @__PURE__ */ jsx("li", {
						role: "none",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/login",
							onClick: closeMobileMenu,
							className: "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-all duration-200 group",
							role: "menuitem",
							children: [
								/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-cab-blue/60 group-hover:text-cab-blue transition-colors" }),
								"Connexion",
								/* @__PURE__ */ jsx("span", {
									className: "ml-auto text-gray-300 group-hover:text-cab-blue/40 transition-colors",
									children: "→"
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("li", {
						role: "none",
						className: "pt-1",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/certification",
							onClick: closeMobileMenu,
							className: "flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-cab-blue to-cab-blue/80 text-white rounded-xl text-sm font-semibold hover:from-cab-dark hover:to-cab-blue transition-all duration-300 shadow-lg shadow-cab-blue/25",
							role: "menuitem",
							children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" }), "Certification en ligne"]
						})
					})
				]
			})
		})]
	})] });
};
//#endregion
export { Navigation as default };

//# sourceMappingURL=Navigation-DReaNRgM.js.map