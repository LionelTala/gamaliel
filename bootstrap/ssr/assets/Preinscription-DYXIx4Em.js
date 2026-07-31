import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { AcademicCapIcon, ArrowLeftIcon, ChatBubbleLeftIcon, EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Preinscription.tsx
function Preinscription({ type, formation, certification }) {
	const { data, setData, post, processing, errors } = useForm({
		type,
		formation_id: (formation === null || formation === void 0 ? void 0 : formation.id) || "",
		certification_id: (certification === null || certification === void 0 ? void 0 : certification.id) || "",
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
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: type === "formation" ? `Pré-inscription - ${(formation === null || formation === void 0 ? void 0 : formation.name) || "Formation"}` : `Pré-inscription - ${(certification === null || certification === void 0 ? void 0 : certification.titre) || "Certification"}` }), /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "relative pt-32 pb-16 bg-gradient-to-r from-cab-dark to-cab-blue",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [/* @__PURE__ */ jsxs("h1", {
					className: "text-4xl md:text-5xl font-extrabold text-white",
					children: ["Pré-inscription ", /* @__PURE__ */ jsx("span", {
						className: "text-cab-red",
						children: "en ligne"
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-xl text-white/80 max-w-2xl mx-auto",
					children: type === "formation" ? `Rejoignez la formation ${(formation === null || formation === void 0 ? void 0 : formation.name) || ""}` : `Préparez-vous pour la certification ${(certification === null || certification === void 0 ? void 0 : certification.titre) || ""}`
				})]
			})
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "py-16 bg-gray-50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: type === "formation" ? "/formations" : "/certification",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-6",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), type === "formation" ? "Retour aux formations" : "Retour aux certifications"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-gray-900",
						children: "Vos informations"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 mt-1",
						children: "Remplissez ce formulaire pour être contacté par notre équipe."
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-cab-blue",
								children: type === "formation" ? `📚 Formation : ${(formation === null || formation === void 0 ? void 0 : formation.name) || "Non spécifiée"}` : `🎓 Certification : ${(certification === null || certification === void 0 ? void 0 : certification.titre) || "Non spécifiée"}`
							}), type === "certification" && (certification === null || certification === void 0 ? void 0 : certification.formation) && /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-blue-600 mt-1",
								children: ["Formation associée : ", certification.formation]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "nom",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Nom ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "nom",
									type: "text",
									value: data.nom,
									onChange: (e) => setData("nom", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Votre nom",
									required: true
								}),
								errors.nom && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.nom
								})
							] }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "prenom",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Prénom ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "prenom",
									type: "text",
									value: data.prenom,
									onChange: (e) => setData("prenom", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Votre prénom",
									required: true
								}),
								errors.prenom && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.prenom
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "email",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-gray-400 text-xs",
									children: "(optionnel)"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "email",
									type: "email",
									value: data.email,
									onChange: (e) => setData("email", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "exemple@email.com"
								})]
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.email
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "telephone",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Téléphone (WhatsApp) ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "telephone",
									type: "tel",
									value: data.telephone,
									onChange: (e) => setData("telephone", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: 690 66 62 45",
									required: true
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-400 mt-1",
								children: "📱 Numéro WhatsApp pour recevoir vos identifiants"
							}),
							errors.telephone && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.telephone
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "niveau_scolaire",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Niveau scolaire"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsxs("select", {
									id: "niveau_scolaire",
									value: data.niveau_scolaire,
									onChange: (e) => setData("niveau_scolaire", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
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
								className: "mt-1 text-sm text-red-600",
								children: errors.niveau_scolaire
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "message",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Message (optionnel)"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute top-3 left-3 flex items-start pointer-events-none",
									children: /* @__PURE__ */ jsx(ChatBubbleLeftIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("textarea", {
									id: "message",
									value: data.message,
									onChange: (e) => setData("message", e.target.value),
									rows: 4,
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
									placeholder: "Votre message..."
								})]
							}),
							errors.message && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.message
							})
						] }),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-cab-blue to-cab-blue/80 text-white rounded-xl text-sm font-semibold hover:from-cab-dark hover:to-cab-blue transition-all duration-300 shadow-lg shadow-cab-blue/25 disabled:opacity-50 disabled:cursor-not-allowed",
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
							className: "text-center text-xs text-gray-400 mt-4",
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

//# sourceMappingURL=Preinscription-DYXIx4Em.js.map