import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { AcademicCapIcon, ArrowRightIcon, CheckBadgeIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, ComputerDesktopIcon, ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, GraduationCap, Users } from "lucide-react";
//#region resources/js/hooks/useScrollReveal.ts
function useScrollReveal(threshold = .15) {
	const ref = useRef(null);
	const [isRevealed, setIsRevealed] = useState(false);
	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsRevealed(true);
				observer.unobserve(node);
			}
		}, { threshold });
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
var RevealSection = ({ children, delay = 0, className = "", as = "div" }) => {
	const { ref, isRevealed } = useScrollReveal();
	return /* @__PURE__ */ jsx(as, {
		ref,
		className,
		style: {
			opacity: isRevealed ? 1 : 0,
			transform: isRevealed ? "translateY(0)" : "translateY(28px)",
			transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
		},
		children
	});
};
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
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500",
		style: {
			opacity: progress >= 100 ? 0 : 1,
			pointerEvents: progress >= 100 ? "none" : "auto"
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center max-w-md px-8",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: "/assets/images/logo.jpeg",
					alt: "CAB Informatique",
					className: "w-20 h-20 mx-auto mb-6 object-contain rounded-full"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-4",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-full transition-all duration-300",
						style: {
							width: `${progress}%`,
							background: "linear-gradient(135deg, #0d2a63, #1a56db)"
						}
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-gray-500 font-medium tracking-wider",
					children: "Notre désir, Votre Professionnalisme"
				})
			]
		})
	});
};
//#endregion
//#region resources/js/hooks/useCountUp.ts
function useCountUp(target, isActive, duration = 1500) {
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (!isActive) return;
		let start = null;
		const ease = (t) => 1 - Math.pow(1 - t, 3);
		const step = (timestamp) => {
			if (start === null) start = timestamp;
			const progress = Math.min((timestamp - start) / duration, 1);
			setValue(Math.floor(ease(progress) * target));
			if (progress < 1) requestAnimationFrame(step);
			else setValue(target);
		};
		requestAnimationFrame(step);
	}, [
		isActive,
		target,
		duration
	]);
	return value;
}
//#endregion
//#region resources/js/Pages/public/Home.tsx
var heroSlides = [
	{
		id: 1,
		image: "/assets/images/img1.jpeg",
		alt: "Centre de formation professionnelle CAB Informatique Douala Yaoundé Bafoussam",
		badge: "Rentrée académique 2026-2027",
		title: "CAB Informatique",
		subtitle: "Centre de Référence de la Formation Professionnelle au Cameroun",
		description: "Depuis 22 ans, CAB Informatique forme des professionnels qualifiés en informatique, secrétariat, comptabilité, infographie et maintenance à Douala, Yaoundé, Bafoussam et en ligne."
	},
	{
		id: 2,
		image: "/assets/images/certif.jpg",
		alt: "Certification professionnelle en ligne au Cameroun - CAB Informatique",
		badge: "Certifications en ligne",
		title: "Faites certifier vos compétences",
		subtitle: "Où que vous soyez au Cameroun, à votre rythme",
		description: "Nos certifications professionnelles en ligne vous permettent de valider vos acquis et d'obtenir un diplôme reconnu à distance."
	},
	{
		id: 3,
		image: "/assets/images/img3.jpeg",
		alt: "Formation pratique en informatique bureautique et maintenance Douala",
		badge: "Formations 100% pratiques",
		title: "Formations Pratiques & Opérationnelles",
		subtitle: "Matériel réel dès la première semaine",
		description: "Mise en pratique directe sur équipements informatiques, réseaux et logiciels professionnels. C'est l'exigence CAB Informatique."
	}
];
var HERO_SLIDE_DURATION = 6500;
var avantages = [
	{
		icon: AcademicCapIcon,
		title: "100% Pratique",
		desc: "Apprentissage direct sur matériel réel, ordinateurs et réseaux dès la première semaine."
	},
	{
		icon: ShieldCheckIcon,
		title: "Formateurs Experts",
		desc: "Des professionnels du terrain qui enseignent la réalité des métiers en entreprise."
	},
	{
		icon: ComputerDesktopIcon,
		title: "Salles Équipées",
		desc: "Ordinateurs récents, logiciels métiers sous licence et laboratoires pratiques."
	},
	{
		icon: ClockIcon,
		title: "Cours du Jour & Soir",
		desc: "Des horaires adaptés pour étudiants, travailleurs et personnes en reconversion."
	}
];
var campus = [
	{
		ville: "Douala",
		nom: "Campus de Yassa",
		adresse: "ELF, à 100 m de l'Échangeur en allant vers l'Aéroport",
		tel: "+237 675 64 77 39",
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Yassa+Douala"
	},
	{
		ville: "Yaoundé",
		nom: "Campus de Nlongkak",
		adresse: "À 100 m du rond-point Nlongkak, en face de MINDEVEL",
		tel: "+237 656 83 13 88",
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Nlongkak+Yaounde"
	},
	{
		ville: "Bafoussam",
		nom: "Campus de Casablanca",
		adresse: "Marché Casablanca, Immeuble Pharmacie de l'Espérance",
		tel: "+237 659 02 74 16",
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=CAB+Informatique+Casablanca+Bafoussam"
	}
];
function Home({ activites }) {
	const { ref: statsRef, isRevealed: statsVisible } = useScrollReveal(.4);
	const annees = useCountUp(22, statsVisible);
	const diplomes = useCountUp(5e3, statsVisible);
	const tauxReussite = useCountUp(85, statsVisible);
	const staticActivities = activites || [];
	const [currentSlide, setCurrentSlide] = useState(0);
	const [heroPaused, setHeroPaused] = useState(false);
	const [progressKey, setProgressKey] = useState(0);
	const [reducedMotion, setReducedMotion] = useState(false);
	const heroTimeoutRef = useRef(null);
	const current = heroSlides[currentSlide];
	useEffect(() => {
		var _mq$addEventListener;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReducedMotion(mq.matches);
		const handler = (e) => setReducedMotion(e.matches);
		(_mq$addEventListener = mq.addEventListener) === null || _mq$addEventListener === void 0 || _mq$addEventListener.call(mq, "change", handler);
		return () => {
			var _mq$removeEventListen;
			return (_mq$removeEventListen = mq.removeEventListener) === null || _mq$removeEventListen === void 0 ? void 0 : _mq$removeEventListen.call(mq, "change", handler);
		};
	}, []);
	const goToSlide = useCallback((index) => {
		setCurrentSlide(index);
		setProgressKey((k) => k + 1);
	}, []);
	const nextSlide = useCallback(() => {
		setCurrentSlide((i) => (i + 1) % heroSlides.length);
		setProgressKey((k) => k + 1);
	}, []);
	const prevSlide = useCallback(() => {
		setCurrentSlide((i) => (i - 1 + heroSlides.length) % heroSlides.length);
		setProgressKey((k) => k + 1);
	}, []);
	useEffect(() => {
		if (heroPaused || reducedMotion) return;
		heroTimeoutRef.current = setTimeout(nextSlide, HERO_SLIDE_DURATION);
		return () => {
			if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
		};
	}, [
		currentSlide,
		heroPaused,
		reducedMotion,
		progressKey,
		nextSlide
	]);
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
		if (!track) return;
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
	useEffect(() => {
		if (window.innerWidth < 1024) return;
		const interval = setInterval(nextActivity, 5e3);
		return () => clearInterval(interval);
	}, [currentActivityIndex]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Head, { children: [
			/* @__PURE__ */ jsx("title", { children: "CAB Informatique — Centre de Formation Professionnelle à Douala, Yaoundé, Bafoussam & En Ligne" }),
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: "CAB Informatique : Centre de formation professionnelle agréé au Cameroun. Formations 100% pratiques en Infographie, Secrétariat Bureautique, Comptabilité, Maintenance, Réseaux & Vidéosurveillance à Douala, Yaoundé, Bafoussam et en ligne."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "keywords",
				content: "CAB Informatique, centre de formation professionnelle Douala, formation informatique Yaoundé, centre de formation Bafoussam, formation infographie Douala, formation secrétariat bureautique, formation en ligne Cameroun, certification en ligne"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: "https://cab-informatique.com"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: "CAB Informatique — Formation Professionnelle Pratique au Cameroun"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: "Formez-vous aux métiers de l'informatique, de la gestion et du numérique à Douala, Yaoundé, Bafoussam et en ligne. DQP reconnu et certifications."
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"
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
				content: "CAB Informatique"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:locale",
				content: "fr_CM"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: "https://cab-informatique.com"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:site",
				content: "@cabinfo"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: "CAB Informatique — Centre de Formation Professionnelle au Cameroun"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: "Formations pratiques en présentiel (Douala, Yaoundé, Bafoussam) et en ligne. Préparez votre avenir professionnel avec CAB Informatique."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "EducationalOrganization",
					"name": "CAB Informatique",
					"alternateName": ["CAB Informatique Cameroun", "Centre d'Apprentissage Bureautique et Informatique"],
					"description": "Centre de référence de la formation professionnelle agréé au Cameroun : Informatique, Secrétariat, Comptabilité, Infographie, Maintenance, Vidéosurveillance à Douala, Yaoundé, Bafoussam et en ligne.",
					"url": "https://cab-informatique.com",
					"logo": "https://cab-informatique.com/assets/images/logo.jpeg",
					"image": "https://cab-informatique.com/assets/images/og-cab-informatique.jpg",
					"foundingDate": "2004",
					"telephone": "+237690666245",
					"email": "cabinfo2@gmail.com",
					"sameAs": [
						"https://facebook.com/cabinfo",
						"https://wa.me/237677835228",
						"https://tiktok.com/@cabinfo"
					],
					"address": {
						"@type": "PostalAddress",
						"streetAddress": "ELF Yassa, à 100m de l'échangeur",
						"addressLocality": "Douala",
						"addressRegion": "Littoral",
						"addressCountry": "CM"
					},
					"department": [
						{
							"@type": "EducationalOrganization",
							"name": "CAB Informatique Douala - Campus Yassa",
							"address": {
								"@type": "PostalAddress",
								"streetAddress": "ELF, à 100 m de l'Échangeur",
								"addressLocality": "Douala",
								"addressCountry": "CM"
							},
							"telephone": "+237675647739"
						},
						{
							"@type": "EducationalOrganization",
							"name": "CAB Informatique Yaoundé - Campus Nlongkak",
							"address": {
								"@type": "PostalAddress",
								"streetAddress": "À 100 m du rond-point Nlongkak",
								"addressLocality": "Yaoundé",
								"addressCountry": "CM"
							},
							"telephone": "+237656831388"
						},
						{
							"@type": "EducationalOrganization",
							"name": "CAB Informatique Bafoussam - Campus Casablanca",
							"address": {
								"@type": "PostalAddress",
								"streetAddress": "Marché Casablanca, Immeuble Pharmacie de l'Espérance",
								"addressLocality": "Bafoussam",
								"addressCountry": "CM"
							},
							"telephone": "+237659027416"
						}
					],
					"hasOfferCatalog": {
						"@type": "OfferCatalog",
						"name": "Formations Professionnelles CAB Informatique",
						"itemListElement": [
							{
								"@type": "Course",
								"name": "Formation Secrétariat Bureautique Douala Yaoundé Bafoussam",
								"description": "Formation pratique aux outils bureautiques et secrétariat de direction.",
								"provider": {
									"@type": "EducationalOrganization",
									"name": "CAB Informatique"
								}
							},
							{
								"@type": "Course",
								"name": "Formation Secrétariat Comptable & Gestion",
								"description": "Formation qualifiante en tenue de caisse, comptabilité et logiciels de gestion.",
								"provider": {
									"@type": "EducationalOrganization",
									"name": "CAB Informatique"
								}
							},
							{
								"@type": "Course",
								"name": "Formation Infographie 2D & Design Graphique",
								"description": "Formation sur la suite Adobe (Photoshop, Illustrator, InDesign) à Douala, Yaoundé et en ligne.",
								"provider": {
									"@type": "EducationalOrganization",
									"name": "CAB Informatique"
								}
							},
							{
								"@type": "Course",
								"name": "Formation Maintenance Informatique & Réseaux",
								"description": "Dépannage matériel, câblage réseau et administration système au Cameroun.",
								"provider": {
									"@type": "EducationalOrganization",
									"name": "CAB Informatique"
								}
							},
							{
								"@type": "Course",
								"name": "Formation Installation Vidéosurveillance",
								"description": "Installation et configuration de caméras de surveillance IP et analogiques.",
								"provider": {
									"@type": "EducationalOrganization",
									"name": "CAB Informatique"
								}
							}
						]
					}
				})
			})
		] }),
		/* @__PURE__ */ jsx(Loader, {}),
		/* @__PURE__ */ jsxs(PublicLayout, { children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative h-screen min-h-[640px] max-h-[940px] overflow-hidden bg-[#081428] text-white",
				style: { fontFamily: "'Inter', system-ui, sans-serif" },
				onMouseEnter: () => setHeroPaused(true),
				onMouseLeave: () => setHeroPaused(false),
				children: [
					/* @__PURE__ */ jsx("style", { children: `
                        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
                        .hc-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
                        .hc-mono { font-family: 'IBM Plex Mono', monospace; }

                        @keyframes hcFadeUp {
                            from { opacity: 0; transform: translateY(14px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .hc-anim { animation: hcFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
                        @media (prefers-reduced-motion: reduce) {
                            .hc-anim { animation: none; }
                        }

                        @keyframes hcProgress {
                            from { transform: scaleX(0); }
                            to { transform: scaleX(1); }
                        }
                        .hc-progress { animation: hcProgress ${HERO_SLIDE_DURATION}ms linear forwards; }
                        .hc-progress-paused { animation-play-state: paused; }
                    ` }),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute inset-0 z-0",
						children: [
							heroSlides.map((slide, i) => /* @__PURE__ */ jsx("img", {
								src: slide.image,
								alt: slide.alt,
								className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-[1100ms] ease-out ${i === currentSlide ? "opacity-100" : "opacity-0"}`,
								loading: i === 0 ? "eager" : "lazy",
								fetchPriority: i === 0 ? "high" : "auto"
							}, slide.id)),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0",
								style: { background: "linear-gradient(115deg, rgba(8,20,40,0.94) 0%, rgba(15,43,99,0.86) 42%, rgba(15,43,99,0.35) 78%)" }
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0",
								style: { background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.35), transparent 60%)" }
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "relative z-10 h-full flex items-center",
						children: /* @__PURE__ */ jsx("div", {
							className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full py-16",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid lg:grid-cols-[1fr_auto] gap-16 items-end lg:items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "max-w-2xl",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "hc-anim hc-mono inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase text-white/90 rounded-full border border-white/25 bg-white/[0.06] mb-7",
											style: { animationDelay: "0ms" },
											children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#f2b705]" }), current.badge]
										}),
										/* @__PURE__ */ jsxs("h1", {
											className: "hc-anim hc-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] font-medium tracking-tight",
											style: { animationDelay: "80ms" },
											children: [
												current.title,
												/* @__PURE__ */ jsx("br", {}),
												/* @__PURE__ */ jsx("span", {
													className: "text-[#f2b705]",
													children: current.subtitle
												})
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "hc-anim mt-6 text-lg text-white/75 max-w-lg leading-relaxed",
											style: { animationDelay: "160ms" },
											children: current.description
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "hc-anim flex flex-wrap items-center gap-5 mt-10",
											style: { animationDelay: "240ms" },
											children: [/* @__PURE__ */ jsxs(Link, {
												href: "/formations",
												className: "group inline-flex items-center gap-2 px-7 py-4 bg-[#f2b705] text-[#0f2b63] rounded-full font-semibold hover:bg-white transition-colors duration-300",
												children: ["Découvrir nos nos formations", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" })]
											}), /* @__PURE__ */ jsx("a", {
												href: "#activites",
												className: "inline-flex items-center gap-2 px-7 py-4 text-white/90 font-medium hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white",
												children: "Voir nos événements"
											})]
										})
									]
								}, current.id), /* @__PURE__ */ jsxs("div", {
									className: "hidden lg:flex flex-col w-[19rem] shrink-0",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "hc-mono text-[11px] tracking-[0.16em] uppercase text-white/45 mb-3 pl-1",
										children: [
											"Programme — ",
											String(currentSlide + 1).padStart(2, "0"),
											" /",
											" ",
											String(heroSlides.length).padStart(2, "0")
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "border-t border-white/15",
										children: heroSlides.map((slide, index) => {
											const active = index === currentSlide;
											return /* @__PURE__ */ jsxs("button", {
												onClick: () => goToSlide(index),
												className: "relative w-full text-left py-4 border-b border-white/15 group focus:outline-none",
												"aria-current": active,
												children: [
													/* @__PURE__ */ jsx("span", {
														className: `hc-mono text-xs mr-3 transition-colors duration-300 ${active ? "text-[#f2b705]" : "text-white/35"}`,
														children: String(index + 1).padStart(2, "0")
													}),
													/* @__PURE__ */ jsx("span", {
														className: `text-sm transition-colors duration-300 ${active ? "text-white font-medium" : "text-white/50 group-hover:text-white/80"}`,
														children: slide.badge
													}),
													/* @__PURE__ */ jsx("span", {
														className: "absolute left-0 right-0 -bottom-px h-px bg-white/0 overflow-hidden",
														children: active && /* @__PURE__ */ jsx("span", { className: `block h-full origin-left bg-[#f2b705] hc-progress ${heroPaused || reducedMotion ? "hc-progress-paused" : ""}` }, progressKey)
													})
												]
											}, slide.id);
										})
									})]
								})]
							})
						})
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: prevSlide,
						"aria-label": "Diapositive précédente",
						className: "absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: nextSlide,
						"aria-label": "Diapositive suivante",
						className: "absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b705]",
						children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "lg:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2",
						children: heroSlides.map((_, index) => /* @__PURE__ */ jsx("button", {
							onClick: () => goToSlide(index),
							"aria-label": `Aller à la diapositive ${index + 1}`,
							className: `transition-all duration-300 rounded-full ${index === currentSlide ? "w-8 h-2 bg-[#f2b705]" : "w-2 h-2 bg-white/35 hover:bg-white/60"}`
						}, index))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#081428]/70 backdrop-blur-sm",
						children: /* @__PURE__ */ jsx("div", {
							className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-2 text-white/70 text-sm",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-[#f2b705]" }), "22 ans d'expérience au Cameroun"]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-[#f2b705]" }), "Plus de 5000 diplômés formés"]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(GraduationCap, { className: "w-4 h-4 text-[#f2b705]" }), "DQP & Certifications Reconnues"]
									})
								]
							})
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
							className: "inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "POURQUOI CHOISIR CAB INFORMATIQUE"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-gray-900",
							children: "Le centre de référence pour votre formation professionnelle"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						ref: statsRef,
						className: "grid grid-cols-2 md:grid-cols-4 gap-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gray-50 border border-gray-100",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-4xl font-extrabold text-[#1a56db]",
									children: [annees, "+"]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gray-700 mt-1",
									children: "Ans d'expérience au Cameroun"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gray-50 border border-gray-100",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-4xl font-extrabold text-[#1a56db]",
									children: [diplomes, "+"]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gray-700 mt-1",
									children: "Apprenants diplômés"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gray-50 border border-gray-100",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-4xl font-extrabold text-[#1a56db]",
									children: "100%"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gray-700 mt-1",
									children: "Ateliers Pratiques"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center p-6 rounded-2xl bg-gray-50 border border-gray-100",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-4xl font-extrabold text-[#1a56db]",
									children: [tauxReussite, "%"]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium text-gray-700 mt-1",
									children: "Insertion & Réussite"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-gray-50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-red-50 text-[#d21f2f] rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "L'EXCELLENCE PÉDAGOGIQUE"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-gray-900",
							children: "Pourquoi vous former chez CAB Informatique ?"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
						children: avantages.map((item, i) => {
							const Icon = item.icon;
							return /* @__PURE__ */ jsx(RevealSection, {
								delay: i * 80,
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-2xl p-6 border border-gray-100 h-full text-center",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "w-14 h-14 rounded-xl bg-blue-50 text-[#1a56db] flex items-center justify-center mx-auto mb-4",
											children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7" })
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-bold text-gray-900 mb-1",
											children: item.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-500",
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
				className: "py-20 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "text-center max-w-2xl mx-auto mb-12",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4",
									children: "NOS MODALITÉS DE FORMATION"
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "text-3xl md:text-4xl font-extrabold text-gray-900",
									children: ["Formations Présentielles à Douala, Yaoundé, Bafoussam ou ", /* @__PURE__ */ jsx("span", {
										className: "text-[#1a56db]",
										children: "100% En Ligne"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-500 mt-3 leading-relaxed",
									children: "Choisissez la formule qui convient à votre emploi du temps : cours en centre de formation ou apprentissage flexible à distance."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-3xl overflow-hidden border border-gray-100",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-48 overflow-hidden",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/img3.jpeg",
										alt: "Formation professionnelle en présentiel à Douala Yaoundé Bafoussam - CAB Informatique",
										className: "w-full h-full object-cover",
										loading: "lazy"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute top-4 left-4 px-3 py-1 bg-[#1a56db] text-white rounded-full text-xs font-semibold",
										children: "Présentiel"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-6",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-bold text-gray-900",
										children: "Cours en centre (Jour & Soir)"
									}), /* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" }), "Centres équipés à Douala (Yassa), Yaoundé (Nlongkak) et Bafoussam"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" }), "Pédagogie active 100% pratique sur matériel réel"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" }), "Préparation aux diplômes nationaux (DQP) et attestations"]
											})
										]
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-3xl overflow-hidden border border-gray-100",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-48 overflow-hidden",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/assets/images/online.webp",
										alt: "Formation en ligne professionnelle au Cameroun - CAB Informatique",
										className: "w-full h-full object-cover",
										loading: "lazy"
									}), /* @__PURE__ */ jsx("div", {
										className: "absolute top-4 left-4 px-3 py-1 bg-[#d21f2f] text-white rounded-full text-xs font-semibold",
										children: "En ligne"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-6",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-bold text-gray-900",
										children: "Formations & Certifications En Ligne"
									}), /* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" }), "Plateforme e-learning accessible 24h/24 au Cameroun et à l'international"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" }), "Apprenez à votre rythme avec accompagnement personnalisé"]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2 text-sm text-gray-600",
												children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4 text-[#d21f2f] mt-0.5 shrink-0" }), "Validation des acquis et certification officielle à distance"]
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
								className: "inline-flex items-center gap-2 px-8 py-4 bg-[#1a56db] text-white rounded-full font-semibold hover:bg-[#0d2a63] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
								children: ["Découvrir le catalogue des formations", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs(RevealSection, {
				as: "section",
				className: "py-20 relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(135deg, #0d2a63, #1a56db)" }
				}), /* @__PURE__ */ jsx("div", {
					className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-12 items-center",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold tracking-wider mb-4",
								children: "FORMATION EN LIGNE À DOUALA & CAMEROUN"
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "text-3xl md:text-4xl font-extrabold text-white leading-tight",
								children: ["Développez vos compétences avec nos formations ", /* @__PURE__ */ jsx("span", {
									className: "text-white/90",
									children: "100 % à distance"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/80 mt-4 leading-relaxed",
								children: "Que vous soyez à Douala, Yaoundé, Garoua ou à l'étranger, accédez aux cours pratiques CAB Informatique sur notre plateforme e-learning."
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mt-6 space-y-3",
								children: [
									"✅ Cours interactifs accessibles 24h/24 et 7j/7",
									"✅ Projets pratiques, études de cas et travaux guidés",
									"✅ Suivi individuel par des instructeurs qualifiés",
									"✅ Attestation et certification de fin de parcours"
								].map((item, index) => /* @__PURE__ */ jsxs("li", {
									className: "text-white/80 text-sm flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-white font-bold",
										children: "•"
									}), item]
								}, index))
							}),
							/* @__PURE__ */ jsxs(Link, {
								href: "/formations#enligne",
								className: "inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-[#1a56db] rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
								children: ["Explorer les formations en ligne", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4" })]
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("div", {
								className: "w-full max-w-sm aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8",
								children: /* @__PURE__ */ jsx("img", {
									src: "/assets/images/formation_en_ligne.webp",
									alt: "Plateforme de formation en ligne CAB Informatique Cameroun",
									className: "w-full h-full object-contain"
								})
							})
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", { className: "h-12 bg-white" }),
			/* @__PURE__ */ jsxs(RevealSection, {
				as: "section",
				className: "py-20 relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(135deg, #1a56db, #0d2a63)" }
				}), /* @__PURE__ */ jsx("div", {
					className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-12 items-center",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold tracking-wider mb-4",
								children: "CERTIFICATION PROFESSIONNELLE EN LIGNE"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl md:text-4xl font-extrabold text-white",
								children: "Faites certifier votre expérience professionnelle"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/80 mt-4 leading-relaxed",
								children: "Vous exercez déjà en infographie, secrétariat, comptabilité ou maintenance sans diplôme officiel ? Valorisez vos compétences sur le marché du travail grâce à nos certifications en ligne reconnues."
							}),
							/* @__PURE__ */ jsxs(Link, {
								href: "/certification",
								className: "inline-flex items-center gap-2 mt-6 px-8 py-4 bg-white text-[#1a56db] rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
								children: ["Obtenir ma certification", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4" })]
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("div", {
								className: "w-full max-w-sm aspect-square rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8",
								children: /* @__PURE__ */ jsx("img", {
									src: "/assets/images/certif.webp",
									alt: "Certification professionnelle en ligne CAB Informatique",
									className: "w-full h-full object-contain"
								})
							})
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				id: "activites",
				className: "py-20 bg-white scroll-mt-24 overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsx(RevealSection, {
						className: "flex items-end justify-between mb-10 flex-wrap gap-4",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "VIE DU CENTRE & ÉVÉNEMENTS"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-gray-900",
							children: "Actualités & Séminaires CAB Informatique"
						})] })
					}), /* @__PURE__ */ jsx("div", {
						className: "relative",
						children: staticActivities.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "text-center py-12",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-gray-500",
								children: "Aucune activité programmée pour le moment."
							})
						}) : /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx("div", {
								ref: activityTrackRef,
								onScroll: handleActivityScroll,
								className: "flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar lg:overflow-x-hidden",
								children: staticActivities.map((activity, index) => {
									const isCenter = index === currentActivityIndex;
									const hasLien = activity.lien && activity.lien.trim() !== "";
									return /* @__PURE__ */ jsx("div", {
										"data-activity-slot": true,
										className: "flex-shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] snap-center transition-all duration-500 ease-in-out",
										style: {
											transform: isCenter ? "scale(1)" : "scale(0.82)",
											opacity: isCenter ? 1 : .55
										},
										children: /* @__PURE__ */ jsxs("div", {
											className: "bg-white rounded-2xl overflow-hidden border transition-all duration-500",
											style: {
												borderColor: isCenter ? "#1a56db" : "#f3f4f6",
												boxShadow: isCenter ? "0 20px 25px -5px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.05)"
											},
											children: [/* @__PURE__ */ jsx("img", {
												src: activity.image_url,
												alt: `${activity.title} - CAB Informatique`,
												className: "w-full h-48 object-cover",
												loading: "lazy"
											}), /* @__PURE__ */ jsxs("div", {
												className: `p-5 transition-all duration-500 ${isCenter ? "bg-white" : "bg-gray-50"}`,
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-xs font-semibold text-[#1a56db] bg-blue-50 px-2 py-1 rounded-full",
														children: activity.tag
													}),
													/* @__PURE__ */ jsx("h3", {
														className: `font-bold text-base mt-2 transition-colors duration-500 ${isCenter ? "text-gray-900" : "text-gray-600"}`,
														children: activity.title
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-xs text-gray-500 mt-1",
														children: activity.date
													}),
													/* @__PURE__ */ jsx("p", {
														className: `text-sm mt-2 line-clamp-2 transition-colors duration-500 ${isCenter ? "text-gray-700" : "text-gray-500"}`,
														children: activity.excerpt
													}),
													hasLien && /* @__PURE__ */ jsx("div", {
														className: "mt-3",
														children: /* @__PURE__ */ jsxs("a", {
															href: activity.lien,
															target: "_blank",
															rel: "noopener noreferrer",
															className: "inline-flex items-center gap-1 px-4 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-medium hover:bg-[#0d2a63] transition-colors",
															children: ["Voir", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-3 h-3" })]
														})
													})
												]
											})]
										})
									}, activity.id);
								})
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: prevActivity,
								className: "hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]",
								"aria-label": "Événement précédent",
								children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-5 h-5 text-gray-600" })
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: nextActivity,
								className: "hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#1a56db]",
								"aria-label": "Événement suivant",
								children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-5 h-5 text-gray-600" })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center gap-2 mt-6",
								children: staticActivities.map((_, index) => /* @__PURE__ */ jsx("button", {
									onClick: () => goToActivity(index),
									className: "rounded-full transition-all duration-300",
									style: {
										width: index === currentActivityIndex ? "2rem" : "0.625rem",
										height: "0.625rem",
										backgroundColor: index === currentActivityIndex ? "#1a56db" : "#d1d5db"
									},
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
				className: "py-20 bg-gray-50",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block px-4 py-1.5 bg-red-50 text-[#d21f2f] rounded-full text-xs font-semibold tracking-wider mb-4",
							children: "AVIS & TÉMOIGNAGES"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-gray-900",
							children: "Ce que disent nos anciens étudiants"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-3 gap-6",
						children: [
							/* @__PURE__ */ jsx(RevealSection, {
								delay: 0,
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 mb-4",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-12 h-12 rounded-full bg-blue-100 text-[#1a56db] flex items-center justify-center font-bold text-lg",
												children: "MN"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-semibold text-gray-900",
												children: "Marie Ngo"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: "Secrétariat Comptable — Douala (2025)"
											})] })]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-600 leading-relaxed",
											children: "\"Excellente formation pratique chez CAB Informatique Yassa. Grâce à la maîtrise des logiciels de comptabilité, j'ai décroché mon poste d'assistante.\""
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex gap-0.5 mt-3",
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-[#f2b705] fill-[#f2b705]" }, i))
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(RevealSection, {
								delay: 100,
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 mb-4",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-12 h-12 rounded-full bg-red-100 text-[#d21f2f] flex items-center justify-center font-bold text-lg",
												children: "KE"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-semibold text-gray-900",
												children: "Kevin Ebogo"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: "Réseaux & Maintenance — Yaoundé (2024)"
											})] })]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-600 leading-relaxed",
											children: "\"La formation à Nlongkak est 100% axée sur le matériel informatique. Après 8 mois de formation chez CAB, j'ai ouvert mon propre atelier à Yaoundé.\""
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex gap-0.5 mt-3",
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-[#f2b705] fill-[#f2b705]" }, i))
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(RevealSection, {
								delay: 200,
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 mb-4",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg",
												children: "AM"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "font-semibold text-gray-900",
												children: "Aïcha Moumouni"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: "Infographie 2D — En Ligne (2025)"
											})] })]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-600 leading-relaxed",
											children: "\"J'ai suivi la formation en ligne depuis Bafoussam. Les formateurs sont disponibles et la pratique sur Photoshop/Illustrator m'a permis de devenir freelance.\""
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex gap-0.5 mt-3",
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-[#f2b705] fill-[#f2b705]" }, i))
										})
									]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20 bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs(RevealSection, {
						className: "text-center max-w-2xl mx-auto mb-12",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "inline-block px-4 py-1.5 bg-blue-50 text-[#1a56db] rounded-full text-xs font-semibold tracking-wider mb-4",
								children: "NOS CENTRES DE FORMATION AU CAMEROUN"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl md:text-4xl font-extrabold text-gray-900",
								children: "Campus CAB Informatique à Douala, Yaoundé & Bafoussam"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-500 mt-3",
								children: "Des locaux modernes, des salles informatiques climatisées et une équipe pédagogique à votre écoute."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid md:grid-cols-3 gap-6",
						children: campus.map((c, i) => /* @__PURE__ */ jsx(RevealSection, {
							delay: i * 100,
							children: /* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full hover:shadow-xl transition-all duration-300",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 mb-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-100 text-[#1a56db] rounded-full text-xs font-bold",
											children: c.ville
										}), /* @__PURE__ */ jsx("span", {
											className: "text-sm font-semibold text-gray-700",
											children: c.nom
										})]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-gray-600 mb-3",
										children: ["📍 ", c.adresse]
									}),
									/* @__PURE__ */ jsxs("a", {
										href: `tel:${c.tel.replace(/\s/g, "")}`,
										className: "block text-sm text-gray-500 hover:text-[#1a56db] transition-colors",
										children: ["📞 ", c.tel]
									}),
									/* @__PURE__ */ jsx("a", {
										href: c.mapsUrl,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-block mt-3 text-xs font-medium text-[#1a56db] hover:underline",
										children: "🗺️ Localiser le campus sur Google Maps"
									})
								]
							})
						}, c.ville))
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "py-20 relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(135deg, #d21f2f, #b01a26)" }
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-extrabold text-white",
							children: "Inscrivez-vous dès aujourd'hui chez CAB Informatique"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-white/80 mt-3 max-w-xl mx-auto",
							children: "Rejoignez le réseau des diplômés du centre de référence au Cameroun."
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/formations",
							className: "inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-[#d21f2f] rounded-full font-bold text-lg hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300",
							children: ["Consulter les formations disponibles", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-5 h-5" })]
						})
					]
				})]
			})
		] })
	] });
}
//#endregion
export { Home as default };

//# sourceMappingURL=Home-BzJ599j7.js.map