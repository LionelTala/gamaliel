import { t as AdminLayout } from "./AdminLayout-BD3FfVJf.js";
import { t as uploadState } from "./uploadState-Baqu84Jo.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { ArrowLeftIcon, BookOpenIcon, CheckCircleIcon, ClockIcon, DocumentIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, ShieldCheckIcon, TrashIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/Show.tsx
function Show({ cours, viewedStudents, notViewedStudents }) {
	var _cours$formation, _cours$vague, _cours$certification;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const fileInputRef = useRef(null);
	const videoInputRef = useRef(null);
	const [files, setFiles] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const [uploadProgress, setUploadProgress] = useState(null);
	const { data, setData, post, reset, errors, processing } = useForm({
		titre: "",
		description: "",
		contenu: "",
		video_title: "",
		video: null,
		order: 0,
		is_active: true,
		files: []
	});
	const percentage = cours.total_students > 0 ? Math.round(cours.viewed_count / cours.total_students * 100) : 0;
	const handleResendNotification = () => {
		if (confirm(`Renvoyer les notifications pour le cours "${cours.titre}" ?`)) router.post(`/admin/cours/${cours.id}/resend-notifications`);
	};
	const handleToggleLesson = (lesson) => {
		if (confirm(`Confirmer la ${lesson.is_active ? "désactivation" : "activation"} de la leçon "${lesson.titre}" ?`)) router.post(`/admin/cours/lesson/${lesson.id}/toggle-active`);
	};
	const handleDeleteLesson = (lesson) => {
		if (confirm(`Supprimer la leçon "${lesson.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/cours/lesson/${lesson.id}`);
	};
	const openModal = () => {
		setIsModalOpen(true);
		document.body.style.overflow = "hidden";
	};
	const closeModal = () => {
		setIsModalOpen(false);
		reset();
		setFiles([]);
		setFilePreviews([]);
		setUploadProgress(null);
		if (videoInputRef.current) videoInputRef.current.value = "";
		if (fileInputRef.current) fileInputRef.current.value = "";
		document.body.style.overflow = "";
	};
	const handleVideoChange = (e) => {
		var _e$target$files;
		const selectedVideo = ((_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0]) || null;
		setData("video", selectedVideo);
	};
	const removeVideo = () => {
		setData("video", null);
		if (videoInputRef.current) videoInputRef.current.value = "";
	};
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		const updatedFiles = [...files, ...selectedFiles];
		setFiles(updatedFiles);
		setData("files", updatedFiles);
		const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
		setFilePreviews([...filePreviews, ...newPreviews]);
	};
	const removeFile = (index) => {
		const newFiles = files.filter((_, i) => i !== index);
		const newPreviews = filePreviews.filter((_, i) => i !== index);
		setFiles(newFiles);
		setFilePreviews(newPreviews);
		setData("files", newFiles);
		URL.revokeObjectURL(filePreviews[index]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setUploadProgress(0);
		uploadState.setActive(true);
		post(`/admin/cours/${cours.id}/lessons`, {
			forceFormData: true,
			onProgress: (event) => {
				if ((event === null || event === void 0 ? void 0 : event.percentage) != null) setUploadProgress(event.percentage);
			},
			onSuccess: () => {
				closeModal();
				uploadState.setActive(false);
			},
			onError: () => {
				setUploadProgress(null);
				uploadState.setActive(false);
			},
			onFinish: () => {
				setUploadProgress(null);
				uploadState.setActive(false);
			}
		});
	};
	const sortedLessons = [...cours.lessons || []].sort((a, b) => (a.order || 0) - (b.order || 0));
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Détails du cours` }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Détails du cours",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/admin/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold text-gray-900",
									children: cours.titre
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2 mt-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-600",
											children: (_cours$formation = cours.formation) === null || _cours$formation === void 0 ? void 0 : _cours$formation.name
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-300",
											children: "•"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-600",
											children: cours.type === "vague" ? `Vague ${((_cours$vague = cours.vague) === null || _cours$vague === void 0 ? void 0 : _cours$vague.name) || "-"}` : `Certification ${((_cours$certification = cours.certification) === null || _cours$certification === void 0 ? void 0 : _cours$certification.titre) || "-"}`
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-3 mt-3",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cours.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
											children: [cours.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-4 h-4" }), cours.mode_envoi === "individuel" ? "Envoi individuel" : "Envoi groupe"]
										}),
										cours.mode_envoi === "individuel" && cours.student && /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200",
											children: [
												/* @__PURE__ */ jsx(UsersIcon, { className: "w-4 h-4" }),
												cours.student.name,
												" (",
												cours.student.matricule,
												")"
											]
										}),
										cours.tranche_requise ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200",
											children: [
												/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4" }),
												"Tranche ",
												cours.tranche_requise.numero,
												" requise",
												/* @__PURE__ */ jsxs("span", {
													className: "ml-1 text-[10px] opacity-75",
													children: [
														"(",
														cours.tranche_requise.montant.toLocaleString(),
														" FCFA)"
													]
												})
											]
										}) : /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200",
											children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Accessible à tous"]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2 flex-shrink-0",
							children: [!cours.has_notification_sent && /* @__PURE__ */ jsx("button", {
								onClick: handleResendNotification,
								className: "px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors",
								children: "📤 Envoyer notification"
							}), /* @__PURE__ */ jsx(Link, {
								href: `/admin/cours/${cours.id}/edit`,
								className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: "Modifier"
							})]
						})]
					})
				}),
				cours.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed whitespace-pre-line",
						children: cours.description
					})]
				}),
				cours.video_url && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), cours.video_title || "Vidéo"]
					}), /* @__PURE__ */ jsx("div", {
						className: "relative aspect-video rounded-xl overflow-hidden bg-gray-900",
						children: cours.video_stream_url ? /* @__PURE__ */ jsx("video", {
							src: cours.video_stream_url,
							controls: true,
							controlsList: "nodownload",
							className: "w-full h-full"
						}) : cours.video_embed_url ? /* @__PURE__ */ jsx("iframe", {
							src: cours.video_embed_url,
							className: "w-full h-full",
							allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true,
							title: cours.video_title || cours.titre
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ jsx("a", {
								href: cours.video_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-white hover:text-blue-400 transition-colors flex items-center gap-2",
								children: "▶️ Voir la vidéo"
							})
						})
					})]
				}),
				cours.contenu && cours.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }),
							"Fichiers joints (",
							cours.contenu.length,
							")"
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: cours.contenu.map((file, index) => /* @__PURE__ */ jsxs("a", {
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
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
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
										children: cours.viewed_count
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Vues"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: cours.total_students
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
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3",
							children: [cours.mode_envoi === "individuel" ? /* @__PURE__ */ jsx("span", { children: "👤 Envoi individuel à un seul étudiant" }) : /* @__PURE__ */ jsxs("span", { children: [
								"👥 Envoi groupé à ",
								cours.total_students,
								" étudiant",
								cours.total_students > 1 ? "s" : ""
							] }), cours.tranche_requise && /* @__PURE__ */ jsxs("span", {
								className: "ml-3",
								children: [
									"• 🔒 Tranche ",
									cours.tranche_requise.numero,
									" requise"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-500" }),
								"Ont vu (",
								viewedStudents.length,
								")"
							]
						}), viewedStudents.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Aucun étudiant n'a encore vu ce cours"
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-2 max-h-96 overflow-y-auto pr-2",
							children: viewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900",
									children: student.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400",
									children: student.viewed_at
								})]
							}, student.id))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-yellow-500" }),
								"N'ont pas vu (",
								notViewedStudents.length,
								")"
							]
						}), notViewedStudents.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Tous les étudiants ont vu ce cours"
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-2 max-h-96 overflow-y-auto pr-2",
							children: notViewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm p-2 bg-yellow-50 rounded-lg",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900",
									children: student.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400",
									children: student.matricule
								})]
							}, student.id))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }),
								"Leçons (",
								sortedLessons.length,
								")"
							]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: openModal,
							className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-cab-blue text-white rounded-lg text-xs font-medium hover:bg-cab-dark transition-colors",
							children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-4 h-4" }), "Ajouter une leçon"]
						})]
					}), sortedLessons.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-8",
						children: [
							/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-sm",
								children: "Aucune leçon pour ce cours"
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: openModal,
								className: "mt-2 inline-block text-cab-blue hover:text-cab-dark text-sm font-medium",
								children: "Ajouter votre première leçon →"
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "divide-y divide-gray-100",
						children: sortedLessons.map((lesson) => /* @__PURE__ */ jsx("div", {
							className: "p-4 hover:bg-gray-50 transition-colors",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsxs("span", {
													className: "text-sm font-medium text-gray-400",
													children: [String(lesson.order || 0).padStart(2, "0"), "."]
												}),
												/* @__PURE__ */ jsx(Link, {
													href: `/admin/cours/lesson/${lesson.id}`,
													className: "text-sm font-medium text-gray-900 hover:text-cab-blue transition-colors truncate",
													children: lesson.titre
												}),
												/* @__PURE__ */ jsx("span", {
													className: `px-2 py-0.5 rounded-full text-xs font-medium ${lesson.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
													children: lesson.is_active ? "Actif" : "Inactif"
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
												lesson.viewed_count !== void 0 && lesson.viewed_count > 0 && /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-gray-400",
													children: [lesson.viewed_count, " vues"]
												})
											]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1 flex-shrink-0",
									children: [
										/* @__PURE__ */ jsx(Link, {
											href: `/admin/cours/lesson/${lesson.id}`,
											className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
											title: "Voir la leçon",
											children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ jsx(Link, {
											href: `/admin/cours/lesson/${lesson.id}/edit`,
											className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
											title: "Modifier",
											children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => handleToggleLesson(lesson),
											className: `p-1.5 rounded-lg transition-colors ${lesson.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
											title: lesson.is_active ? "Désactiver" : "Activer",
											children: lesson.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => handleDeleteLesson(lesson),
											className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
											title: "Supprimer",
											children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-4 h-4" })
										})
									]
								})]
							})
						}, lesson.id))
					})]
				})
			]
		}), isModalOpen && /* @__PURE__ */ jsx("div", {
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
							className: "w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-gray-900",
							children: "Ajouter une leçon"
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeModal,
						className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100",
						children: /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-blue-700",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "ℹ️ Accès hérité du cours"
								}),
								/* @__PURE__ */ jsx("br", {}),
								cours.tranche_requise ? /* @__PURE__ */ jsxs(Fragment, { children: ["Cette leçon sera accessible aux étudiants ayant payé la ", /* @__PURE__ */ jsxs("strong", { children: ["Tranche ", cours.tranche_requise.numero] })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
									"Cette leçon sera accessible à ",
									/* @__PURE__ */ jsx("strong", { children: "tous les étudiants" }),
									" (aucune tranche requise)"
								] })
							]
						})
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Titre de la leçon ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: data.titre,
									onChange: (e) => setData("titre", e.target.value),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "Ex: Introduction à la maintenance réseau",
									required: true
								}),
								errors.titre && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.titre
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Description"
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: data.description,
									onChange: (e) => setData("description", e.target.value),
									rows: 2,
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
									placeholder: "Description de la leçon..."
								}),
								errors.description && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.description
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Contenu"
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: data.contenu,
									onChange: (e) => setData("contenu", e.target.value),
									rows: 4,
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
									placeholder: "Contenu textuel de la leçon..."
								}),
								errors.contenu && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.contenu
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-cab-blue" }), "Vidéo de la leçon (optionnel)"]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: "Titre de la vidéo"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: data.video_title,
										onChange: (e) => setData("video_title", e.target.value),
										className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Ex: Tutoriel réseau"
									})] }), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("label", {
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: "Fichier Vidéo (MP4, WebM, etc.)"
										}),
										!data.video ? /* @__PURE__ */ jsxs("label", {
											className: "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white",
											children: [
												/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-6 h-6 text-gray-400" }),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-500 mt-1",
													children: "Sélectionner une vidéo"
												}),
												/* @__PURE__ */ jsx("input", {
													type: "file",
													accept: "video/*",
													onChange: handleVideoChange,
													className: "hidden",
													ref: videoInputRef
												})
											]
										}) : /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 truncate",
												children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500 flex-shrink-0" }), /* @__PURE__ */ jsxs("span", {
													className: "text-xs font-medium text-gray-700 truncate",
													children: [
														data.video.name,
														" (",
														(data.video.size / 1048576).toFixed(1),
														" Mo)"
													]
												})]
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: removeVideo,
												className: "p-1 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors",
												title: "Supprimer la vidéo",
												children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" })
											})]
										}),
										errors.video && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-red-600",
											children: errors.video
										})
									] })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-semibold text-gray-700 mb-3",
										children: "Fichiers joints (optionnel)"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ jsxs("label", {
											className: "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white",
											children: [
												/* @__PURE__ */ jsx(PlusIcon, { className: "w-6 h-6 text-gray-400" }),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-500 mt-1",
													children: "Ajouter des fichiers"
												}),
												/* @__PURE__ */ jsx("input", {
													type: "file",
													multiple: true,
													onChange: handleFileChange,
													className: "hidden",
													ref: fileInputRef
												})
											]
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-400",
											children: "Max 20MB par fichier"
										})]
									}),
									filePreviews.length > 0 && /* @__PURE__ */ jsx("div", {
										className: "mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2",
										children: files.map((file, index) => /* @__PURE__ */ jsxs("div", {
											className: "relative bg-white rounded-lg p-2 border border-gray-200 flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4 text-blue-500" }),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-600 truncate flex-1",
													children: file.name
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => removeFile(index),
													className: "text-red-500 hover:text-red-700",
													children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
												})
											]
										}, index))
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: data.is_active,
										onChange: (e) => setData("is_active", e.target.checked),
										className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
									}), /* @__PURE__ */ jsx("label", {
										className: "text-sm text-gray-700",
										children: "Leçon active"
									})]
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Ordre"
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									value: data.order,
									onChange: (e) => setData("order", parseInt(e.target.value) || 0),
									className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									min: "0"
								})] })]
							}),
							uploadProgress !== null && /* @__PURE__ */ jsxs("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden",
									children: /* @__PURE__ */ jsx("div", {
										className: "h-full bg-cab-blue transition-all duration-200",
										style: { width: `${uploadProgress}%` }
									})
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 mt-1 text-center",
									children: uploadProgress < 100 ? `Envoi de la vidéo... ${uploadProgress}%` : "Traitement par le serveur..."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: closeModal,
									className: "flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
									children: "Annuler"
								}), /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50",
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
									}), "Envoi en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Ajouter la leçon"] })
								})]
							})
						]
					})]
				})]
			})
		})]
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-B4Hx8QJm.js.map