import { t as PublicLayout } from "./PublicLayout-BWQi_JEN.js";
import { Head, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ChatBubbleLeftRightIcon, CheckCircleIcon, EnvelopeIcon, MapPinIcon, PaperAirplaneIcon, PhoneIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Contact.tsx
var ACTION_COLOR = "#6FA30E";
var ACTION_COLOR_HOVER = "#5C8A0B";
var WHATSAPP_URL = "https://wa.me/237696084048?text=" + encodeURIComponent("Bonjour, je souhaite avoir des informations sur l'Institut Gamaliel.");
var FACEBOOK_URL = "https://web.facebook.com/intitutgamaliel";
var PHONE_TEL = "tel:+237696084048";
var sujets = [
	"Informations sur une formation",
	"Admission / Pré-inscription",
	"Partenariat",
	"Autre"
];
function Contact() {
	const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
		nom: "",
		email: "",
		telephone: "",
		sujet: "",
		message: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/contact", {
			preserveScroll: true,
			onSuccess: () => reset("message")
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: "Contact — Institut Gamaliel | Douala" }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Contactez l'Institut Gamaliel à Douala (Logpom) : téléphone, WhatsApp, Facebook ou formulaire en ligne. Réponse rapide de notre équipe."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: "https://institutgamaliel.com/contact"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ContactPage",
				name: "Contact — Institut Gamaliel",
				url: "https://institutgamaliel.com/contact",
				about: {
					"@type": "EducationalOrganization",
					name: "Institut de Formation Professionnelle Gamaliel",
					telephone: "+237696084048",
					email: "info@institutgamaliel.com",
					address: {
						"@type": "PostalAddress",
						streetAddress: "Carrefour Andem, Logpom",
						addressLocality: "Douala",
						addressCountry: "CM"
					}
				}
			})
		})
	] }), /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-16",
		children: [
			/* @__PURE__ */ jsx("div", { className: "hidden md:block pointer-events-none absolute -top-24 -left-16 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[60px]" }),
			/* @__PURE__ */ jsx("div", { className: "hidden md:block pointer-events-none absolute -bottom-28 -right-16 w-80 h-80 rounded-full bg-gamaliel-blue/10 blur-[60px]" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85",
						children: [/* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "w-4 h-4 text-gamaliel-green" }), "Nous contacter"]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight",
						children: ["Parlons de votre ", /* @__PURE__ */ jsx("span", {
							className: "text-gamaliel-green",
							children: "avenir professionnel"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-lg text-white/70 max-w-2xl mx-auto",
						children: "Une question sur une formation, une admission ou un partenariat ? Notre équipe vous répond rapidement."
					})
				]
			})
		]
	}), /* @__PURE__ */ jsx("section", {
		className: "py-16 bg-gamaliel-paper",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid lg:grid-cols-[1fr_1.15fr] gap-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-3xl border border-gamaliel-navy/5 p-6",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display text-lg font-bold text-gamaliel-navy-deep mb-4",
							children: "Réponse immédiate"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: WHATSAPP_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
									style: { backgroundColor: "#25D366" },
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 shrink-0",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
									}), /* @__PURE__ */ jsx("span", {
										className: "flex-1 text-left text-sm",
										children: "Discuter sur WhatsApp"
									})]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: PHONE_TEL,
									className: "flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
									style: { backgroundColor: ACTION_COLOR },
									onMouseEnter: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER,
									onMouseLeave: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR,
									children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 shrink-0" }), /* @__PURE__ */ jsx("span", {
										className: "flex-1 text-left text-sm",
										children: "Appeler le centre"
									})]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: FACEBOOK_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
									style: { backgroundColor: "#1877F2" },
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-5 h-5 shrink-0",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
									}), /* @__PURE__ */ jsx("span", {
										className: "flex-1 text-left text-sm",
										children: "Suivre sur Facebook"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-gamaliel-navy-deep rounded-3xl p-6 text-white",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-display text-lg font-bold mb-4",
								children: "Nos coordonnées"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "space-y-4 text-sm",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-4.5 h-4.5 text-gamaliel-green" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold",
											children: "Adresse"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-white/60 mt-0.5",
											children: "Carrefour Andem, Logpom — Douala"
										})] })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-4.5 h-4.5 text-gamaliel-green" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold",
											children: "Téléphone"
										}), /* @__PURE__ */ jsx("a", {
											href: PHONE_TEL,
											className: "text-white/60 hover:text-white transition-colors mt-0.5 block",
											children: "+237 6 96 08 40 48"
										})] })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4.5 h-4.5 text-gamaliel-green" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold",
											children: "Email"
										}), /* @__PURE__ */ jsx("a", {
											href: "mailto:info@institutgamaliel.com",
											className: "text-white/60 hover:text-white transition-colors mt-0.5 block",
											children: "info@institutgamaliel.com"
										})] })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-1.5 text-xs mt-6 pt-5 border-t border-white/10 text-gamaliel-green font-semibold",
								children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4" }), "Institut agréé MINEFOP depuis 2014"]
							})
						]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-3xl border border-gamaliel-navy/5 p-6 md:p-8",
					children: recentlySuccessful ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-12",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 bg-gamaliel-green/20 rounded-full flex items-center justify-center mx-auto mb-4",
								children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-8 h-8 text-gamaliel-green-deep" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-gamaliel-navy-deep mb-2",
								children: "Message envoyé !"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-gamaliel-navy/60 text-sm max-w-sm mx-auto",
								children: "Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais."
							})
						]
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-xl font-bold text-gamaliel-navy-deep mb-1",
							children: "Envoyez-nous un message"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gamaliel-navy/50 mb-6",
							children: "Nous vous répondons généralement sous 24h ouvrées."
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
											children: ["Nom complet ", /* @__PURE__ */ jsx("span", {
												className: "text-gamaliel-red",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("div", {
												className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
												children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												value: data.nom,
												onChange: (e) => setData("nom", e.target.value),
												className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors",
												placeholder: "Votre nom",
												required: true
											})]
										}),
										errors.nom && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-gamaliel-red",
											children: errors.nom
										})
									] }), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
											children: ["Téléphone ", /* @__PURE__ */ jsx("span", {
												className: "text-gamaliel-red",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("div", {
												className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
												children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
											}), /* @__PURE__ */ jsx("input", {
												type: "tel",
												value: data.telephone,
												onChange: (e) => setData("telephone", e.target.value),
												className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors",
												placeholder: "6XX XXX XXX",
												required: true
											})]
										}),
										errors.telephone && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-gamaliel-red",
											children: errors.telephone
										})
									] })]
								}),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
										children: ["Email ", /* @__PURE__ */ jsx("span", {
											className: "text-gamaliel-navy/30 text-xs",
											children: "(optionnel)"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("div", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
											children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
										}), /* @__PURE__ */ jsx("input", {
											type: "email",
											value: data.email,
											onChange: (e) => setData("email", e.target.value),
											className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors",
											placeholder: "votre@email.com"
										})]
									}),
									errors.email && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-gamaliel-red",
										children: errors.email
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
										children: ["Sujet ", /* @__PURE__ */ jsx("span", {
											className: "text-gamaliel-navy/30 text-xs",
											children: "(optionnel)"
										})]
									}),
									/* @__PURE__ */ jsxs("select", {
										value: data.sujet,
										onChange: (e) => setData("sujet", e.target.value),
										className: "w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors bg-white",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "-- Sélectionnez --"
										}), sujets.map((s) => /* @__PURE__ */ jsx("option", {
											value: s,
											children: s
										}, s))]
									}),
									errors.sujet && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-gamaliel-red",
										children: errors.sujet
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
										children: ["Message ", /* @__PURE__ */ jsx("span", {
											className: "text-gamaliel-red",
											children: "*"
										})]
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: data.message,
										onChange: (e) => setData("message", e.target.value),
										rows: 5,
										className: "w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-green-deep focus:border-gamaliel-green-deep transition-colors resize-none",
										placeholder: "Votre message...",
										required: true
									}),
									errors.message && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-gamaliel-red",
										children: errors.message
									})
								] }),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "w-full flex items-center justify-center gap-2 py-3.5 px-4 text-white rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
									style: { backgroundColor: ACTION_COLOR },
									onMouseEnter: (e) => !processing && (e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER),
									onMouseLeave: (e) => e.currentTarget.style.backgroundColor = ACTION_COLOR,
									children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
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
									}), "Envoi en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PaperAirplaneIcon, { className: "w-5 h-5" }), "Envoyer le message"] })
								})
							]
						})
					] })
				})]
			})
		})
	})] })] });
}
//#endregion
export { Contact as default };

//# sourceMappingURL=Contact-DRWkTxe9.js.map