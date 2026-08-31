import { t as StudentLayout } from "./StudentLayout-Dk39w70O.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, BookOpenIcon, CheckCircleIcon, DocumentIcon, ExclamationTriangleIcon, EyeIcon, LockClosedIcon, LockOpenIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Cours/Show.tsx
var extractYoutubeId = (url) => {
	const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
	return match ? match[1] : "";
};
function Show({ cours }) {
	var _cours$formation;
	const [loading, setLoading] = useState(false);
	const [selectedFileUrl, setSelectedFileUrl] = useState(null);
	const handleMarkAsViewed = () => {
		setLoading(true);
		router.post(`/student/cours/${cours.id}/view`, {}, {
			preserveScroll: true,
			onSuccess: () => {
				setLoading(false);
				router.reload();
			},
			onError: () => {
				setLoading(false);
			}
		});
	};
	const handleContextMenu = (e) => {
		e.preventDefault();
	};
	if (cours.est_verrouille) {
		var _cours$tranche_requis, _cours$tranche_requis2, _cours$tranche_requis3;
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Verrouillé` }), /* @__PURE__ */ jsx(StudentLayout, {
			title: cours.titre,
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl select-none",
				onContextMenu: handleContextMenu,
				children: [/* @__PURE__ */ jsxs(Link, {
					href: "/student/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes cours"]
				}), /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-8 shadow-sm border-2 border-red-200/50 bg-red-50/30 text-center",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ jsx(LockClosedIcon, { className: "w-10 h-10 text-red-500" })
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold text-gray-900",
								children: cours.titre
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-yellow-500" }), /* @__PURE__ */ jsxs("span", {
									className: "text-lg font-medium text-yellow-700",
									children: [
										"🔒 Tranche ",
										(_cours$tranche_requis = cours.tranche_requise) === null || _cours$tranche_requis === void 0 ? void 0 : _cours$tranche_requis.numero,
										" requise"
									]
								})]
							}),
							((_cours$tranche_requis2 = cours.tranche_requise) === null || _cours$tranche_requis2 === void 0 ? void 0 : _cours$tranche_requis2.montant) && /* @__PURE__ */ jsxs("p", {
								className: "text-gray-600",
								children: [
									"Payez la tranche ",
									cours.tranche_requise.numero,
									" de",
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "font-semibold",
										children: [cours.tranche_requise.montant.toLocaleString(), " FCFA"]
									}),
									" ",
									"pour accéder à ce cours."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500 max-w-md",
								children: "Une fois la tranche payée et validée, vous aurez automatiquement accès à ce contenu."
							}),
							(cours === null || cours === void 0 || (_cours$tranche_requis3 = cours.tranche_requise) === null || _cours$tranche_requis3 === void 0 ? void 0 : _cours$tranche_requis3.lien) ? /* @__PURE__ */ jsxs("a", {
								href: cours.tranche_requise.lien,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-5 h-5" }), "Débloquer"]
							}) : /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-4 h-4" }), "Lien indisponible"]
							})
						]
					})
				})]
			})
		})] });
	}
	cours.video_url && extractYoutubeId(cours.video_url);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Détails du cours` }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: cours.titre,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl select-none",
			onContextMenu: handleContextMenu,
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/student/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes cours"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: cours.titre
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500 mt-1",
							children: (_cours$formation = cours.formation) === null || _cours$formation === void 0 ? void 0 : _cours$formation.name
						})] }), cours.viewed ? /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium",
							children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" }), "Vu"]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: handleMarkAsViewed,
							disabled: loading,
							className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: [loading ? "⏳" : "👁️", "Marquer comme vu"]
						})]
					}), cours.viewed_at && /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-gray-400 mt-2",
						children: ["Vu le ", cours.viewed_at]
					})]
				}),
				cours.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed select-text",
						children: cours.description
					})]
				}),
				cours.lessons && cours.lessons.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-4 border-b border-gray-100 bg-gray-50",
						children: /* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }),
								"Leçons du cours (",
								cours.lessons.length,
								")"
							]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "divide-y divide-gray-100",
						children: cours.lessons.map((lesson, index) => /* @__PURE__ */ jsx("div", {
							className: "p-4 hover:bg-gray-50 transition-colors",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsxs("span", {
													className: "text-sm font-medium text-gray-400 w-6",
													children: [String(lesson.order || index + 1).padStart(2, "0"), "."]
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/student/cours/lesson/${lesson.id}`,
													className: "text-sm font-medium text-gray-900 hover:text-cab-blue transition-colors",
													children: lesson.titre
												}),
												lesson.vu ? /* @__PURE__ */ jsx("span", {
													className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs",
													children: "✅ Vu"
												}) : /* @__PURE__ */ jsx("span", {
													className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs",
													children: "Non vu"
												})
											]
										}),
										lesson.description && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500 ml-8 mt-0.5 line-clamp-1",
											children: lesson.description
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 ml-8 mt-1",
											children: [
												lesson.has_video && /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1 text-xs text-red-500",
													children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-3 h-3" }), "Vidéo"]
												}),
												lesson.has_files && /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1 text-xs text-blue-500",
													children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3 h-3" }), "Fichiers"]
												}),
												lesson.viewed_at && /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400",
													children: ["Vu le ", lesson.viewed_at]
												})
											]
										})
									]
								}), /* @__PURE__ */ jsxs(Link, {
									href: `/student/cours/lesson/${lesson.id}`,
									className: "px-3 py-1.5 text-sm text-cab-blue hover:bg-blue-50 rounded-lg transition-colors font-medium flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }), "Voir"]
								})]
							})
						}, lesson.id))
					})]
				}),
				cours.video_url ? /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-4 border-b border-gray-100 bg-gray-50",
						children: /* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), cours.video_title || "Vidéo du cours"]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "p-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "relative rounded-xl overflow-hidden bg-black max-w-full",
							children: /* @__PURE__ */ jsx("video", {
								src: cours.video_url,
								controls: true,
								controlsList: "nodownload noremoteplayback",
								disablePictureInPicture: true,
								onContextMenu: (e) => e.preventDefault(),
								onDragStart: (e) => e.preventDefault(),
								className: "w-full h-auto rounded-xl max-h-[500px]",
								children: "Votre navigateur ne prend pas en charge la lecture vidéo."
							})
						})
					})]
				}) : null,
				cours.contenu && cours.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Documents joints (Lecture seule)"]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: cours.contenu.map((file, index) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setSelectedFileUrl(`${file.url}#toolbar=0&navpanes=0&scrollbar=0`),
							className: "flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 border border-transparent transition-all text-left",
							children: [
								/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500 flex-shrink-0" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-700 font-medium truncate flex-1",
									children: file.name
								}),
								/* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4 text-gray-400" })
							]
						}, index))
					})]
				})
			]
		}), selectedFileUrl && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Aperçu sécurisé du document"]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setSelectedFileUrl(null),
						className: "p-1 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 bg-gray-100 relative",
					children: /* @__PURE__ */ jsx("iframe", {
						src: selectedFileUrl,
						className: "w-full h-full border-none",
						onContextMenu: (e) => e.preventDefault()
					})
				})]
			})
		})]
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-BuKzSEfW.js.map