import { t as StudentLayout } from "./StudentLayout-C-WwU7Mx.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, BookOpenIcon, CheckCircleIcon, DocumentIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Cours/ShowLesson.tsx
function ShowLesson({ lesson }) {
	var _lesson$cours$formati;
	const [loading, setLoading] = useState(false);
	const handleMarkAsViewed = () => {
		setLoading(true);
		router.post(`/student/cours/lesson/${lesson.id}/view`, {}, {
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
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${lesson.titre} - Leçon` }), /* @__PURE__ */ jsx(StudentLayout, {
		title: lesson.titre,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: `/student/cours/${lesson.cours.id}`,
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour au cours"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }), /* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold text-gray-900",
									children: lesson.titre
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-500 mt-1",
								children: [
									(_lesson$cours$formati = lesson.cours.formation) === null || _lesson$cours$formati === void 0 ? void 0 : _lesson$cours$formati.name,
									" • ",
									lesson.cours.titre
								]
							}),
							lesson.description && /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 mt-2",
								children: lesson.description
							})
						] }), lesson.vu ? /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium",
							children: [
								/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" }),
								"Vu",
								lesson.viewed_at && /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-gray-500 ml-1",
									children: ["le ", lesson.viewed_at]
								})
							]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: handleMarkAsViewed,
							disabled: loading,
							className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: [loading ? "⏳" : /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }), "Marquer comme vu"]
						})]
					})
				}),
				lesson.contenu && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Contenu"]
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
						children: /* @__PURE__ */ jsx("div", {
							className: "relative rounded-xl overflow-hidden bg-black max-w-full",
							children: /* @__PURE__ */ jsx("video", {
								src: lesson.video_url,
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
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
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
				!lesson.contenu && !lesson.video_url && (!lesson.files || lesson.files.length === 0) && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Cette leçon ne contient pas encore de contenu"
					})]
				})
			]
		})
	})] });
}
//#endregion
export { ShowLesson as default };

//# sourceMappingURL=ShowLesson-tp2Rr-gk.js.map