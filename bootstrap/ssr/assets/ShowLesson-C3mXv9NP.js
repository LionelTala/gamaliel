import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, BookOpenIcon, DocumentIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/ShowLesson.tsx
function ShowLesson({ lesson, viewedStudents, notViewedStudents }) {
	var _lesson$cours$formati;
	const percentage = viewedStudents.length + notViewedStudents.length > 0 ? Math.round(viewedStudents.length / (viewedStudents.length + notViewedStudents.length) * 100) : 0;
	const isExternalUrl = (url) => url.startsWith("http");
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${lesson.titre} - Détails de la leçon` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Détails de la leçon",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: `/admin/cours/${lesson.cours.id}`,
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour au cours"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }),
									/* @__PURE__ */ jsx("h1", {
										className: "text-2xl font-bold text-gray-900",
										children: lesson.titre
									}),
									/* @__PURE__ */ jsx("span", {
										className: `px-2 py-0.5 rounded-full text-xs font-medium ${lesson.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
										children: lesson.is_active ? "Actif" : "Inactif"
									})
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-500 mt-1",
								children: [
									(_lesson$cours$formati = lesson.cours.formation) === null || _lesson$cours$formati === void 0 ? void 0 : _lesson$cours$formati.name,
									" • ",
									lesson.cours.titre
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mt-2",
								children: [
									lesson.has_video && /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1 text-xs text-red-500",
										children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-3 h-3" }), "Vidéo"]
									}),
									lesson.has_files && /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1 text-xs text-blue-500",
										children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3 h-3" }), "Fichiers"]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "text-xs text-gray-400",
										children: ["Ordre: ", lesson.order || 0]
									})
								]
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: /* @__PURE__ */ jsx(Link, {
								href: `/admin/cours/lesson/${lesson.id}/edit`,
								className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: "Modifier"
							})
						})]
					})
				}),
				lesson.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed whitespace-pre-line",
						children: lesson.description
					})]
				}),
				lesson.contenu && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📖 Contenu"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-gray-600 leading-relaxed whitespace-pre-line prose prose-sm max-w-none",
						children: lesson.contenu
					})]
				}),
				lesson.video_url && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-4 border-b border-gray-100 bg-gray-50",
						children: /* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), lesson.video_title || "Vidéo de la leçon"]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "p-4",
						children: isExternalUrl(lesson.video_url) && !lesson.video_stream_url ? /* @__PURE__ */ jsx("div", {
							className: "relative aspect-video rounded-xl overflow-hidden bg-gray-900",
							children: /* @__PURE__ */ jsx("iframe", {
								src: lesson.video_embed_url || lesson.video_url,
								className: "w-full h-full",
								allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
								allowFullScreen: true,
								title: lesson.video_title || lesson.titre
							})
						}) : /* @__PURE__ */ jsx("div", {
							className: "relative rounded-xl overflow-hidden bg-black max-w-full",
							children: /* @__PURE__ */ jsx("video", {
								src: lesson.video_stream_url || lesson.video_url,
								controls: true,
								controlsList: "nodownload noremoteplayback",
								disablePictureInPicture: true,
								onContextMenu: (e) => e.preventDefault(),
								onDragStart: (e) => e.preventDefault(),
								className: "w-full h-auto rounded-xl max-h-[500px]",
								children: "Votre navigateur ne prend pas en charge la lecture de cette vidéo."
							})
						})
					})]
				}),
				lesson.files && lesson.files.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }),
							"Fichiers joints (",
							lesson.files.length,
							")"
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: lesson.files.map((file, index) => /* @__PURE__ */ jsxs("a", {
							href: file.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group",
							children: [
								/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500 flex-shrink-0" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-600 truncate flex-1",
									children: file.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
									children: "📎"
								})
							]
						}, index))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5 text-cab-blue" }), "Statistiques de visionnage"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-3 gap-4 mb-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: viewedStudents.length
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Vues"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: viewedStudents.length + notViewedStudents.length
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Étudiants"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: [percentage, "%"]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Taux de visionnage"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full bg-cab-blue rounded-full transition-all duration-500",
								style: { width: `${Math.min(percentage, 100)}%` }
							})
						})
					]
				})
			]
		})
	})] });
}
//#endregion
export { ShowLesson as default };

//# sourceMappingURL=ShowLesson-C3mXv9NP.js.map