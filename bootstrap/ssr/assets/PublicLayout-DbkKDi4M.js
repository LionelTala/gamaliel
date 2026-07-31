import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, Bars3Icon, BookOpenIcon, EnvelopeIcon, HomeIcon, MapPinIcon, PhoneIcon, PhotoIcon, SparklesIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/PublicLayout.tsx
var navLinks = [
	{
		label: "Accueil",
		href: "/",
		icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-5 h-5" })
	},
	{
		label: "Formations",
		href: "/formations",
		icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" })
	},
	{
		label: "Certification",
		href: "/certification",
		icon: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" })
	},
	{
		label: "Galerie",
		href: "/galerie",
		icon: /* @__PURE__ */ jsx(PhotoIcon, { className: "w-5 h-5" })
	},
	{
		label: "Bibliothèque",
		href: "/bibliotheque",
		icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" })
	}
];
var PublicLayout = ({ children }) => {
	const { url } = usePage();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "font-sans bg-white text-gray-900 min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ jsx("a", {
				href: "#contenu-principal",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:p-4 focus:rounded-xl focus:shadow-lg focus:text-[#1a56db]",
				children: "Aller au contenu principal"
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: "fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							href: "/",
							className: "flex items-center gap-3 shrink-0",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.jpeg",
								alt: "CAB Informatique",
								className: "h-11 w-11 rounded-full object-cover border-2 border-[#1a56db]/20"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xl font-black tracking-tight",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[#1a56db]",
										children: "C"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#d21f2f]",
										children: "A"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#1a56db]",
										children: "B"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline text-xs font-semibold text-gray-400 tracking-[2px] ml-1",
										children: "INFORMATIQUE"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "hidden md:flex items-center gap-1 list-none",
							children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: link.href === "/#contact" ? /* @__PURE__ */ jsxs("button", {
								onClick: handleContactClick,
								className: `
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                                            ${url === "/" && window.location.hash === "#contact" ? "text-[#1a56db] bg-blue-50" : "text-gray-600 hover:text-[#1a56db] hover:bg-blue-50"}
                                        `,
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-400",
									children: link.icon
								}), link.label]
							}) : /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								className: `
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                                            ${url === link.href ? "text-[#1a56db] bg-blue-50" : "text-gray-600 hover:text-[#1a56db] hover:bg-blue-50"}
                                        `,
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-400",
									children: link.icon
								}), link.label]
							}) }, link.href))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/login",
									className: "hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-gray-200 text-gray-600 hover:border-[#1a56db] hover:text-[#1a56db] hover:bg-blue-50 transition-all duration-300",
									children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), "Connexion"]
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: "/certification",
									className: "hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a56db] text-white rounded-full text-sm font-semibold hover:bg-[#0d2a63] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 shadow-md",
									children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-4 h-4" }), "Certification"]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
									className: "md:hidden p-2 rounded-xl transition-colors hover:bg-gray-100",
									"aria-label": "Ouvrir le menu",
									children: isMobileMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6 text-gray-900" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "w-6 h-6 text-gray-900" })
								})
							]
						})
					]
				}), isMobileMenuOpen && /* @__PURE__ */ jsx("div", {
					className: "md:hidden bg-white border-t border-gray-100 shadow-2xl",
					children: /* @__PURE__ */ jsxs("ul", {
						className: "flex flex-col p-4 space-y-1",
						children: [
							navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: link.href === "/#contact" ? /* @__PURE__ */ jsxs("button", {
								onClick: handleContactClick,
								className: "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1a56db] transition-colors",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[#1a56db]/60",
									children: link.icon
								}), link.label]
							}) : /* @__PURE__ */ jsxs(Link, {
								href: link.href,
								onClick: () => setIsMobileMenuOpen(false),
								className: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1a56db] transition-colors",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[#1a56db]/60",
									children: link.icon
								}), link.label]
							}) }, link.href)),
							/* @__PURE__ */ jsx("li", {
								className: "border-t border-gray-100 my-2 pt-2",
								children: /* @__PURE__ */ jsxs(Link, {
									href: "/login",
									onClick: () => setIsMobileMenuOpen(false),
									className: "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1a56db] transition-colors",
									children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-[#1a56db]/60" }), "Connexion"]
								})
							}),
							/* @__PURE__ */ jsx("li", {
								className: "pt-1",
								children: /* @__PURE__ */ jsxs(Link, {
									href: "/certification",
									onClick: () => setIsMobileMenuOpen(false),
									className: "flex items-center justify-center gap-2 w-full px-4 py-3.5 text-white rounded-xl text-sm font-semibold transition-all duration-300",
									style: {
										background: "linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))",
										boxShadow: "0 10px 15px -3px rgba(26,86,219,0.25)"
									},
									children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" }), "Certification en ligne"]
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", { id: "contenu-principal" }),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1 pt-16",
				children
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "bg-gray-900 text-gray-400 py-12",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/",
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/logo.jpeg",
										alt: "CAB Informatique",
										className: "h-11 w-11 rounded-full object-cover"
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-xl font-black tracking-tight",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[#1a56db]",
												children: "C"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-[#d21f2f]",
												children: "A"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-[#1a56db]",
												children: "B"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm mt-3",
									children: "Notre désir, Votre Professionnalisme"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-600 mt-1",
									children: "22 ans d'expérience"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-white font-semibold mb-3",
								children: "Liens rapides"
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations",
										className: "hover:text-white transition-colors",
										children: "Nos formations"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/certification",
										className: "hover:text-white transition-colors",
										children: "Certifications en ligne"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/galerie",
										className: "hover:text-white transition-colors",
										children: "Galerie médias"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/bibliotheque",
										className: "hover:text-white transition-colors",
										children: "Bibliothèque"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/preinscription",
										className: "hover:text-white transition-colors",
										children: "Pré-inscription"
									}) })
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-white font-semibold mb-3",
								children: "Contact"
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "tel:+237690666245",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4" }), " +237 690 666 245"]
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "https://wa.me/237677835228",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
										}), "+237 677 835 228"]
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "mailto:cabinfo2@gmail.com",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4 h-4" }), " cabinfo2@gmail.com"]
									}) })
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h4", {
									className: "text-white font-semibold mb-3",
									children: "Nos campus"
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "space-y-2 text-sm text-gray-400",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-[#1a56db]" }), " Douala — Yassa"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-[#1a56db]" }), " Douala — ELF Village"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-[#1a56db]" }), " Yaoundé — Nlongkak"]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-[#1a56db]" }), " Bafoussam — Casablanca"]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "text-white font-semibold mb-2 text-sm",
										children: "Suivez-nous"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [
											/* @__PURE__ */ jsx("a", {
												href: "https://web.facebook.com/Cabinformatiques",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-gray-400 hover:text-white transition-colors",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-5 h-5",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: "https://wa.me/237677835228",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-gray-400 hover:text-white transition-colors",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-5 h-5",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: "https://www.tiktok.com/@cab_informatique",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-gray-400 hover:text-white transition-colors",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-5 h-5",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.3-.67.29-1.05.04-1.16.01-2.32.01-3.48.01-3.74.01-7.48.02-11.22z" })
												})
											})
										]
									})]
								})
							] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-600",
						children: [/* @__PURE__ */ jsxs("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							/* @__PURE__ */ jsx("strong", { children: "CAB Informatique" }),
							". Tous droits réservés."
						] }), /* @__PURE__ */ jsxs("p", {
							className: "mt-4 text-gray-500 text-[10px]",
							children: [
								"Développé par",
								" ",
								/* @__PURE__ */ jsx("a", {
									href: "https://wa.me/237659666110",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-gray-400 hover:text-white transition-colors",
									children: "ShelbyDev"
								})
							]
						})]
					})]
				})
			})
		]
	});
};
//#endregion
export { PublicLayout as t };

//# sourceMappingURL=PublicLayout-DbkKDi4M.js.map