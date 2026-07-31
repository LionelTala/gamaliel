import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, ArrowRightIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, UserIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Formations.tsx
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
	const [activeTab, setActiveTab] = useState(getInitialTab);
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
				setTimeout(() => {
					closeInscriptionModal();
				}, 3e3);
			} else {
				setIsSubmitting(false);
				setSubmitError(data.message || "Une erreur est survenue");
			}
		} catch {
			setIsSubmitting(false);
			setSubmitError("Une erreur est survenue. Veuillez réessayer.");
		}
	};
	const formationNames = (formationsEnLigne || []).map((f) => f.name).join(", ");
	const presentielNames = (formationsPresentiel || []).map((f) => f.title).join(", ");
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "Catalogue des Formations Professionnelles CAB Informatique",
		"description": "Formations professionnelles certifiantes à Douala, Yaoundé, Bafoussam et en ligne : Infographie, Secrétariat, Comptabilité, Maintenance informatique, Vidéosurveillance et Logistique.",
		"itemListElement": [...(formationsPresentiel || []).map((f, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"item": {
				"@type": "Course",
				"name": f.title,
				"description": f.description,
				"courseMode": "onsite",
				"inLanguage": "fr",
				"provider": {
					"@type": "EducationalOrganization",
					"name": "CAB Informatique",
					"sameAs": "https://cab-informatique.com"
				},
				"offers": {
					"@type": "Offer",
					"price": f.price ? f.price.replace(/\D/g, "") : "0",
					"priceCurrency": "XAF",
					"availability": "https://schema.org/InStock"
				}
			}
		})), ...(formationsEnLigne || []).map((f, index) => ({
			"@type": "ListItem",
			"position": (formationsPresentiel || []).length + index + 1,
			"item": {
				"@type": "Course",
				"name": f.name,
				"description": f.description,
				"courseMode": "online",
				"inLanguage": "fr",
				"provider": {
					"@type": "EducationalOrganization",
					"name": "CAB Informatique",
					"sameAs": "https://cab-informatique.com"
				},
				"offers": {
					"@type": "Offer",
					"price": f.frais ? f.frais.toString() : "0",
					"priceCurrency": "XAF",
					"availability": "https://schema.org/InStock"
				}
			}
		}))]
	};
	const hasPresentiel = formationsPresentiel && formationsPresentiel.length > 0;
	const hasEnLigne = formationsEnLigne && formationsEnLigne.length > 0;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: "Formations Professionnelles à Douala, Yaoundé, Bafoussam & En Ligne | CAB Informatique" }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Découvrez le catalogue de formations professionnelles CAB Informatique à Douala, Yaoundé, Bafoussam et en ligne. Formations 100% pratiques : Infographie 2D, Secrétariat Bureautique, Comptabilité, Maintenance & Réseaux, Vidéosurveillance. Diplôme DQP reconnu."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: `formation professionnelle Douala, centre de formation Yaoundé, formation Bafoussam, formation informatique Cameroun, ${formationNames}, ${presentielNames}, CAB Informatique, DQP Cameroun, formation infographie, formation comptabilité`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: "https://cab-informatique.com/formations"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: "Formations Professionnelles à Douala, Yaoundé, Bafoussam & En Ligne | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: "Catalogue complet des formations professionnelles certifiantes au Cameroun. Apprenez un métier d'avenir en présentiel ou à distance."
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
			content: "https://cab-informatique.com/formations"
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
			content: "Formations Professionnelles au Cameroun | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: "Formations pratiques en présentiel à Douala, Yaoundé, Bafoussam et en ligne. Diplômes reconnus."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		})
	] }), /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "relative pt-32 pb-16 text-white",
			style: { background: "linear-gradient(to right, #0a1f4d, #1a56db)" },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-5xl font-extrabold text-white",
							children: ["Nos ", /* @__PURE__ */ jsx("span", {
								className: "text-[#d21f2f]",
								children: "Formations"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-xl max-w-2xl mx-auto",
							style: { color: "rgba(255,255,255,0.85)" },
							children: "Choisissez votre filière et formez-vous en présentiel à Douala, Yaoundé, Bafoussam ou en ligne à votre rythme"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 inline-flex rounded-xl p-1",
							style: {
								backgroundColor: "rgba(255,255,255,0.1)",
								backdropFilter: "blur(4px)"
							},
							children: [/* @__PURE__ */ jsx("a", {
								href: "#presentiel",
								onClick: (e) => {
									e.preventDefault();
									handleTabChange("presentiel");
								},
								className: "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
								style: activeTab === "presentiel" ? {
									backgroundColor: "#ffffff",
									color: "#1a56db",
									boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
								} : { color: "rgba(255,255,255,0.8)" },
								children: "📍 Formations en Présentiel"
							}), /* @__PURE__ */ jsx("a", {
								href: "#enligne",
								onClick: (e) => {
									e.preventDefault();
									handleTabChange("enligne");
								},
								className: "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
								style: activeTab === "enligne" ? {
									backgroundColor: "#ffffff",
									color: "#1a56db",
									boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
								} : { color: "rgba(255,255,255,0.8)" },
								children: "💻 Formations en Ligne"
							})]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 bg-gray-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: activeTab === "presentiel" ? /* @__PURE__ */ jsxs("div", {
					id: "presentiel",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left",
						children: "Formations en présentiel à Douala, Yaoundé et Bafoussam"
					}), !hasPresentiel ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-16",
						children: [
							/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-lg",
								children: "Aucune formation en présentiel disponible pour le moment."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-400 text-sm mt-2",
								children: "Revenez plus tard pour découvrir nos formations."
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: formationsPresentiel.map((formation) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-48 overflow-hidden",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: formation.image,
										alt: `Formation ${formation.title} en présentiel à Douala Yaoundé Bafoussam - CAB Informatique`,
										className: "w-full h-full object-cover",
										loading: "lazy",
										onError: (e) => {
											e.target.src = "/assets/images/placeholder.jpg";
										}
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue",
										children: formation.price
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { children: formation.icon }), formation.abbreviation]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold text-gray-900 mb-1",
										children: formation.title
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-gray-500 mb-3",
										children: ["⏱️ Durée : ", formation.duration]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-600 line-clamp-2 mb-4",
										children: formation.description
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-1.5 mb-4",
										children: formation.tags.map((tag) => /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs",
											children: tag
										}, tag))
									})
								]
							})] }), /* @__PURE__ */ jsx("div", {
								className: "p-6 pt-0",
								children: /* @__PURE__ */ jsxs("button", {
									onClick: () => openModal({
										...formation,
										type: "presentiel"
									}),
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group",
									children: ["Découvrir le programme", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							})]
						}, formation.id))
					})]
				}) : /* @__PURE__ */ jsxs("div", {
					id: "enligne",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left",
						children: "Formations en ligne au Cameroun"
					}), !hasEnLigne ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-16",
						children: [
							/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-lg",
								children: "Aucune formation en ligne disponible pour le moment."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-400 text-sm mt-2",
								children: "Consultez nos formations en présentiel ou repassez plus tard."
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: formationsEnLigne.map((formation) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-48 overflow-hidden",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: formation.image_url || "/assets/images/placeholder.jpg",
										alt: `Formation en ligne ${formation.name || "CAB Informatique"}`,
										className: "w-full h-full object-cover",
										loading: "lazy",
										onError: (e) => {
											e.target.src = "/assets/images/placeholder.jpg";
										}
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue",
										children: formation.frais_formatted || "FCFA"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white",
										children: formation.abbreviation || "En Ligne"
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold text-gray-900 mb-1",
										children: formation.name || "Formation en ligne"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-gray-500 mb-3",
										children: ["⏱️ Durée : ", formation.duration || "À votre rythme"]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-600 line-clamp-2 mb-4",
										children: formation.description || "Description non disponible"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-1.5 mb-4",
										children: [/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium",
											children: formation.diplome || "Attestation / Certification"
										}), /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium",
											children: "E-Learning"
										})]
									})
								]
							})] }), /* @__PURE__ */ jsx("div", {
								className: "p-6 pt-0",
								children: /* @__PURE__ */ jsxs("button", {
									onClick: () => openModal({
										...formation,
										type: "enligne"
									}),
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group",
									children: ["Voir le programme complet", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							})]
						}, formation.id))
					})]
				})
			})
		}),
		modalOpen && selectedFormation && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
			onClick: closeModal,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center text-2xl",
							children: selectedFormation.icon || "📚"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-gray-900 notranslate",
							children: selectedFormation.title || selectedFormation.name
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeModal,
						className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600",
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
								alt: `Détails formation ${selectedFormation.title || selectedFormation.name} - CAB Informatique`,
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
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Durée"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.duration || "Non définie"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Diplôme"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.diplome || "Non défini"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(CurrencyDollarIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Frais"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.price || selectedFormation.frais_formatted || "0 FCFA"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📌 Description de la formation"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed",
								children: selectedFormation.description || "Description non disponible"
							})]
						}),
						selectedFormation.programme && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📋 Programme d'études"
							}), Array.isArray(selectedFormation.programme) ? /* @__PURE__ */ jsx("ul", {
								className: "grid grid-cols-1 gap-1.5",
								children: selectedFormation.programme.map((item, index) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-2 text-sm text-gray-600",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-cab-blue mt-0.5",
										children: "▸"
									}), item]
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
								children: selectedFormation.programme
							})]
						}),
						selectedFormation.debouches && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "🎯 Débouchés professionnels"
							}), Array.isArray(selectedFormation.debouches) ? /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: selectedFormation.debouches.map((item, index) => /* @__PURE__ */ jsx("span", {
									className: "px-3 py-1.5 bg-blue-50 text-cab-blue rounded-full text-sm font-medium",
									children: item
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
								children: selectedFormation.debouches
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100",
							children: [
								selectedFormation.lien_externe && selectedFormation.lien_label && /* @__PURE__ */ jsx("a", {
									href: selectedFormation.lien_externe,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors notranslate",
									children: selectedFormation.lien_label
								}),
								selectedFormation.type === "presentiel" ? /* @__PURE__ */ jsxs("button", {
									onClick: () => openInscriptionModal(selectedFormation),
									className: "flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2",
									style: {
										background: "linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))",
										boxShadow: "0 10px 15px -3px rgba(26,86,219,0.25)"
									},
									children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "📝 Je m'inscris"]
								}) : /* @__PURE__ */ jsxs(Link, {
									href: `/preinscription?formation=${selectedFormation.id}&type=formation`,
									className: "flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2",
									style: {
										background: "linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))",
										boxShadow: "0 10px 15px -3px rgba(26,86,219,0.25)"
									},
									children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "📝 Me pré-inscrire"]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: closeModal,
									className: "px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors notranslate",
									children: "Fermer"
								})
							]
						})
					]
				})]
			})
		}, `modal-${selectedFormation.id || selectedFormation.title || Date.now()}`),
		inscriptionModalOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
			onClick: closeInscriptionModal,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-gray-900",
							children: "Inscription en présentiel"
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeInscriptionModal,
						className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600",
						"aria-label": "Fermer la boîte de dialogue",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "p-6",
					children: submitSuccess ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",
								children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-8 h-8 text-green-600" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-bold text-gray-900 mb-2",
								children: "Inscription envoyée ! ✅"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-gray-600 text-sm",
								children: [
									"Votre demande d'inscription pour ",
									/* @__PURE__ */ jsx("strong", { children: formData.formation_nom }),
									" a été enregistrée. Notre équipe pédagogique vous contactera rapidement."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-400 text-xs mt-4",
								children: "Fermeture automatique..."
							})
						]
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: handleInscriptionSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-600",
								children: ["Inscription en présentiel pour la formation ", /* @__PURE__ */ jsx("strong", { children: formData.formation_nom })]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								value: formData.formation_id
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Nom complet ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.nom_complet,
									onChange: (e) => setFormData({
										...formData,
										nom_complet: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Votre nom et prénom",
									required: true
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-gray-400 text-xs",
									children: "(Optionnel)"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "email",
									value: formData.email,
									onChange: (e) => setFormData({
										...formData,
										email: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "votre@email.com"
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Téléphone ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "tel",
									value: formData.telephone,
									onChange: (e) => setFormData({
										...formData,
										telephone: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "6XX XXX XXX",
									required: true
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ville de résidence"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: formData.ville,
									onChange: (e) => setFormData({
										...formData,
										ville: e.target.value
									}),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Douala, Yaoundé, Bafoussam..."
								})]
							})] }),
							submitError && /* @__PURE__ */ jsx("div", {
								className: "bg-red-50 border border-red-200 rounded-xl p-3",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-red-600",
									children: submitError
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full flex items-center justify-center gap-2 py-3 px-4 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
								style: {
									background: "linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))",
									boxShadow: "0 10px 15px -3px rgba(26,86,219,0.25)"
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
//#endregion
export { Formations as default };

//# sourceMappingURL=Formations-BkzHbHg6.js.map