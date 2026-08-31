import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, Bars3Icon, ChatBubbleLeftRightIcon, EnvelopeIcon, HomeIcon, MapPinIcon, PhoneIcon, PhotoIcon, ShieldCheckIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/PublicLayout.tsx
var ACTION_COLOR = "#6FA30E";
var ACTION_COLOR_HOVER = "#5C8A0B";
var navLinks = [
	{
		label: "Accueil",
		href: "/",
		icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-[18px] h-[18px]" })
	},
	{
		label: "Formations",
		href: "/formations",
		icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-[18px] h-[18px]" })
	},
	{
		label: "Galerie",
		href: "/galerie",
		icon: /* @__PURE__ */ jsx(PhotoIcon, { className: "w-[18px] h-[18px]" })
	},
	{
		label: "Contact",
		href: "/contact",
		icon: /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "w-[18px] h-[18px]" })
	}
];
var PublicLayout = ({ children }) => {
	const { url } = usePage();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [url]);
	return /* @__PURE__ */ jsxs("div", {
		className: "font-sans bg-gamaliel-paper text-gamaliel-navy min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ jsx("a", {
				href: "#contenu-principal",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:p-4 focus:rounded-xl focus:shadow-lg focus:text-gamaliel-green-deep",
				children: "Aller au contenu principal"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "hidden md:block bg-gamaliel-navy-deep text-white/80 text-xs",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-6",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-3.5 h-3.5 text-gamaliel-green" }), "Logpom, Carrefour Andem — Douala"]
						}), /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-3.5 h-3.5 text-gamaliel-green" }), "Arrêté N°000174/MINEFOP/SG/DFOP/SDGSF/CSACD/CBAC"]
						})]
					}), /* @__PURE__ */ jsxs("a", {
						href: "tel:+237696084048",
						className: "flex items-center gap-1.5 hover:text-white transition-colors",
						children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-3.5 h-3.5 text-gamaliel-green" }), "+237 6 96 08 40 48"]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: `sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`,
				children: [/* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-3 transition-all duration-300",
					children: /* @__PURE__ */ jsxs("div", {
						className: `flex items-center justify-between rounded-full border transition-all duration-300 px-4 sm:px-5 ${isScrolled ? "bg-white/90 backdrop-blur-md border-gamaliel-navy/5 shadow-[0_8px_24px_-8px_rgba(21,59,98,0.18)] h-14" : "bg-white border-gamaliel-navy/5 shadow-[0_4px_16px_-6px_rgba(21,59,98,0.12)] h-16"}`,
						children: [
							/* @__PURE__ */ jsxs(Link, {
								href: "/",
								className: "flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0",
								children: [/* @__PURE__ */ jsx("img", {
									src: "/assets/images/logo.png",
									alt: "Institut Gamaliel",
									className: "h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-cover shrink-0"
								}), /* @__PURE__ */ jsxs("span", {
									className: "flex flex-col leading-none min-w-0",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-display font-bold text-[13px] sm:text-[15px] tracking-tight text-gamaliel-navy truncate",
										children: "Institut Gamaliel"
									}), /* @__PURE__ */ jsx("span", {
										className: "hidden sm:block text-[10px] font-semibold tracking-[1.5px] text-gamaliel-green-deep uppercase",
										children: "Formation Professionnelle"
									})]
								})]
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "hidden md:flex items-center gap-1 list-none",
								children: navLinks.map((link) => {
									const active = url === link.href;
									return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
										href: link.href,
										className: `flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${active ? "text-gamaliel-navy bg-gamaliel-green/25" : "text-gamaliel-navy/60 hover:text-gamaliel-navy hover:bg-gamaliel-navy/5"}`,
										children: [link.icon, link.label]
									}) }, link.href);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
								children: [
									/* @__PURE__ */ jsxs(Link, {
										href: "/login",
										className: "hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold text-gamaliel-navy/70 hover:text-gamaliel-navy hover:bg-gamaliel-navy/5 transition-all duration-200",
										children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), "Connexion"]
									}),
									/* @__PURE__ */ jsx(Link, {
										href: "/formations",
										className: "hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5",
										style: { backgroundColor: ACTION_COLOR },
										onMouseEnter: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER,
										onMouseLeave: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR,
										children: "Nos Formations"
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
										className: "md:hidden p-2 rounded-full text-gamaliel-navy hover:bg-gamaliel-navy/5 transition-colors",
										"aria-label": "Ouvrir le menu",
										children: isMobileMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "w-6 h-6" })
									})
								]
							})
						]
					})
				}), isMobileMenuOpen && /* @__PURE__ */ jsx("div", {
					className: "md:hidden mx-3 mt-2 rounded-3xl overflow-hidden bg-gamaliel-navy-deep shadow-2xl",
					children: /* @__PURE__ */ jsxs("ul", {
						className: "flex flex-col p-3 space-y-1",
						children: [
							navLinks.map((link) => {
								const active = url === link.href;
								return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
									href: link.href,
									className: `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"}`,
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-gamaliel-green",
										children: link.icon
									}), link.label]
								}) }, link.href);
							}),
							/* @__PURE__ */ jsx("li", {
								className: "border-t border-white/10 my-1 pt-2",
								children: /* @__PURE__ */ jsxs(Link, {
									href: "/login",
									className: "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors",
									children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-[18px] h-[18px] text-gamaliel-green" }), "Connexion"]
								})
							}),
							/* @__PURE__ */ jsx("li", {
								className: "pt-1",
								children: /* @__PURE__ */ jsx(Link, {
									href: "/preinscription",
									className: "flex items-center justify-center gap-2 w-full px-4 py-3.5 text-white rounded-2xl text-sm font-bold transition-all duration-300",
									style: { backgroundColor: ACTION_COLOR },
									children: "Faire ma pré-inscription"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", { id: "contenu-principal" }),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "text-white/70 pt-16 pb-8",
				style: { background: "linear-gradient(160deg, #153B62 0%, #0D2844 100%)" },
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-10",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs(Link, {
									href: "/",
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/logo.png",
										alt: "Institut Gamaliel",
										className: "h-10 w-10 rounded-xl object-cover"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-display font-bold text-white text-lg",
										children: "Institut Gamaliel"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm mt-4 text-white/60",
									children: "Former aujourd'hui les compétences de demain."
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "flex items-center gap-1.5 text-xs mt-3 text-gamaliel-green font-semibold",
									children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4" }), "Agréé MINEFOP depuis 2014"]
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-white font-display font-semibold mb-4 text-sm tracking-wide",
								children: "Nos filières"
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations?pole=gestion",
										className: "hover:text-white transition-colors",
										children: "Techniques Admin. & Comptables"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations?pole=paramedical",
										className: "hover:text-white transition-colors",
										children: "Paramédical & Santé"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations?pole=informatique",
										className: "hover:text-white transition-colors",
										children: "Génie Informatique"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations?pole=logistique",
										className: "hover:text-white transition-colors",
										children: "Logistique & Transport"
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: "/formations?pole=hotellerie",
										className: "hover:text-white transition-colors",
										children: "Hôtellerie & Restauration"
									}) })
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "text-white font-display font-semibold mb-4 text-sm tracking-wide",
								children: "Contact"
							}), /* @__PURE__ */ jsxs("ul", {
								className: "space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "tel:+237696084048",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gamaliel-green shrink-0" }), " +237 6 96 08 40 48"]
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "https://wa.me/237696084048",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4 text-gamaliel-green shrink-0",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
										}), "WhatsApp"]
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "https://web.facebook.com/intitutgamaliel",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4 text-gamaliel-green shrink-0",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", { d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 7.98 9.5V15.5H7.38V12h2.6V9.79c0-2.57 1.54-3.99 3.87-3.99 1.11 0 2.27.2 2.27.2v2.5h-1.28c-1.27 0-1.66.79-1.66 1.6V12h2.83l-.45 3.5h-2.38v6.02C18.56 20.87 22 16.84 22 12z" })
										}), "Facebook"]
									}) }),
									/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: "mailto:info@institutgamaliel.com",
										className: "hover:text-white transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4 h-4 text-gamaliel-green shrink-0" }), " info@institutgamaliel.com"]
									}) }),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2 text-white/60",
										children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-gamaliel-green shrink-0" }), "Logpom, Carrefour Andem, Douala"]
									})
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h4", {
									className: "text-white font-display font-semibold mb-4 text-sm tracking-wide",
									children: "Horaires"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-white/60",
									children: "Lundi — Vendredi"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-white font-semibold",
									children: "08h00 – 17h00"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-white/60",
									children: "Samedi - jours feriés"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-white font-semibold",
									children: "09h00 – 14h00"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "text-white font-display font-semibold mb-3 text-sm tracking-wide",
										children: "Suivez-nous"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-2.5",
										children: [
											/* @__PURE__ */ jsx("a", {
												href: "https://www.instagram.com/institutgamaliel/",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gamaliel-green-deep hover:text-white transition-colors",
												"aria-label": "Instagram",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-4 h-4",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.34 3.9 3.86 2.35 7.12 2.2 8.4 2.17 8.77 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" })
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: "https://web.facebook.com/intitutgamaliel",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gamaliel-blue hover:text-white transition-colors",
												"aria-label": "Facebook",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-4 h-4",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 7.98 9.5V15.5H7.38V12h2.6V9.79c0-2.57 1.54-3.99 3.87-3.99 1.11 0 2.27.2 2.27.2v2.5h-1.28c-1.27 0-1.66.79-1.66 1.6V12h2.83l-.45 3.5h-2.38v6.02C18.56 20.87 22 16.84 22 12z" })
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: "https://wa.me/237696084048",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gamaliel-green hover:text-gamaliel-navy-deep transition-colors",
												"aria-label": "WhatsApp",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-4 h-4",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: "https://cm.linkedin.com/jobs/view/manager-de-communaut%C3%A9-at-institut-de-formation-professionnelle-gamaliel-4106520802",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gamaliel-blue hover:text-white transition-colors",
												"aria-label": "LinkedIn",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-4 h-4",
													fill: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", { d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" })
												})
											})
										]
									})]
								})
							] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/40",
						children: [/* @__PURE__ */ jsxs("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-white/60",
								children: "Institut de Formation Professionnelle Gamaliel"
							}),
							". Tous droits réservés."
						] }), /* @__PURE__ */ jsxs("p", {
							className: "mt-3 text-white/30 text-[10px]",
							children: [
								"Développé par",
								" ",
								/* @__PURE__ */ jsx("a", {
									href: "https://wa.me/237659666110",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-white/40 hover:text-white transition-colors",
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

//# sourceMappingURL=PublicLayout-BWQi_JEN.js.map