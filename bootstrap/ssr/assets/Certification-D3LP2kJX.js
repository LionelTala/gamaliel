import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, ArrowRightIcon, CheckBadgeIcon, ClockIcon, CurrencyDollarIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Certification.tsx
function Certification({ certifications }) {
	var _selectedCertificatio, _selectedCertificatio2;
	const [selectedCertification, setSelectedCertification] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const openModal = (certification) => {
		setSelectedCertification(certification);
		setModalOpen(true);
		document.body.style.overflow = "hidden";
	};
	const closeModal = () => {
		setModalOpen(false);
		document.body.style.overflow = "";
		setSelectedCertification(null);
	};
	const certTitles = (certifications || []).map((c) => c.titre).join(", ");
	const formationNames = (certifications || []).map((c) => {
		var _c$formation;
		return (_c$formation = c.formation) === null || _c$formation === void 0 ? void 0 : _c$formation.name;
	}).filter(Boolean).join(", ");
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "Certifications Professionnelles en Ligne CAB Informatique",
		"description": "Faites valider vos compétences avec nos certifications professionnelles 100% en ligne au Cameroun : Infographie, Secrétariat, Comptabilité, Maintenance, Vidéosurveillance.",
		"itemListElement": (certifications || []).map((c, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"item": {
				"@type": "Course",
				"name": c.titre,
				"description": c.description,
				"courseMode": "online",
				"inLanguage": "fr",
				"provider": {
					"@type": "EducationalOrganization",
					"name": "CAB Informatique",
					"sameAs": "https://cab-informatique.com"
				},
				"offers": {
					"@type": "Offer",
					"price": c.frais ? c.frais.toString() : "0",
					"priceCurrency": "XAF",
					"availability": "https://schema.org/InStock"
				},
				"educationalCredentialAwarded": {
					"@type": "EducationalOccupationalCredential",
					"name": "Certification professionnelle reconnue",
					"credentialCategory": "Certificate"
				}
			}
		}))
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: "Certifications Professionnelles en Ligne au Cameroun | CAB Informatique" }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Validez vos acquis et obtenez une certification professionnelle reconnue 100% en ligne au Cameroun. Certifications à distance en Infographie, Secrétariat, Comptabilité, Maintenance, Réseaux, Vidéosurveillance chez CAB Informatique."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: `certification en ligne Cameroun, certification professionnelle Douala, certification Yaoundé, examen en ligne, ${certTitles}, ${formationNames}, CAB Informatique, VAE Cameroun`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: "https://cab-informatique.com/certification"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: "Certifications Professionnelles en Ligne au Cameroun | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: "Validez vos compétences et obtenez une certification professionnelle officielle à distance. Formations certifiantes adaptées à votre rythme."
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
			content: "https://cab-informatique.com/certification"
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
			name: "twitter:creator",
			content: "@cabinfo"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: "Certifications Professionnelles en Ligne au Cameroun | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: "Faites valider vos compétences professionnelles en ligne avec CAB Informatique."
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
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-4",
							style: {
								backgroundColor: "rgba(255,255,255,0.1)",
								color: "rgba(255,255,255,0.9)",
								border: "1px solid rgba(255,255,255,0.1)"
							},
							children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-4 h-4" }), "Accréditation & Valorisation des compétences"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-5xl font-extrabold text-white",
							children: ["Certifications Professionnelles ", /* @__PURE__ */ jsx("span", {
								className: "text-[#d21f2f]",
								children: "En Ligne"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-xl max-w-2xl mx-auto",
							style: { color: "rgba(255,255,255,0.85)" },
							children: "Validez votre expérience professionnelle à distance et obtenez un certificat reconnu pour propulser votre carrière"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-wrap justify-center gap-4",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "px-4 py-2 rounded-full text-sm",
									style: {
										backgroundColor: "rgba(255,255,255,0.1)",
										color: "rgba(255,255,255,0.8)",
										border: "1px solid rgba(255,255,255,0.1)"
									},
									children: "🎓 100% à distance"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "px-4 py-2 rounded-full text-sm",
									style: {
										backgroundColor: "rgba(255,255,255,0.1)",
										color: "rgba(255,255,255,0.8)",
										border: "1px solid rgba(255,255,255,0.1)"
									},
									children: "⏱️ Apprentissage flexible"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "px-4 py-2 rounded-full text-sm",
									style: {
										backgroundColor: "rgba(255,255,255,0.1)",
										color: "rgba(255,255,255,0.8)",
										border: "1px solid rgba(255,255,255,0.1)"
									},
									children: "📜 Titre professionnel officiel"
								})
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 bg-gray-50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left",
					children: "Toutes nos certifications professionnelles disponibles à distance"
				}), certifications && certifications.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: certifications.map((certification) => {
						var _certification$format, _certification$format2;
						return /* @__PURE__ */ jsxs("article", {
							className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-48 overflow-hidden",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: certification.image_url || "/assets/images/placeholder.jpg",
										alt: `Certification en ligne ${certification.titre} - CAB Informatique Cameroun`,
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
										loading: "lazy",
										onError: (e) => {
											e.target.src = "/assets/images/placeholder.jpg";
										}
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue",
										children: certification.frais_formatted
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-3 h-3" }), ((_certification$format = certification.formation) === null || _certification$format === void 0 ? void 0 : _certification$format.abbreviation) || "Certification"]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex items-start justify-between mb-2",
										children: /* @__PURE__ */ jsx("h3", {
											className: "text-lg font-bold text-gray-900 line-clamp-1",
											children: certification.titre
										})
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-gray-500 mb-2",
										children: ["Filière : ", ((_certification$format2 = certification.formation) === null || _certification$format2 === void 0 ? void 0 : _certification$format2.name) || "Formation associée"]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-3 text-sm text-gray-500 mb-3",
										children: /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }),
												"⏱️ Durée : ",
												certification.duree
											]
										})
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-600 line-clamp-2 mb-4",
										children: certification.description
									})
								]
							})] }), /* @__PURE__ */ jsx("div", {
								className: "p-6 pt-0",
								children: /* @__PURE__ */ jsxs("button", {
									onClick: () => openModal(certification),
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group",
									children: ["Voir les détails & prérequis", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							})]
						}, certification.id);
					})
				}) : /* @__PURE__ */ jsxs("div", {
					className: "text-center py-16",
					children: [
						/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-lg",
							children: "Aucune certification disponible pour le moment."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-400 text-sm mt-2",
							children: "Revenez plus tard pour découvrir nos sessions d'examen en ligne."
						})
					]
				})]
			})
		}),
		modalOpen && selectedCertification && /* @__PURE__ */ jsx("div", {
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
							className: "w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center",
							children: /* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-6 h-6" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-gray-900 notranslate",
							children: selectedCertification.titre
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-gray-500",
							children: ["Filière : ", ((_selectedCertificatio = selectedCertification.formation) === null || _selectedCertificatio === void 0 ? void 0 : _selectedCertificatio.name) || "Formation associée"]
						})] })]
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
								src: selectedCertification.image_url || "/assets/images/placeholder.jpg",
								alt: `Détails certification ${selectedCertification.titre} - CAB Informatique`,
								className: "w-full h-56 object-cover",
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
											children: selectedCertification.duree || "Non définie"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(CurrencyDollarIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Frais d'évaluation"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedCertification.frais_formatted
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Formation"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: ((_selectedCertificatio2 = selectedCertification.formation) === null || _selectedCertificatio2 === void 0 ? void 0 : _selectedCertificatio2.abbreviation) || "-"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📌 Description de la certification"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed",
								children: selectedCertification.description || "Description non disponible"
							})]
						}),
						selectedCertification.prerequis && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📋 Prérequis recommandés"
							}), /* @__PURE__ */ jsx("div", {
								className: "bg-gray-50 rounded-xl p-4",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
									children: selectedCertification.prerequis
								})
							})]
						}),
						selectedCertification.contenu && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📚 Programme d'évaluation / Contenu"
							}), /* @__PURE__ */ jsx("div", {
								className: "bg-gray-50 rounded-xl p-4",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
									children: selectedCertification.contenu
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100",
							children: [
								selectedCertification.lien_externe && selectedCertification.lien_label && /* @__PURE__ */ jsx("a", {
									href: selectedCertification.lien_externe,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors notranslate",
									children: selectedCertification.lien_label
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: `/preinscription?certification=${selectedCertification.id}&type=certification`,
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
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
							children: /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-blue-700 flex items-start gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-blue-500",
									children: "ℹ️"
								}), "Cette certification est accessible 100% à distance depuis Douala, Yaoundé, Bafoussam ou partout ailleurs au Cameroun et à l'international."]
							})
						})
					]
				})]
			})
		}, `modal-${selectedCertification.id}`)
	] })] });
}
//#endregion
export { Certification as default };

//# sourceMappingURL=Certification-D3LP2kJX.js.map