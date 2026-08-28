import { t as PublicLayout } from "./PublicLayout-DhlCuZ4y.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { AcademicCapIcon, ArrowRightIcon, BriefcaseIcon, CakeIcon, CheckCircleIcon, ClockIcon, ComputerDesktopIcon, CurrencyDollarIcon, EnvelopeIcon, HeartIcon, MapPinIcon, PhoneIcon, SignalIcon, Squares2X2Icon, TruckIcon, UserIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Formations.tsx
var poles = [
	{
		slug: "gestion",
		label: "Techniques Admin. & Comptables",
		icon: BriefcaseIcon,
		color: "#153B62"
	},
	{
		slug: "paramedical",
		label: "Paramédical & Santé",
		icon: HeartIcon,
		color: "#E13A4B"
	},
	{
		slug: "informatique",
		label: "Génie Informatique",
		icon: ComputerDesktopIcon,
		color: "#165DF3"
	},
	{
		slug: "logistique",
		label: "Logistique & Transport",
		icon: TruckIcon,
		color: "#6FA30E"
	},
	{
		slug: "hotellerie",
		label: "Hôtellerie & Restauration",
		icon: CakeIcon,
		color: "#FD7D0F"
	}
];
var ACTION_COLOR = "#FD7D0F";
var ACTION_GRADIENT = "linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)";
function Formations({ formationsEnLigne, formationsPresentiel }) {
	const { url } = usePage();
	const getInitialTab = () => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash;
			if (hash === "#enligne") return "enligne";
			if (hash === "#presentiel") return "presentiel";
		}
		return "presentiel";
	};
	const getInitialPole = () => {
		if (typeof window !== "undefined") {
			const p = new URLSearchParams(window.location.search).get("pole");
			if (p && poles.some((pole) => pole.slug === p)) return p;
		}
		return "tous";
	};
	const [activeTab, setActiveTab] = useState(getInitialTab);
	const [activePole, setActivePole] = useState(getInitialPole);
	const [selectedFormation, setSelectedFormation] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [inscriptionModalOpen, setInscriptionModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [formData, setFormData] = useState({
		nom_complet: "",
		email: "",
		telephone: "",
		ville: "",
		formation_id: "",
		formation_nom: ""
	});
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		if (typeof window !== "undefined") window.location.hash = tab;
	};
	useEffect(() => {
		const handleHashChange = () => {
			if (typeof window !== "undefined") {
				const hash = window.location.hash;
				if (hash === "#enligne") setActiveTab("enligne");
				else if (hash === "#presentiel") setActiveTab("presentiel");
			}
		};
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);
	const openModal = (formation) => {
		const scrollY = window.scrollY;
		const formationData = {
			...formation,
			debouches: formation.debouches || [],
			programme: formation.programme || []
		};
		setSelectedFormation(formationData);
		setModalOpen(true);
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";
	};
	const closeModal = () => {
		const scrollY = parseInt(document.body.style.top || "0") * -1;
		setModalOpen(false);
		setSelectedFormation(null);
		document.body.style.overflow = "";
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.width = "";
		if (scrollY > 0) window.scrollTo(0, scrollY);
	};
	const closeInscriptionModal = () => {
		const scrollY = parseInt(document.body.style.top || "0") * -1;
		setInscriptionModalOpen(false);
		setSubmitSuccess(false);
		setSubmitError(null);
		document.body.style.overflow = "";
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.width = "";
		if (scrollY > 0) window.scrollTo(0, scrollY);
	};
	const openInscriptionModal = (formation) => {
		var _formation$id;
		closeModal();
		setFormData({
			nom_complet: "",
			email: "",
			telephone: "",
			ville: "",
			formation_id: ((_formation$id = formation.id) === null || _formation$id === void 0 ? void 0 : _formation$id.toString()) || "",
			formation_nom: formation.title || formation.name || ""
		});
		setSubmitSuccess(false);
		setSubmitError(null);
		setInscriptionModalOpen(true);
		const scrollY = window.scrollY;
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";
	};
	const handleInscriptionSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitError(null);
		if (!formData.nom_complet.trim()) {
			setSubmitError("Veuillez entrer votre nom complet");
			setIsSubmitting(false);
			return;
		}
		if (!formData.telephone.trim()) {
			setSubmitError("Veuillez entrer votre numéro de téléphone");
			setIsSubmitting(false);
			return;
		}
		try {
			var _document$querySelect;
			const data = await (await fetch("/pre-inscription", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": ((_document$querySelect = document.querySelector("meta[name=\"csrf-token\"]")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute("content")) || ""
				},
				body: JSON.stringify({
					nom_complet: formData.nom_complet,
					email: formData.email,
					telephone: formData.telephone,
					ville: formData.ville,
					formation: formData.formation_nom,
					formation_id: formData.formation_id
				})
			})).json();
			if (data.success) {
				setIsSubmitting(false);
				setSubmitSuccess(true);
				setTimeout(() => closeInscriptionModal(), 3e3);
			} else {
				setIsSubmitting(false);
				setSubmitError(data.message || "Une erreur est survenue");
			}
		} catch {
			setIsSubmitting(false);
			setSubmitError("Une erreur est survenue. Veuillez réessayer.");
		}
	};
	const filteredPresentiel = useMemo(() => {
		if (activePole === "tous") return formationsPresentiel || [];
		return (formationsPresentiel || []).filter((f) => !f.pole || f.pole === activePole);
	}, [formationsPresentiel, activePole]);
	const filteredEnLigne = useMemo(() => {
		if (activePole === "tous") return formationsEnLigne || [];
		return (formationsEnLigne || []).filter((f) => !f.pole || f.pole === activePole);
	}, [formationsEnLigne, activePole]);
	const formationNames = (formationsEnLigne || []).map((f) => f.name).join(", ");
	const presentielNames = (formationsPresentiel || []).map((f) => f.title).join(", ");
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Catalogue des formations — Institut Gamaliel",
		description: "Formations professionnelles certifiantes à Douala (Logpom) et en ligne : Paramédical & Santé, Informatique & Digital, Gestion & Management, Hôtellerie & Métiers de bouche.",
		itemListElement: [...(formationsPresentiel || []).map((f, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Course",
				name: f.title,
				description: f.description,
				courseMode: "onsite",
				inLanguage: "fr",
				provider: {
					"@type": "EducationalOrganization",
					name: "Institut de Formation Professionnelle Gamaliel",
					sameAs: "https://institutgamaliel.com"
				},
				offers: {
					"@type": "Offer",
					price: f.price ? f.price.replace(/\D/g, "") : "0",
					priceCurrency: "XAF",
					availability: "https://schema.org/InStock"
				}
			}
		})), ...(formationsEnLigne || []).map((f, index) => ({
			"@type": "ListItem",
			position: (formationsPresentiel || []).length + index + 1,
			item: {
				"@type": "Course",
				name: f.name,
				description: f.description,
				courseMode: "online",
				inLanguage: "fr",
				provider: {
					"@type": "EducationalOrganization",
					name: "Institut de Formation Professionnelle Gamaliel",
					sameAs: "https://institutgamaliel.com"
				},
				offers: {
					"@type": "Offer",
					price: f.frais ? f.frais.toString() : "0",
					priceCurrency: "XAF",
					availability: "https://schema.org/InStock"
				}
			}
		}))]
	};
	const hasPresentiel = filteredPresentiel.length > 0;
	const hasEnLigne = filteredEnLigne.length > 0;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: "Nos Formations — Institut Gamaliel | Douala & En Ligne" }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Catalogue des formations de l'Institut Gamaliel à Douala (Logpom) et en ligne : Paramédical, Informatique & Digital, Gestion, Hôtellerie. Diplômes CQP, DQP, BTS."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: `formation professionnelle Douala, Institut Gamaliel, CQP DQP BTS, ${formationNames}, ${presentielNames}, formation paramédicale Douala, formation informatique Douala`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: "https://institutgamaliel.com/formations"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: "Nos Formations — Institut Gamaliel"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: "4 pôles de formation, en présentiel à Logpom ou 100% en ligne. Diplômes reconnus."
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
			content: "https://institutgamaliel.com/formations"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: "Nos Formations — Institut Gamaliel"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: "Formations en présentiel à Douala ou en ligne. Diplômes CQP, DQP, BTS."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: "https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		})
	] }), /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-14",
			children: [
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[100px]" }),
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-32 -right-10 w-[26rem] h-[26rem] rounded-full bg-gamaliel-orange/20 blur-[110px]" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center animate-fade-in",
						style: { animationDelay: "0ms" },
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85",
								children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4 text-gamaliel-green" }), "5 pôles · CQP · DQP · BTS"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight",
								children: [
									"Nos",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-clip-text text-transparent",
										style: { backgroundImage: ACTION_GRADIENT },
										children: "Formations"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg text-white/70 max-w-2xl mx-auto",
								children: "Choisissez votre filière, en présentiel au centre de Logpom (Douala) ou en ligne, à votre rythme."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative mt-9 inline-flex rounded-full p-1 bg-white/[0.08] border border-white/10",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out",
										style: {
											background: ACTION_GRADIENT,
											width: "calc(50% - 4px)",
											left: activeTab === "presentiel" ? "4px" : "calc(50% + 0px)"
										}
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#presentiel",
										onClick: (e) => {
											e.preventDefault();
											handleTabChange("presentiel");
										},
										className: `relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === "presentiel" ? "text-white" : "text-white/70 hover:text-white"}`,
										children: "En présentiel"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#enligne",
										onClick: (e) => {
											e.preventDefault();
											handleTabChange("enligne");
										},
										className: `relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === "enligne" ? "text-white" : "text-white/70 hover:text-white"}`,
										children: "En ligne"
									})
								]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap justify-center gap-2.5",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setActivePole("tous"),
							className: `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activePole === "tous" ? "bg-white text-gamaliel-navy-deep border-white" : "text-white/70 border-white/20 hover:border-white/50 hover:text-white"}`,
							children: [/* @__PURE__ */ jsx(Squares2X2Icon, { className: "w-4 h-4" }), "Toutes les filières"]
						}), poles.map((pole) => {
							const Icon = pole.icon;
							const active = activePole === pole.slug;
							return /* @__PURE__ */ jsxs("button", {
								onClick: () => setActivePole(pole.slug),
								className: "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300",
								style: active ? {
									backgroundColor: pole.color,
									borderColor: pole.color,
									color: "#fff"
								} : {
									borderColor: "rgba(255,255,255,0.2)",
									color: "rgba(255,255,255,0.7)"
								},
								children: [/* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }), pole.label]
							}, pole.slug);
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 bg-gamaliel-paper",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: activeTab === "presentiel" ? /* @__PURE__ */ jsxs("div", {
					id: "presentiel",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-2xl font-bold text-gamaliel-navy-deep mb-8 text-center sm:text-left",
						children: "Formations en présentiel — Centre de Logpom, Douala"
					}), !hasPresentiel ? /* @__PURE__ */ jsx(EmptyState, { label: "Aucune formation en présentiel disponible pour ce filtre." }) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: filteredPresentiel.map((formation, i) => {
							const poleInfo = poles.find((p) => p.slug === formation.pole);
							const accent = (poleInfo === null || poleInfo === void 0 ? void 0 : poleInfo.color) || ACTION_COLOR;
							const PoleIcon = poleInfo === null || poleInfo === void 0 ? void 0 : poleInfo.icon;
							return /* @__PURE__ */ jsxs("article", {
								className: "group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col opacity-0 animate-slide-up",
								style: { animationDelay: `${i % 6 * 60}ms` },
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-1",
										style: { backgroundColor: accent }
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative h-52 overflow-hidden",
										children: [
											/* @__PURE__ */ jsx("img", {
												src: formation.image,
												alt: `Formation ${formation.title} en présentiel — Institut Gamaliel`,
												className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
												loading: "lazy",
												onError: (e) => {
													e.target.src = "/assets/images/placeholder.jpg";
												}
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute inset-0",
												style: { background: "linear-gradient(180deg, rgba(13,40,68,0) 55%, rgba(13,40,68,0.55) 100%)" }
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gamaliel-navy-deep shadow-sm",
												children: formation.price
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm",
												style: { backgroundColor: accent },
												children: [PoleIcon ? /* @__PURE__ */ jsx(PoleIcon, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx("span", { children: formation.icon }), formation.abbreviation]
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "p-6 flex flex-col flex-1",
										children: [
											/* @__PURE__ */ jsx("h3", {
												className: "font-display text-lg font-bold text-gamaliel-navy-deep mb-2 leading-snug",
												children: formation.title
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-4 mb-3 text-xs font-medium text-gamaliel-navy/50",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ jsx(ClockIcon, {
														className: "w-3.5 h-3.5",
														style: { color: accent }
													}), formation.duration]
												}), formation.diplome && /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ jsx(AcademicCapIcon, {
														className: "w-3.5 h-3.5",
														style: { color: accent }
													}), formation.diplome]
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-gamaliel-navy/60 line-clamp-2 mb-5",
												children: formation.description
											}),
											/* @__PURE__ */ jsxs("button", {
												onClick: () => openModal({
													...formation,
													type: "presentiel"
												}),
												className: "mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group/btn",
												style: { backgroundColor: accent },
												onMouseEnter: (e) => e.currentTarget.style.filter = "brightness(0.9)",
												onMouseLeave: (e) => e.currentTarget.style.filter = "brightness(1)",
												children: ["Découvrir le programme", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform" })]
											})
										]
									})
								]
							}, formation.id);
						})
					})]
				}) : /* @__PURE__ */ jsxs("div", {
					id: "enligne",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-2xl font-bold text-gamaliel-navy-deep mb-8 text-center sm:text-left",
						children: "Formations en ligne"
					}), !hasEnLigne ? /* @__PURE__ */ jsx(EmptyState, { label: "Aucune formation en ligne disponible pour ce filtre." }) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: filteredEnLigne.map((formation, i) => {
							const poleInfo = poles.find((p) => p.slug === formation.pole);
							const accent = (poleInfo === null || poleInfo === void 0 ? void 0 : poleInfo.color) || ACTION_COLOR;
							poleInfo === null || poleInfo === void 0 || poleInfo.icon;
							return /* @__PURE__ */ jsxs("article", {
								className: "group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col opacity-0 animate-slide-up",
								style: { animationDelay: `${i % 6 * 60}ms` },
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-1",
										style: { backgroundColor: accent }
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative h-52 overflow-hidden",
										children: [
											/* @__PURE__ */ jsx("img", {
												src: formation.image_url || "/assets/images/placeholder.jpg",
												alt: `Formation en ligne ${formation.name || ""} — Institut Gamaliel`,
												className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
												loading: "lazy",
												onError: (e) => {
													e.target.src = "/assets/images/placeholder.jpg";
												}
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute inset-0",
												style: { background: "linear-gradient(180deg, rgba(13,40,68,0) 55%, rgba(13,40,68,0.55) 100%)" }
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gamaliel-navy-deep shadow-sm",
												children: formation.frais_formatted || "FCFA"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm bg-gamaliel-green-deep",
												children: [/* @__PURE__ */ jsx(SignalIcon, { className: "w-3.5 h-3.5" }), formation.abbreviation || "En ligne"]
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "p-6 flex flex-col flex-1",
										children: [
											/* @__PURE__ */ jsx("h3", {
												className: "font-display text-lg font-bold text-gamaliel-navy-deep mb-2 leading-snug",
												children: formation.name || "Formation en ligne"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-4 mb-3 text-xs font-medium text-gamaliel-navy/50",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ jsx(ClockIcon, {
														className: "w-3.5 h-3.5",
														style: { color: accent }
													}), formation.duration || "À votre rythme"]
												}), /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ jsx(AcademicCapIcon, {
														className: "w-3.5 h-3.5",
														style: { color: accent }
													}), formation.diplome || "Certification"]
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-gamaliel-navy/60 line-clamp-2 mb-5",
												children: formation.description || "Description non disponible"
											}),
											/* @__PURE__ */ jsxs("button", {
												onClick: () => openModal({
													...formation,
													type: "enligne"
												}),
												className: "mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group/btn",
												style: { backgroundColor: accent },
												onMouseEnter: (e) => e.currentTarget.style.filter = "brightness(0.9)",
												onMouseLeave: (e) => e.currentTarget.style.filter = "brightness(1)",
												children: ["Voir le programme complet", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform" })]
											})
										]
									})
								]
							}, formation.id);
						})
					})]
				})
			})
		}),
		modalOpen && selectedFormation && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm animate-fade-in",
			style: { animationDuration: "0.2s" },
			onClick: closeModal,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "sticky top-0 bg-white border-b border-gamaliel-navy/5 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 rounded-xl bg-gamaliel-orange/10 text-gamaliel-orange flex items-center justify-center text-2xl",
							children: selectedFormation.icon || "📚"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-gamaliel-navy-deep notranslate",
							children: selectedFormation.title || selectedFormation.name
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeModal,
						className: "p-2 hover:bg-gamaliel-navy/5 rounded-full transition-colors text-gamaliel-navy/40 hover:text-gamaliel-navy",
						"aria-label": "Fermer la boîte de dialogue",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6 space-y-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "rounded-xl overflow-hidden",
							children: /* @__PURE__ */ jsx("img", {
								src: selectedFormation.image || selectedFormation.image_url || "/assets/images/placeholder.jpg",
								alt: `Détails formation ${selectedFormation.title || selectedFormation.name} — Institut Gamaliel`,
								className: "w-full h-64 object-cover",
								onError: (e) => {
									e.target.src = "/assets/images/placeholder.jpg";
								}
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gamaliel-paper rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-gamaliel-orange mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/50",
											children: "Durée"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gamaliel-navy-deep",
											children: selectedFormation.duration || "Non définie"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gamaliel-paper rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gamaliel-orange mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/50",
											children: "Diplôme"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gamaliel-navy-deep",
											children: selectedFormation.diplome || "Non défini"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gamaliel-paper rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(CurrencyDollarIcon, { className: "w-5 h-5 text-gamaliel-orange mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/50",
											children: "Frais"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gamaliel-navy-deep",
											children: selectedFormation.price || selectedFormation.frais_formatted || "0 FCFA"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gamaliel-navy-deep mb-2",
								children: "Description de la formation"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gamaliel-navy/70 leading-relaxed",
								children: selectedFormation.description || "Description non disponible"
							})]
						}),
						selectedFormation.programme && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gamaliel-navy-deep mb-2",
								children: "Programme d'études"
							}), Array.isArray(selectedFormation.programme) ? /* @__PURE__ */ jsx("ul", {
								className: "grid grid-cols-1 gap-1.5",
								children: selectedFormation.programme.map((item, index) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-2 text-sm text-gamaliel-navy/70",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-gamaliel-orange mt-0.5",
										children: "▸"
									}), item]
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gamaliel-navy/70 leading-relaxed whitespace-pre-line",
								children: selectedFormation.programme
							})]
						}),
						selectedFormation.debouches && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gamaliel-navy-deep mb-2",
								children: "Débouchés professionnels"
							}), Array.isArray(selectedFormation.debouches) ? /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: selectedFormation.debouches.map((item, index) => /* @__PURE__ */ jsx("span", {
									className: "px-3 py-1.5 bg-gamaliel-green/20 text-gamaliel-green-deep rounded-full text-sm font-medium",
									children: item
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gamaliel-navy/70 leading-relaxed whitespace-pre-line",
								children: selectedFormation.debouches
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-gamaliel-navy/5",
							children: [
								selectedFormation.lien_externe && selectedFormation.lien_label && /* @__PURE__ */ jsx("a", {
									href: selectedFormation.lien_externe,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex-1 text-center px-6 py-3 bg-gamaliel-navy/5 text-gamaliel-navy rounded-xl font-semibold hover:bg-gamaliel-navy/10 transition-colors notranslate",
									children: selectedFormation.lien_label
								}),
								selectedFormation.type === "presentiel" ? /* @__PURE__ */ jsxs("button", {
									onClick: () => openInscriptionModal(selectedFormation),
									className: "flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2",
									style: {
										background: ACTION_GRADIENT,
										boxShadow: "0 10px 20px -6px rgba(225,58,75,0.4)"
									},
									children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "Je m'inscris"]
								}) : /* @__PURE__ */ jsxs(Link, {
									href: `/preinscription?formation=${selectedFormation.id}&type=formation`,
									className: "flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2",
									style: {
										background: ACTION_GRADIENT,
										boxShadow: "0 10px 20px -6px rgba(225,58,75,0.4)"
									},
									children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "Me pré-inscrire"]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: closeModal,
									className: "px-6 py-3 border-2 border-gamaliel-navy/10 rounded-xl font-semibold text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 transition-colors notranslate",
									children: "Fermer"
								})
							]
						})
					]
				})]
			})
		}, `modal-${selectedFormation.id || selectedFormation.title || Date.now()}`),
		inscriptionModalOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm animate-fade-in",
			style: { animationDuration: "0.2s" },
			onClick: closeInscriptionModal,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "sticky top-0 bg-white border-b border-gamaliel-navy/5 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-xl bg-gamaliel-green/20 text-gamaliel-green-deep flex items-center justify-center",
							children: /* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-gamaliel-navy-deep",
							children: "Inscription en présentiel"
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeInscriptionModal,
						className: "p-2 hover:bg-gamaliel-navy/5 rounded-full transition-colors text-gamaliel-navy/40 hover:text-gamaliel-navy",
						"aria-label": "Fermer la boîte de dialogue",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "p-6",
					children: submitSuccess ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 bg-gamaliel-green/20 rounded-full flex items-center justify-center mx-auto mb-4",
								children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-8 h-8 text-gamaliel-green-deep" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-bold text-gamaliel-navy-deep mb-2",
								children: "Inscription envoyée !"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-gamaliel-navy/60 text-sm",
								children: [
									"Votre demande d'inscription pour ",
									/* @__PURE__ */ jsx("strong", { children: formData.formation_nom }),
									" a été enregistrée. Notre équipe pédagogique vous contactera rapidement."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gamaliel-navy/30 text-xs mt-4",
								children: "Fermeture automatique..."
							})
						]
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: handleInscriptionSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gamaliel-navy/60",
								children: ["Inscription en présentiel pour la formation ", /* @__PURE__ */ jsx("strong", { children: formData.formation_nom })]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								value: formData.formation_id
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: ["Nom complet ", /* @__PURE__ */ jsx("span", {
									className: "text-gamaliel-red",
									children: "*"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.nom_complet,
									onChange: (e) => setFormData({
										...formData,
										nom_complet: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "Votre nom et prénom",
									required: true
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-gamaliel-navy/30 text-xs",
									children: "(Optionnel)"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsx("input", {
									type: "email",
									value: formData.email,
									onChange: (e) => setFormData({
										...formData,
										email: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "votre@email.com"
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: ["Téléphone ", /* @__PURE__ */ jsx("span", {
									className: "text-gamaliel-red",
									children: "*"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsx("input", {
									type: "tel",
									value: formData.telephone,
									onChange: (e) => setFormData({
										...formData,
										telephone: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "6XX XXX XXX",
									required: true
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: "Ville de résidence"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.ville,
									onChange: (e) => setFormData({
										...formData,
										ville: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "Douala, Yaoundé, Bafoussam..."
								})]
							})] }),
							submitError && /* @__PURE__ */ jsx("div", {
								className: "bg-gamaliel-red/10 border border-gamaliel-red/20 rounded-xl p-3",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gamaliel-red",
									children: submitError
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full flex items-center justify-center gap-2 py-3 px-4 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
								style: {
									background: ACTION_GRADIENT,
									boxShadow: "0 10px 20px -6px rgba(225,58,75,0.4)"
								},
								children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
									className: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ jsx("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4"
									}), /* @__PURE__ */ jsx("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), "Traitement en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "Valider mon inscription"] })
							})
						]
					})
				})]
			})
		})
	] })] });
}
function EmptyState({ label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center py-16",
		children: [
			/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-16 h-16 text-gamaliel-navy/15 mx-auto mb-4" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-gamaliel-navy/60 text-lg",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-gamaliel-navy/35 text-sm mt-2",
				children: "Essayez un autre filtre ou revenez plus tard."
			})
		]
	});
}
//#endregion
export { Formations as default };

//# sourceMappingURL=Formations-zWZoxNlk.js.map