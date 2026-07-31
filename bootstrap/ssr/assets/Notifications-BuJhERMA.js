import { t as StudentLayout } from "./StudentLayout-MdC-2Al8.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BellIcon, CheckCircleIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Cours/Notifications.tsx
function Notifications({ notifications, unreadCount }) {
	const [loading, setLoading] = useState(null);
	const handleMarkAsRead = (id) => {
		setLoading(id);
		router.post(`/student/cours/notifications/${id}/mark-read`, {}, {
			preserveScroll: true,
			onSuccess: () => {
				setLoading(null);
				router.reload();
			},
			onError: () => {
				setLoading(null);
			}
		});
	};
	const handleMarkAllAsRead = () => {
		router.post("/student/cours/notifications/mark-all-read", {}, {
			preserveScroll: true,
			onSuccess: () => {
				router.reload();
			}
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Notifications - Étudiant" }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: "Notifications",
		children: [/* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx(BellIcon, { className: "w-6 h-6 text-cab-blue" }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-gray-900",
							children: "Notifications de cours"
						}),
						unreadCount > 0 && /* @__PURE__ */ jsxs("span", {
							className: "px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium",
							children: [
								unreadCount,
								" non lue",
								unreadCount > 1 ? "s" : ""
							]
						})
					]
				}), unreadCount > 0 && /* @__PURE__ */ jsx("button", {
					onClick: handleMarkAllAsRead,
					className: "text-sm text-cab-blue hover:text-cab-dark font-medium transition-colors",
					children: "Tout marquer comme lu"
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: notifications.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100",
				children: [
					/* @__PURE__ */ jsx(BellIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune notification"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-400 text-xs mt-1",
						children: "Les notifications de cours apparaîtront ici"
					})
				]
			}) : notifications.map((notification) => /* @__PURE__ */ jsx("div", {
				className: `bg-white rounded-2xl p-5 shadow-sm border transition-all ${notification.is_read ? "border-gray-100" : "border-cab-blue/30 bg-blue-50/30"}`,
				children: /* @__PURE__ */ jsx("div", {
					className: "flex items-start justify-between",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-semibold text-gray-900",
									children: notification.titre
								}), !notification.is_read && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-cab-blue animate-pulse" })]
							}),
							notification.description && /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 mt-1",
								children: notification.description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mt-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400",
									children: notification.created_at
								}), notification.video_url && /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1 text-xs text-red-500",
									children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-4 h-4" }), "Vidéo"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mt-3",
								children: [
									/* @__PURE__ */ jsxs(Link, {
										href: `/student/cours/${notification.cours_id}`,
										className: "inline-flex items-center gap-1 text-sm text-cab-blue hover:underline",
										children: [/* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }), "Voir le cours"]
									}),
									!notification.is_read && /* @__PURE__ */ jsx("button", {
										onClick: () => handleMarkAsRead(notification.id),
										disabled: loading === notification.id,
										className: "text-sm text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50",
										children: loading === notification.id ? "⏳" : "Marquer comme lu"
									}),
									notification.is_read && /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-green-600 flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Lu"]
									})
								]
							})
						]
					})
				})
			}, notification.id))
		})]
	})] });
}
//#endregion
export { Notifications as default };

//# sourceMappingURL=Notifications-BuJhERMA.js.map