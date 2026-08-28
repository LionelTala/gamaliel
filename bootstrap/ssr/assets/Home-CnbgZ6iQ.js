import { t as PublicLayout } from "./PublicLayout-DhlCuZ4y.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, ArrowRightIcon, BriefcaseIcon, CakeIcon, CheckBadgeIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, ComputerDesktopIcon, HeartIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon, StarIcon, TruckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRight, Users } from "lucide-react";
//#region resources/js/hooks/useScrollReveal.ts
function useScrollReveal(threshold = .2) {
	const ref = useRef(null);
	const [isRevealed, setIsRevealed] = useState(false);
	useEffect(() => {
		const node = ref.current;
		if (!node || isRevealed) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsRevealed(true);
				observer.unobserve(node);
				observer.disconnect();
			}
		}, {
			threshold,
			rootMargin: "0px 0px -10% 0px"
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold]);
	return {
		ref,
		isRevealed
	};
}
//#endregion
//#region resources/js/Components/Home/RevealSection.tsx
function RevealSection({ children, as: Tag = "div", className = "", delay = 0 }) {
	const { ref, isRevealed } = useScrollReveal(.15);
	return /* @__PURE__ */ jsx(Tag, {
		ref,
		className,
		style: {
			opacity: isRevealed ? 1 : 0,
			transform: isRevealed ? "translateY(0)" : "translateY(16px)",
			transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
			willChange: "opacity, transform"
		},
		children
	});
}
//#endregion
//#region resources/js/Components/Loader.tsx
var Loader = () => {
	const [progress, setProgress] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	useEffect(() => {
		let value = 0;
		const interval = setInterval(() => {
			value += Math.random() * 18;
			if (value >= 100) {
				value = 100;
				clearInterval(interval);
				setTimeout(() => setIsVisible(false), 350);
			}
			setProgress(Math.min(value, 100));
		}, 180);
		return () => clearInterval(interval);
	}, []);
	if (!isVisible) return null;
	const radius = 42;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - progress / 100 * circumference;
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[9999] flex items-center justify-center bg-gamaliel-navy-deep transition-opacity duration-500",
		style: {
			opacity: progress >= 100 ? 0 : 1,
			pointerEvents: progress >= 100 ? "none" : "auto"
		},
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/15 blur-[100px]" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-gamaliel-orange/20 blur-[100px]" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative text-center px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative w-28 h-28 mx-auto mb-7",
					children: [
						/* @__PURE__ */ jsxs("svg", {
							className: "w-full h-full -rotate-90",
							viewBox: "0 0 100 100",
							children: [
								/* @__PURE__ */ jsx("circle", {
									cx: "50",
									cy: "50",
									r: radius,
									fill: "none",
									stroke: "rgba(255,255,255,0.1)",
									strokeWidth: "4"
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "50",
									cy: "50",
									r: radius,
									fill: "none",
									stroke: "url(#gamaliel-loader-gradient)",
									strokeWidth: "4",
									strokeLinecap: "round",
									strokeDasharray: circumference,
									strokeDashoffset: offset,
									style: { transition: "stroke-dashoffset 0.3s ease-out" }
								}),
								/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
									id: "gamaliel-loader-gradient",
									x1: "0%",
									y1: "0%",
									x2: "100%",
									y2: "100%",
									children: [/* @__PURE__ */ jsx("stop", {
										offset: "0%",
										stopColor: "#FD7D0F"
									}), /* @__PURE__ */ jsx("stop", {
										offset: "100%",
										stopColor: "#E13A4B"
									})]
								}) })
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-[10px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg",
							children: /* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.png",
								alt: "Institut Gamaliel",
								className: "w-full h-full object-cover"
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white/40 tabular-nums",
							children: [Math.round(progress), "%"]
						})
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-8 text-sm text-white/60 font-medium tracking-wide",
					children: "Institut de Formation Professionnelle Gamaliel"
				})]
			})
		]
	});
};
//#endregion
//#region resources/js/hooks/useCountUp.ts
/**
* Anime un nombre de 0 à `target` en douceur (requestAnimationFrame + easing),
* une seule fois. Protégé contre les déclenchements multiples de `start`
* (ex: IntersectionObserver imprécis) grâce à `hasRunRef`.
*/
function useCountUp(target, start, duration = 1400) {
	const [value, setValue] = useState(0);
	const hasRunRef = useRef(false);
	const frameRef = useRef(null);
	useEffect(() => {
		if (!start || hasRunRef.current) return;
		hasRunRef.current = true;
		const startTime = performance.now();
		const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
		const tick = (now) => {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			setValue(Math.round(easeOutCubic(progress) * target));
			if (progress < 1) frameRef.current = requestAnimationFrame(tick);
			else setValue(target);
		};
		frameRef.current = requestAnimationFrame(tick);
		return () => {
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, [
		start,
		target,
		duration
	]);
	return value;
}
//#endregion
//#region resources/js/Pages/public/Home.tsx
var ICONS = {
	HeartIcon,
	ComputerDesktopIcon,
	BriefcaseIcon,
	CakeIcon,
	TruckIcon
};
var ACTION_COLOR = "#6FA30E";
var ACTION_COLOR_HOVER = "#5C8A0B";
var SECONDARY_COLOR = "#165DF3";
var avantages = [
	{
		icon: AcademicCapIcon,
		title: "100% Pratique",
		desc: "Ateliers, laboratoires et mises en situation réelle dès les premières semaines."
	},
	{
		icon: ShieldCheckIcon,
		title: "Institut agréé MINEFOP",
		desc: "Diplômes et attestations reconnus par l'État camerounais."
	},
	{
		icon: Users,
		title: "Formateurs de terrain",
		desc: "Des professionnels en activité qui transmettent la réalité du métier."
	},
	{
		icon: ClockIcon,
		title: "Cours du jour & du soir",
		desc: "Des horaires adaptés aux étudiants comme aux travailleurs en reconversion."
	}
];
var centre = {
	nom: "Centre de Logpom",
	adresse: "Carrefour Andem, Logpom — Douala",
	tel: "+237 6 96 08 40 48",
	horaires: "Lundi — Samedi, 06h00 – 22h00",
	mapsUrl: "https://www.google.com/maps/search/?api=1&query=Institut+Gamaliel+Logpom+Carrefour+Andem+Douala"
};
function Home({ activites, poles }) {
	const { ref: statsRef, isRevealed: statsVisible } = useScrollReveal(.4);
	const anneesCible = (/* @__PURE__ */ new Date()).getFullYear() - 2014;
	const annees = useCountUp(anneesCible, statsVisible);
	const nbPoles = useCountUp((poles === null || poles === void 0 ? void 0 : poles.length) || 5, statsVisible);
	const staticActivities = activites || [];
	const activityTrackRef = useRef(null);
	const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
	const totalActivities = staticActivities.length;
	const isScrollingProgrammatically = useRef(false);
	const getSlotWidth = () => {
		const track = activityTrackRef.current;
		const slot = track === null || track === void 0 ? void 0 : track.querySelector("[data-activity-slot]");
		if (!track || !slot) return 0;
		return slot.offsetWidth + 16;
	};
	const goToActivity = (index) => {
		const track = activityTrackRef.current;
		if (!track || totalActivities === 0) return;
		const clamped = (index % totalActivities + totalActivities) % totalActivities;
		const slotWidth = getSlotWidth();
		isScrollingProgrammatically.current = true;
		track.scrollTo({
			left: clamped * slotWidth,
			behavior: "smooth"
		});
		setCurrentActivityIndex(clamped);
		setTimeout(() => {
			isScrollingProgrammatically.current = false;
		}, 500);
	};
	const nextActivity = () => goToActivity(currentActivityIndex + 1);
	const prevActivity = () => goToActivity(currentActivityIndex - 1);
	const handleActivityScroll = () => {
		if (isScrollingProgrammatically.current) return;
		const track = activityTrackRef.current;
		if (!track) return;
		const slotWidth = getSlotWidth();
		if (!slotWidth) return;
		const clamped = (Math.round(track.scrollLeft / slotWidth) % totalActivities + totalActivities) % totalActivities;
		setCurrentActivityIndex(clamped);
	};
	const [selectedPole, setSelectedPole] = useState(null);
	const openPoleModal = (pole) => {
		setSelectedPole(pole);
		document.body.style.overflow = "hidden";
	};
	const closePoleModal = () => {
		setSelectedPole(null);
		document.body.style.overflow = "";
	};
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		name: "Institut de Formation Professionnelle Gamaliel",
		alternateName: ["Institut Gamaliel", "IFPG"],
		description: "Institut de formation professionnelle et de recyclage agréé MINEFOP à Douala. Filières administratives et comptables, paramédicales, informatiques, logistique et hôtellerie. Diplômes CQP, DQP et BTS.",
		url: "https://institutgamaliel.com",
		logo: "https://institutgamaliel.com/assets/images/logo.png",
		image: "https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg",
		foundingDate: "2014",
		telephone: "+237696084048",
		email: "info@institutgamaliel.com",
		sameAs: ["https://www.instagram.com/institutgamaliel/", "https://wa.me/237696084048"],
		address: {
			"@type": "PostalAddress",
			streetAddress: "Carrefour Andem, Logpom",
			addressLocality: "Douala",
			addressRegion: "Littoral",
			addressCountry: "CM"
		},
		openingHours: "Mo-Sa 06:00-22:00",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Filières de formation — Institut Gamaliel",
			itemListElement: (poles || []).map((p) => ({
				"@type": "Course",
				name: p.nom,
				description: p.description_courte,
				provider: {
					"@type": "EducationalOrganization",
					name: "Institut de Formation Professionnelle Gamaliel"
				}
			}))
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Head, { children: [
			/* @__PURE__ */ jsx("title", { children: "Institut Gamaliel — Centre de Formation Professionnelle Agréé à Douala" }),
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: "Institut de Formation Professionnelle Gamaliel, agréé MINEFOP à Douala (Logpom). Formations administratives, paramédicales, informatiques, logistique et hôtellerie. Diplômes CQP, DQP, BTS."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "keywords",
				content: "Institut Gamaliel, centre de formation professionnelle Douala, formation Logpom, MINEFOP, CQP DQP BTS, formation paramédicale Douala, formation informatique Douala, formation hôtellerie Douala"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: "https://institutgamaliel.com"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: "Institut Gamaliel — Centre de Formation Professionnelle Agréé à Douala"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: "5 pôles de formation, diplômes reconnus (CQP, DQP, BTS), cours en présentiel à Logpom ou en ligne."
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: "https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:width",
				content: "1200"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:height",
				content: "630"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:site_name",
				content: "Institut Gamaliel"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:locale",
				content: "fr_CM"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: "https://institutgamaliel.com"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: "Institut Gamaliel — Formation Professionnelle à Douala"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: "Institut agréé MINEFOP. Présentiel & en ligne."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: "https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg"
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(jsonLd)
			})
		] }),
		/* @__PURE__ */ jsx(Loader, {}),
		/* @__PURE__ */ jsxs(PublicLayout, { children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden bg-gamaliel-navy-deep text-white",
				children: [
					/* @__PURE__ */ jsx("div", { className: "hidden md:block pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[60px]" }),
					/* @__PURE__ */ jsx("div", { className: "hidden md:block pointer-events-none absolute -bottom-40 -right-16 w-96 h-96 rounded-full bg-gamaliel-green/10 blur-[60px]" }),
					/* @__PURE__ */ jsx("div", {
						className: "relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-32 lg:pb-28",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85",
									children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4 text-gamaliel-green" }), "Agréé MINEFOP · Depuis 2014"]
								}),
								/* @__PURE__ */ jsxs("h1", {
									className: "font-display font-bold text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.4rem] mt-7 tracking-tight",
									children: [
										"Construisez votre avenir",
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("span", {
											className: "text-gamaliel-green",
											children: "professionnel à Douala"
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-6 text-lg text-white/70 max-w-lg leading-relaxed",
									children: "L'Institut Gamaliel forme aux métiers de la gestion, du paramédical, du digital, de la logistique et de l'hôtellerie — au centre de Logpom ou entièrement en ligne."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-4 mt-9",
									children: [/* @__PURE__ */ jsxs(Link, {
										href: "/preinscription",
										className: "group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
										style: { backgroundColor: ACTION_COLOR },
										onMouseEnter: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER,
										onMouseLeave: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR,
										children: ["Faire ma pré-inscription", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" })]
									}), /* @__PURE__ */ jsx(Link, {
										href: "/formations",
										className: "inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300",
										children: "Découvrir nos formations"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-8 border-t border-white/10 text-sm text-white/60",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green" }),
												anneesCible,
												"+ ans d'expérience"
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green" }),
												(poles === null || poles === void 0 ? void 0 : poles.length) || 5,
												" pôles de formation"
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green" }), "CQP · DQP · BTS"]
										})
									]
								})
							] }), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative rounded-[2.25rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/hero-campus.webp",
										alt: "Étudiants de l'Institut Gamaliel en formation pratique à Douala",
										className: "w-full h-full object-cover",
										loading: "eager"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute inset-0",
										style: { background: "linear-gradient(200deg, rgba(13,40,68,0) 40%, rgba(13,40,68,0.55) 100%)" }
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "absolute -bottom-6 -left-6 sm:-left-10 bg-white text-gamaliel-navy rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 max-w-[240px]",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-xl bg-gamaliel-green/20 flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-5 h-5 text-gamaliel-green-deep" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold leading-tight",
										children: "Institut agréé"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gamaliel-navy/60",
										children: "Arrêté N°94 & N°247 MINEFOP"
									})] })]
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "POURQUOI CHOISIR L'INSTITUT GAMALIEL"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
							children: "Un institut agréé, cinq voies pour réussir"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						ref: statsRef,
						className: "grid grid-cols-2 md:grid-cols-4 gap-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "font-display text-4xl font-extrabold text-gamaliel-green-deep",
									children: [annees, "+"]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gamaliel-navy/70 mt-1",
									children: "Ans d'expérience"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-4xl font-extrabold text-gamaliel-green-deep",
									children: nbPoles
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gamaliel-navy/70 mt-1",
									children: "Pôles de formation"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-4xl font-extrabold text-gamaliel-green-deep",
									children: "100%"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gamaliel-navy/70 mt-1",
									children: "Ateliers pratiques"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-xl sm:text-2xl font-extrabold text-gamaliel-green-deep leading-tight",
									children: "CQP · DQP · BTS"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gamaliel-navy/70 mt-1",
									children: "Diplômes reconnus"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx(RevealSection, {
				as: "section",
				className: "py-20 bg-gamaliel-paper",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-gamaliel-navy/5 text-gamaliel-navy rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "NOS FILIÈRES"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
							children: "Cinq pôles d'expertise, une même exigence de terrain"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-6",
						children: (poles || []).map((pole) => {
							const Icon = ICONS[pole.icone] || AcademicCapIcon;
							return /* @__PURE__ */ jsxs("article", {
								className: "group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 h-full hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 flex flex-col",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-32 overflow-hidden",
									children: [pole.image ? /* @__PURE__ */ jsx("img", {
										src: pole.image,
										alt: `${pole.nom} — Institut Gamaliel`,
										className: "w-full h-full object-cover",
										loading: "lazy"
									}) : /* @__PURE__ */ jsx("div", {
										className: "w-full h-full flex items-center justify-center",
										style: { backgroundColor: `${pole.couleur}15` },
										children: /* @__PURE__ */ jsx(Icon, {
											className: "w-9 h-9",
											style: { color: pole.couleur }
										})
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl flex items-center justify-center shadow-sm",
										style: { backgroundColor: pole.couleur },
										children: /* @__PURE__ */ jsx(Icon, { className: "w-4.5 h-4.5 text-white" })
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-5 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "font-display font-bold text-sm text-gamaliel-navy-deep mb-1.5 leading-snug",
											children: pole.nom
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/60 leading-relaxed mb-3 flex-1 line-clamp-3",
											children: pole.description_courte
										}),
										/* @__PURE__ */ jsxs("button", {
											onClick: () => openPoleModal(pole),
											className: "inline-flex items-center gap-1 text-xs font-semibold transition-colors",
											style: { color: pole.couleur },
											children: ["Détails", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3 h-3" })]
										})
									]
								})]
							}, pole.id);
						})
					})]
				})
			}),
			selectedPole && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm",
				onClick: closePoleModal,
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative h-48 overflow-hidden rounded-t-3xl",
						children: [
							selectedPole.image ? /* @__PURE__ */ jsx("img", {
								src: selectedPole.image,
								alt: selectedPole.nom,
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-full h-full",
								style: { backgroundColor: `${selectedPole.couleur}15` }
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0",
								style: { background: "linear-gradient(180deg, rgba(13,40,68,0) 50%, rgba(13,40,68,0.75) 100%)" }
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: closePoleModal,
								className: "absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors",
								"aria-label": "Fermer",
								children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-4 left-6",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "font-display text-2xl font-bold text-white",
									children: selectedPole.nom
								}), selectedPole.nombre_formations > 0 && /* @__PURE__ */ jsxs("p", {
									className: "text-sm text-white/70 mt-1",
									children: [
										selectedPole.nombre_formations,
										" formation",
										selectedPole.nombre_formations > 1 ? "s" : "",
										" disponible",
										selectedPole.nombre_formations > 1 ? "s" : ""
									]
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gamaliel-navy/70 leading-relaxed",
							children: selectedPole.description
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 mt-6 pt-6 border-t border-gamaliel-navy/5",
							children: [/* @__PURE__ */ jsx(Link, {
								href: `/formations?pole=${selectedPole.slug}`,
								className: "flex-1 text-center px-5 py-3 rounded-xl font-semibold text-white transition-all",
								style: { backgroundColor: selectedPole.couleur },
								children: "Voir les formations"
							}), /* @__PURE__ */ jsx("button", {
								onClick: closePoleModal,
								className: "px-5 py-3 border-2 border-gamaliel-navy/10 rounded-xl font-semibold text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 transition-colors",
								children: "Fermer"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "L'EXCELLENCE PÉDAGOGIQUE"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
							children: "Pourquoi se former à l'Institut Gamaliel ?"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
						children: avantages.map((item, i) => {
							const Icon = item.icon;
							return /* @__PURE__ */ jsx(RevealSection, {
								delay: i * 80,
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-gamaliel-paper rounded-2xl p-6 border border-gamaliel-navy/5 h-full text-center",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "w-14 h-14 rounded-xl bg-gamaliel-green/15 text-gamaliel-green-deep flex items-center justify-center mx-auto mb-4",
											children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7" })
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-bold text-gamaliel-navy-deep mb-1",
											children: item.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gamaliel-navy/60",
											children: item.desc
										})
									]
								})
							}, item.title);
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx(RevealSection, {
				as: "section",
				className: "py-20 bg-gamaliel-paper",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "text-center max-w-2xl mx-auto mb-12",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4",
									children: "NOS MODALITÉS DE FORMATION"
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
									children: ["Au centre de Logpom ou ", /* @__PURE__ */ jsx("span", {
										className: "text-gamaliel-blue",
										children: "100% en ligne"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gamaliel-navy/60 mt-3 leading-relaxed",
									children: "Choisissez la formule adaptée à votre emploi du temps."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-3xl overflow-hidden border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-48 overflow-hidden",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/presentiel.webp",
										alt: "Formation en présentiel à l'Institut Gamaliel, Logpom, Douala",
										className: "w-full h-full object-cover",
										loading: "lazy"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute top-4 left-4 px-3 py-1 bg-gamaliel-green-deep text-white rounded-full text-xs font-semibold",
										children: "Présentiel"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-6",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-display text-xl font-bold text-gamaliel-navy-deep",
										children: "Cours au centre (Jour & Soir)"
									}), /* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), "Centre équipé à Logpom, Carrefour Andem, Douala"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), "Pédagogie active, 100% pratique dès les premières semaines"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), "Préparation aux diplômes CQP, DQP et BTS"]
											})
										]
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-3xl overflow-hidden border border-gamaliel-navy/5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-48 overflow-hidden",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/online.webp",
										alt: "Formation en ligne Institut Gamaliel",
										className: "w-full h-full object-cover",
										loading: "lazy"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute top-4 left-4 px-3 py-1 bg-gamaliel-blue text-white rounded-full text-xs font-semibold",
										children: "En ligne"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-6",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-display text-xl font-bold text-gamaliel-navy-deep",
										children: "Formations à distance"
									}), /* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" }), "Accessible partout au Cameroun, à votre rythme"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" }), "Suivi personnalisé par nos formateurs"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" }), "Idéal pour les travailleurs en reconversion"]
											})
										]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-center mt-10",
							children: /* @__PURE__ */ jsxs(Link, {
								href: "/formations",
								className: "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
								style: { backgroundColor: ACTION_COLOR },
								onMouseEnter: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER,
								onMouseLeave: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR,
								children: ["Consulter le catalogue des formations", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "activites",
				className: "py-20 bg-white scroll-mt-24 overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsx(RevealSection, {
						className: "flex items-end justify-between mb-10 flex-wrap gap-4",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-gamaliel-blue/10 text-gamaliel-blue rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "VIE DE L'INSTITUT"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
							children: "Actualités & événements"
						})] })
					}), /* @__PURE__ */ jsx("div", {
						className: "relative",
						children: staticActivities.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "text-center py-12",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-gamaliel-navy/50",
								children: "Aucune activité programmée pour le moment."
							})
						}) : /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx("div", {
								ref: activityTrackRef,
								onScroll: handleActivityScroll,
								className: "flex items-stretch gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar lg:overflow-x-hidden cursor-grab active:cursor-grabbing",
								children: staticActivities.map((activity, index) => {
									const isCenter = index === currentActivityIndex;
									const hasLien = activity.lien && activity.lien.trim() !== "";
									return /* @__PURE__ */ jsx("div", {
										"data-activity-slot": true,
										className: "flex-shrink-0 w-[80%] sm:w-[56%] lg:w-[32%] snap-center transition-all duration-500 ease-out",
										style: {
											transform: isCenter ? "translateY(0) scale(1)" : "translateY(10px) scale(0.93)",
											opacity: isCenter ? 1 : .5
										},
										children: /* @__PURE__ */ jsxs("div", {
											className: "group relative rounded-[1.75rem] overflow-hidden aspect-[4/5] transition-all duration-500",
											style: { boxShadow: isCenter ? "0 24px 40px -12px rgba(13,40,68,0.35)" : "0 4px 12px -4px rgba(13,40,68,0.1)" },
											children: [
												/* @__PURE__ */ jsx("img", {
													src: activity.image_url,
													alt: `${activity.title} - Institut Gamaliel`,
													className: "absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
													style: { filter: isCenter ? "none" : "grayscale(60%)" },
													loading: "lazy"
												}),
												/* @__PURE__ */ jsx("div", {
													className: "absolute inset-0",
													style: { background: "linear-gradient(180deg, rgba(13,40,68,0.05) 0%, rgba(13,40,68,0.15) 45%, rgba(13,40,68,0.92) 100%)" }
												}),
												isCenter && /* @__PURE__ */ jsx("div", {
													className: "absolute inset-0 rounded-[1.75rem] pointer-events-none",
													style: { boxShadow: `inset 0 0 0 2px ${ACTION_COLOR}D9` }
												}),
												/* @__PURE__ */ jsx("div", {
													className: "absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold",
													children: activity.date
												}),
												activity.tag && /* @__PURE__ */ jsx("div", {
													className: "absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white",
													style: { backgroundColor: SECONDARY_COLOR },
													children: activity.tag
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "absolute bottom-0 left-0 right-0 p-6",
													children: [
														/* @__PURE__ */ jsx("h3", {
															className: "font-display font-bold text-lg text-white leading-snug line-clamp-2",
															children: activity.title
														}),
														/* @__PURE__ */ jsx("p", {
															className: "text-sm text-white/70 mt-2 line-clamp-2 transition-all duration-500 overflow-hidden",
															style: {
																maxHeight: isCenter ? "3.5rem" : "0",
																opacity: isCenter ? 1 : 0,
																marginTop: isCenter ? "0.5rem" : "0"
															},
															children: activity.excerpt
														}),
														hasLien && /* @__PURE__ */ jsxs("a", {
															href: activity.lien,
															target: "_blank",
															rel: "noopener noreferrer",
															className: "inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:gap-2.5",
															style: {
																backgroundColor: ACTION_COLOR,
																opacity: isCenter ? 1 : 0,
																pointerEvents: isCenter ? "auto" : "none"
															},
															children: ["Voir l'événement", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3.5 h-3.5" })]
														})
													]
												})
											]
										})
									}, activity.id);
								})
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: prevActivity,
								className: "hidden lg:flex absolute left-0 top-[42%] -translate-y-1/2 -translate-x-4 z-30 w-12 h-12 items-center justify-center rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-white bg-gamaliel-navy-deep",
								"aria-label": "Événement précédent",
								children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: nextActivity,
								className: "hidden lg:flex absolute right-0 top-[42%] -translate-y-1/2 translate-x-4 z-30 w-12 h-12 items-center justify-center rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-white bg-gamaliel-navy-deep",
								"aria-label": "Événement suivant",
								children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-center gap-1.5 mt-8 max-w-xs mx-auto",
								children: staticActivities.map((_, index) => /* @__PURE__ */ jsx("button", {
									onClick: () => goToActivity(index),
									className: "h-1 rounded-full transition-all duration-500 flex-1",
									style: { backgroundColor: index === currentActivityIndex ? ACTION_COLOR : "#E7EAF0" },
									"aria-label": `Aller à l'événement ${index + 1}`
								}, index))
							})
						] })
					})]
				})
			}),
			/* @__PURE__ */ jsx("style", { children: `
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                ` }),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-gamaliel-paper",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "AVIS & TÉMOIGNAGES"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep",
							children: "Ce que disent nos anciens apprenants"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid md:grid-cols-3 gap-6",
						children: [
							{
								initials: "FD",
								nom: "Flore Djoumessi",
								filiere: "Secrétariat médical — 2025",
								avis: "Formation très encadrée, avec des mises en situation réelles en cabinet. J'ai été recrutée dans une clinique à Douala dès la fin du stage."
							},
							{
								initials: "BT",
								nom: "Boris Talla",
								filiere: "Infographie — 2024",
								avis: "Les ateliers pratiques sur les logiciels m'ont permis de lancer mon activité de freelance en community management."
							},
							{
								initials: "SN",
								nom: "Sandrine Nkeng",
								filiere: "Cuisine & Pâtisserie — 2025",
								avis: "L'ambiance en atelier cuisine est exigeante mais très formatrice. J'ai ouvert mon propre service traiteur après le diplôme."
							}
						].map((t, i) => /* @__PURE__ */ jsx(RevealSection, {
							delay: i * 100,
							children: /* @__PURE__ */ jsxs("div", {
								className: "bg-white rounded-2xl p-6 border border-gamaliel-navy/5 hover:shadow-xl transition-shadow duration-300",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 mb-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gamaliel-green/15 text-gamaliel-green-deep",
											children: t.initials
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-gamaliel-navy-deep",
											children: t.nom
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/50",
											children: t.filiere
										})] })]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-gamaliel-navy/70 leading-relaxed",
										children: [
											"\"",
											t.avis,
											"\""
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex gap-0.5 mt-3",
										children: [...Array(5)].map((_, j) => /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-gamaliel-green-deep fill-gamaliel-green-deep" }, j))
									})
								]
							})
						}, t.nom))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsx(RevealSection, { children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl overflow-hidden border border-gamaliel-navy/5 grid md:grid-cols-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "relative h-64 md:h-full",
							children: /* @__PURE__ */ jsx("img", {
								src: "/assets/images/centre-logpom.webp",
								alt: "Institut Gamaliel — Centre de Logpom, Douala",
								className: "w-full h-full object-cover",
								loading: "lazy"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-8 lg:p-10 flex flex-col justify-center",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "inline-block w-fit px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4",
									children: "NOTRE CENTRE"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-2xl md:text-3xl font-bold text-gamaliel-navy-deep mb-4",
									children: centre.nom
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "space-y-3 text-sm text-gamaliel-navy/70",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ jsx(MapPinIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), centre.adresse]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), centre.horaires]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" }), /* @__PURE__ */ jsx("a", {
												href: `tel:${centre.tel.replace(/\s/g, "")}`,
												className: "hover:text-gamaliel-green-deep transition-colors",
												children: centre.tel
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: centre.mapsUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 mt-6 text-sm font-semibold text-gamaliel-green-deep hover:underline w-fit",
									children: ["Localiser sur Google Maps", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4" })]
								})
							]
						})]
					}) })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 relative overflow-hidden",
				style: { backgroundColor: ACTION_COLOR },
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl md:text-4xl font-bold text-white",
							children: "Rejoignez l'Institut Gamaliel dès aujourd'hui"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-white/85 mt-3 max-w-xl mx-auto",
							children: [(poles === null || poles === void 0 ? void 0 : poles.length) || 5, " pôles de formation, un institut agréé, un accompagnement de terrain."]
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/preinscription",
							className: "inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-gamaliel-green-deep rounded-full font-bold text-lg hover:bg-gamaliel-navy-deep hover:text-white hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300",
							children: ["Faire ma pré-inscription", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-5 h-5" })]
						})
					]
				})
			})
		] })
	] });
}
//#endregion
export { Home as default };

//# sourceMappingURL=Home-CnbgZ6iQ.js.map