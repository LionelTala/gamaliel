import { t as PublicLayout } from "./PublicLayout-BWQi_JEN.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { AcademicCapIcon, ArrowLeftIcon, ChatBubbleLeftIcon, CheckBadgeIcon, EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Preinscription.tsx
function Preinscription({ formation }) {
	const { data, setData, post, processing, errors } = useForm({
		formation_id: (formation === null || formation === void 0 ? void 0 : formation.id) || "",
		nom: "",
		prenom: "",
		email: "",
		telephone: "",
		niveau_scolaire: "",
		message: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/candidatures");
	};
	useEffect(() => {
		document.body.style.overflow = "";
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.width = "";
		window.scrollTo(0, 0);
		return () => {
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
		};
	}, []);
	const title = `Pré-inscription — ${(formation === null || formation === void 0 ? void 0 : formation.name) || "Formation"} | Institut Gamaliel`;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title }), /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-16",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/15 blur-[100px]" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-28 -right-10 w-96 h-96 rounded-full bg-gamaliel-orange/20 blur-[110px]" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85",
							children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4 text-gamaliel-green" }), "Candidature en ligne"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight",
							children: [
								"Pré-inscription",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "bg-clip-text text-transparent",
									style: { backgroundImage: "linear-gradient(100deg, #FD7D0F, #E13A4B)" },
									children: "en ligne"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-lg text-white/70 max-w-2xl mx-auto",
							children: (formation === null || formation === void 0 ? void 0 : formation.name) ? `Rejoignez la formation ${formation.name}` : "Remplissez le formulaire ci-dessous pour candidater à l'Institut Gamaliel"
						})
					]
				})
			})
		]
	}), /* @__PURE__ */ jsx("section", {
		className: "py-16 bg-gamaliel-paper",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/formations",
				className: "inline-flex items-center gap-2 text-sm text-gamaliel-navy/50 hover:text-gamaliel-orange transition-colors mb-6",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour aux formations"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gamaliel-navy/5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-2xl font-bold text-gamaliel-navy-deep",
						children: "Vos informations"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gamaliel-navy/50 mt-1",
						children: "Remplissez ce formulaire pour être contacté par notre équipe pédagogique."
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-2xl p-4 border border-gamaliel-orange/20 bg-gamaliel-orange/5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl bg-gamaliel-orange/15 text-gamaliel-orange flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-gamaliel-orange uppercase tracking-wide",
								children: "Formation choisie"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold text-gamaliel-navy-deep mt-0.5",
								children: (formation === null || formation === void 0 ? void 0 : formation.name) || "Non spécifiée — précisez-la dans le message ci-dessous"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "nom",
									className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
									children: ["Nom ", /* @__PURE__ */ jsx("span", {
										className: "text-gamaliel-red",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "nom",
									type: "text",
									value: data.nom,
									onChange: (e) => setData("nom", e.target.value),
									className: "w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "Votre nom",
									required: true
								}),
								errors.nom && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-gamaliel-red",
									children: errors.nom
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "prenom",
									className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
									children: ["Prénom ", /* @__PURE__ */ jsx("span", {
										className: "text-gamaliel-red",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "prenom",
									type: "text",
									value: data.prenom,
									onChange: (e) => setData("prenom", e.target.value),
									className: "w-full px-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "Votre prénom",
									required: true
								}),
								errors.prenom && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-gamaliel-red",
									children: errors.prenom
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "email",
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
									id: "email",
									type: "email",
									value: data.email,
									onChange: (e) => setData("email", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "exemple@email.com"
								})]
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-gamaliel-red",
								children: errors.email
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "telephone",
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: ["Téléphone (WhatsApp) ", /* @__PURE__ */ jsx("span", {
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
									id: "telephone",
									type: "tel",
									value: data.telephone,
									onChange: (e) => setData("telephone", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors",
									placeholder: "Ex : 6 96 08 40 48",
									required: true
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-gamaliel-navy/40 mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-3.5 h-3.5 text-gamaliel-green-deep" }), "Numéro WhatsApp pour recevoir vos identifiants"]
							}),
							errors.telephone && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-gamaliel-red",
								children: errors.telephone
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "niveau_scolaire",
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: "Niveau scolaire"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsxs("select", {
									id: "niveau_scolaire",
									value: data.niveau_scolaire,
									onChange: (e) => setData("niveau_scolaire", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors bg-white",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "",
											children: "-- Sélectionnez --"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "CEP",
											children: "CEP"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BEPC",
											children: "BEPC"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "PROBATOIRE",
											children: "Probatoire"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BAC",
											children: "Baccalauréat"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "BAC+2",
											children: "BAC+2"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "LICENCE",
											children: "Licence"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "MASTER",
											children: "Master ou plus"
										})
									]
								})]
							}),
							errors.niveau_scolaire && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-gamaliel-red",
								children: errors.niveau_scolaire
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "message",
								className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
								children: ["Message ", /* @__PURE__ */ jsx("span", {
									className: "text-gamaliel-navy/30 text-xs",
									children: "(optionnel)"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute top-3 left-3 flex items-start pointer-events-none",
									children: /* @__PURE__ */ jsx(ChatBubbleLeftIcon, { className: "w-5 h-5 text-gamaliel-navy/30" })
								}), /* @__PURE__ */ jsx("textarea", {
									id: "message",
									value: data.message,
									onChange: (e) => setData("message", e.target.value),
									rows: 4,
									className: "w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors resize-none",
									placeholder: "Votre message... (précisez ici la formation souhaitée si elle n'est pas déjà indiquée ci-dessus)"
								})]
							}),
							errors.message && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-gamaliel-red",
								children: errors.message
							})
						] }),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3.5 px-4 text-white rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5",
							style: {
								background: "linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)",
								boxShadow: "0 10px 20px -6px rgba(225,58,75,0.4)"
							},
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
							}), "Envoi en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5" }), "Envoyer ma candidature"] })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-center text-xs text-gamaliel-navy/40 mt-4",
							children: "* Champs obligatoires. En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour le traitement de votre candidature."
						})
					]
				})]
			})]
		})
	})] })] });
}
//#endregion
export { Preinscription as default };

//# sourceMappingURL=Preinscription-CwI7t7DK.js.map