import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, ArrowLeftIcon, BuildingOfficeIcon, CalendarIcon, ChatBubbleLeftIcon, CheckBadgeIcon, CheckCircleIcon, ClipboardDocumentListIcon, ClockIcon, DocumentTextIcon, EnvelopeIcon, ExclamationTriangleIcon, PhoneIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Candidatures/Show.tsx
function Show({ candidature, vagues = [] }) {
	var _candidature$formatio, _candidature$certific, _candidature$formatio2;
	const [showVagueModal, setShowVagueModal] = useState(false);
	const [selectedVague, setSelectedVague] = useState("");
	const [copied, setCopied] = useState(false);
	const getStatutBadge = (statut, label) => {
		const configs = {
			en_attente: {
				color: "bg-yellow-100 text-yellow-800 border-yellow-200",
				icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" })
			},
			en_cours: {
				color: "bg-blue-100 text-blue-800 border-blue-200",
				icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-4 h-4" })
			},
			admis: {
				color: "bg-green-100 text-green-800 border-green-200",
				icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" })
			},
			refuse: {
				color: "bg-red-100 text-red-800 border-red-200",
				icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" })
			}
		};
		const config = configs[statut] || configs.en_attente;
		return /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`,
			children: [config.icon, label]
		});
	};
	const handleAction = (action) => {
		if (!confirm(`Confirmer cette action ?`)) return;
		router.post(`/admin/candidatures/${candidature.id}/${action}`, {}, {
			preserveScroll: true,
			onSuccess: () => {
				router.reload();
			}
		});
	};
	const handleAttribuerVague = () => {
		if (!selectedVague) {
			alert("Veuillez sélectionner une vague.");
			return;
		}
		router.post(`/admin/candidatures/${candidature.id}/attribuer-vague`, { vague_id: selectedVague }, {
			preserveScroll: true,
			onSuccess: () => {
				setShowVagueModal(false);
				router.reload();
			}
		});
	};
	const getLoginIdentifiant = () => {
		var _candidature$user, _candidature$user2;
		if ((_candidature$user = candidature.user) === null || _candidature$user === void 0 ? void 0 : _candidature$user.email) return candidature.user.email;
		if ((_candidature$user2 = candidature.user) === null || _candidature$user2 === void 0 ? void 0 : _candidature$user2.telephone) return candidature.user.telephone;
		if (candidature.telephone) return candidature.telephone;
		return "Non disponible";
	};
	const getIdentifiantLabel = () => {
		var _candidature$user3, _candidature$user4;
		if ((_candidature$user3 = candidature.user) === null || _candidature$user3 === void 0 ? void 0 : _candidature$user3.email) return "📧 Email";
		if ((_candidature$user4 = candidature.user) === null || _candidature$user4 === void 0 ? void 0 : _candidature$user4.telephone) return "📱 Téléphone";
		if (candidature.telephone) return "📱 Téléphone";
		return "📧 Identifiant";
	};
	const buildMessage = () => {
		var _candidature$student, _candidature$student2;
		const identifiant = getLoginIdentifiant();
		const label = getIdentifiantLabel();
		return `👋 Bonjour ${candidature.nom_complet},\n\nVotre compte CAB Informatique a été créé avec succès !\n\n🔑 Identifiants de connexion :\n${label} : ${identifiant}\n🔐 Mot de passe : ${(_candidature$student = candidature.student) === null || _candidature$student === void 0 ? void 0 : _candidature$student.matricule}\n🎓 Matricule : ${(_candidature$student2 = candidature.student) === null || _candidature$student2 === void 0 ? void 0 : _candidature$student2.matricule}\n\n➡️ Connectez-vous sur : ${window.location.origin}/login\n\nBonne formation ! 🚀`;
	};
	const copyIdentifiants = () => {
		const message = buildMessage();
		navigator.clipboard.writeText(message).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 3e3);
		});
	};
	const getWhatsAppLink = () => {
		const message = buildMessage();
		return `https://wa.me/${candidature.telephone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
	};
	const getEmailLink = () => {
		var _candidature$user5;
		if (!((_candidature$user5 = candidature.user) === null || _candidature$user5 === void 0 ? void 0 : _candidature$user5.email)) return null;
		const message = buildMessage();
		return `mailto:${candidature.user.email}?subject=${encodeURIComponent("Compte CAB Informatique")}&body=${encodeURIComponent(message)}`;
	};
	const getStudentType = () => {
		if (!candidature.student) return null;
		if (candidature.student.vague_id) return "vague";
		if (candidature.student.certification_id) return "certification";
		return null;
	};
	const studentType = getStudentType();
	const canAccept = candidature.statut === "en_attente" || candidature.statut === "en_cours";
	const canRefuse = candidature.statut === "en_attente" || candidature.statut === "en_cours";
	const canEnCours = candidature.statut === "en_attente";
	const needsVague = candidature.type === "formation" && !candidature.vague && canAccept;
	const isTraite = candidature.statut === "admis" || candidature.statut === "refuse";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Candidature - ${candidature.nom_complet}` }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: `Candidature de ${candidature.nom_complet}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-5xl",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						href: "/admin/candidatures",
						className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
						children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-cab-blue to-cab-dark flex items-center justify-center text-white text-2xl font-bold shrink-0",
									children: candidature.nom_complet.charAt(0).toUpperCase()
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("h2", {
										className: "text-2xl font-bold text-gray-900",
										children: candidature.nom_complet
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2 mt-1",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-sm text-gray-500",
												children: candidature.type_label
											}),
											/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-300" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-sm text-gray-500",
												children: candidature.created_at
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2",
										children: getStatutBadge(candidature.statut, candidature.statut_label)
									})
								] })]
							}), !isTraite && /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-2",
								children: [
									needsVague && /* @__PURE__ */ jsxs("button", {
										onClick: () => setShowVagueModal(true),
										className: "px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm shadow-purple-200",
										children: [/* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-4 h-4" }), "Attribuer une vague"]
									}),
									canEnCours && /* @__PURE__ */ jsxs("button", {
										onClick: () => handleAction("en-cours"),
										className: "px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200",
										children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }), "Mettre en cours"]
									}),
									canAccept && /* @__PURE__ */ jsxs("button", {
										onClick: () => handleAction("accepter"),
										className: "px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm shadow-green-200",
										children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Accepter"]
									}),
									canRefuse && /* @__PURE__ */ jsxs("button", {
										onClick: () => handleAction("refuser"),
										className: "px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm shadow-red-200",
										children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-4 h-4" }), "Refuser"]
									})
								]
							})]
						}), isTraite && candidature.traite_le && /* @__PURE__ */ jsxs("div", {
							className: "mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4" }),
									"Traité le ",
									candidature.traite_le
								]
							}), candidature.traite_par && /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }),
									"Par ",
									candidature.traite_par
								]
							})]
						})]
					}),
					candidature.statut === "admis" && candidature.user && candidature.student && /* @__PURE__ */ jsxs("div", {
						className: "mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "p-2 bg-green-100 rounded-xl",
									children: /* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-6 h-6 text-green-600" })
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-green-800",
									children: "Compte créé avec succès"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-green-600",
									children: "Les identifiants sont prêts à être transmis"
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "bg-white/70 rounded-xl p-4 border border-green-100",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-green-600 font-medium",
											children: "🎓 Matricule"
										}), /* @__PURE__ */ jsx("p", {
											className: "font-mono font-bold text-green-900 text-lg mt-1",
											children: candidature.student.matricule
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "bg-white/70 rounded-xl p-4 border border-green-100",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-green-600 font-medium",
											children: "👤 Nom d'utilisateur"
										}), /* @__PURE__ */ jsx("p", {
											className: "font-mono font-bold text-green-900 mt-1",
											children: candidature.user.username
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "bg-white/70 rounded-xl p-4 border border-green-100",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-green-600 font-medium",
											children: getIdentifiantLabel()
										}), /* @__PURE__ */ jsx("p", {
											className: "text-green-900 text-sm mt-1 truncate font-medium",
											children: getLoginIdentifiant()
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "bg-white/70 rounded-xl p-4 border border-green-100",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-green-600 font-medium",
											children: "🔐 Mot de passe"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 mt-1",
											children: [/* @__PURE__ */ jsx("code", {
												className: "font-mono font-bold text-green-900 text-sm bg-white px-2 py-1 rounded border border-green-200",
												children: candidature.student.matricule
											}), /* @__PURE__ */ jsx("span", {
												className: "text-xs text-green-500",
												children: "(matricule)"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 pt-4 border-t border-green-200",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-green-600 font-medium mb-2",
									children: "📋 Affectation"
								}), studentType === "vague" ? /* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium",
									children: [/* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-4 h-4" }), "Étudiant en ligne (Vague)"]
								}) : studentType === "certification" ? /* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium",
									children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4" }), "Étudiant en certification"]
								}) : /* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium",
									children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-4 h-4" }), "Non affecté"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 pt-4 border-t border-green-200 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ jsx("button", {
										onClick: copyIdentifiants,
										className: `px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${copied ? "bg-green-600 text-white" : "bg-green-600 text-white hover:bg-green-700"}`,
										children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Copié !"] }) : /* @__PURE__ */ jsx(Fragment, { children: "📋 Copier les identifiants" })
									}),
									/* @__PURE__ */ jsx("a", {
										href: getWhatsAppLink(),
										target: "_blank",
										rel: "noopener noreferrer",
										className: "px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-2",
										children: "💬 Envoyer sur WhatsApp"
									}),
									getEmailLink() && /* @__PURE__ */ jsx("a", {
										href: getEmailLink(),
										className: "px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2",
										children: "✉️ Envoyer par email"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-cab-blue" }), "Informations personnelles"]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Nom complet"
										}), /* @__PURE__ */ jsx("p", {
											className: "font-medium text-gray-900",
											children: candidature.nom_complet
										})] })]
									}),
									candidature.email && /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Email"
										}), /* @__PURE__ */ jsx("a", {
											href: `mailto:${candidature.email}`,
											className: "text-cab-blue hover:underline",
											children: candidature.email
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Téléphone"
										}), /* @__PURE__ */ jsx("a", {
											href: `tel:${candidature.telephone}`,
											className: "text-cab-blue hover:underline",
											children: candidature.telephone
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Niveau scolaire"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-gray-700",
											children: candidature.niveau_scolaire || "Non renseigné"
										})] })]
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5 text-cab-blue" }), "Informations candidature"]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Type"
										}), /* @__PURE__ */ jsx("span", {
											className: `px-2 py-0.5 rounded-full text-xs font-medium ${candidature.type === "formation" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
											children: candidature.type_label
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-gray-500",
												children: "Formation / Certification"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-gray-700",
												children: ((_candidature$formatio = candidature.formation) === null || _candidature$formatio === void 0 ? void 0 : _candidature$formatio.name) || ((_candidature$certific = candidature.certification) === null || _candidature$certific === void 0 ? void 0 : _candidature$certific.titre) || "-"
											}),
											candidature.certification && candidature.formation && /* @__PURE__ */ jsxs("p", {
												className: "text-xs text-gray-400 mt-0.5",
												children: ["Certification liée à la formation ", candidature.formation.name]
											})
										] })]
									}),
									candidature.vague && /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Vague"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-gray-700 font-medium",
											children: candidature.vague.name
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4 text-gray-400 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Date de soumission"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-gray-700",
											children: candidature.created_at
										})] })]
									})
								]
							})]
						})]
					}),
					candidature.message && /* @__PURE__ */ jsxs("div", {
						className: "mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(ChatBubbleLeftIcon, { className: "w-5 h-5 text-cab-blue" }), "Message du candidat"]
						}), /* @__PURE__ */ jsx("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-100",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-gray-700 whitespace-pre-wrap text-sm leading-relaxed",
								children: candidature.message
							})
						})]
					}),
					candidature.notes && /* @__PURE__ */ jsxs("div", {
						className: "mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-5 h-5 text-gray-400" }), "📝 Notes internes"]
						}), /* @__PURE__ */ jsx("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-100",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-gray-700 whitespace-pre-wrap text-sm leading-relaxed",
								children: candidature.notes
							})
						})]
					})
				]
			}),
			showVagueModal && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in",
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-scale-up",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "p-2 bg-purple-100 rounded-xl",
								children: /* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-6 h-6 text-purple-600" })
							}), /* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-gray-900",
								children: "Attribuer une vague"
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-600 mb-4",
							children: ["Sélectionnez une vague pour la formation ", /* @__PURE__ */ jsx("strong", {
								className: "text-gray-900",
								children: (_candidature$formatio2 = candidature.formation) === null || _candidature$formatio2 === void 0 ? void 0 : _candidature$formatio2.name
							})]
						}),
						vagues && vagues.length > 0 ? /* @__PURE__ */ jsxs("select", {
							value: selectedVague,
							onChange: (e) => setSelectedVague(e.target.value),
							className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white mb-4 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "-- Sélectionnez une vague --"
							}), vagues.map((vague) => /* @__PURE__ */ jsxs("option", {
								value: vague.id,
								disabled: vague.is_full,
								children: [
									vague.name,
									" (",
									vague.date_debut,
									") - ",
									vague.is_full ? "🔴 Complète" : `🟢 ${vague.places} places`
								]
							}, vague.id))]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-4 flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-yellow-600 mt-0.5 shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm text-yellow-700 font-medium",
								children: "Aucune vague disponible"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-yellow-600 mt-0.5",
								children: "Veuillez créer une nouvelle vague dans la gestion des vagues avant d'accepter cette candidature."
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 mt-2",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: handleAttribuerVague,
								disabled: !selectedVague || vagues && vagues.length === 0,
								className: "flex-1 px-4 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Attribuer"]
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setShowVagueModal(false),
								className: "px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors",
								children: "Annuler"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("style", { children: `
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes scale-up {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.2s ease-out forwards;
                    }
                    .animate-scale-up {
                        animation: scale-up 0.2s ease-out forwards;
                    }
                ` })
		]
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-BfNNcAQ9.js.map