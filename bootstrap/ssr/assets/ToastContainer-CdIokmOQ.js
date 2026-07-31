import { Link, router, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/Notifications/NotificationDropdown.tsx
var NotificationDropdown = ({ notifications = [], onMarkAsRead, onMarkAllAsRead, onClose }) => {
	const list = notifications !== null && notifications !== void 0 ? notifications : [];
	const handleClick = (notification) => {
		if (!notification.read_at) {
			router.post(`/notifications/${notification.id}/read`, {}, { preserveScroll: true });
			onMarkAsRead(notification.id);
		}
		onClose();
	};
	const handleMarkAllAsRead = () => {
		router.post("/notifications/read-all", {}, { preserveScroll: true });
		onMarkAllAsRead();
	};
	const getNotificationIcon = (type) => {
		switch (type) {
			case "candidature": return "📝";
			case "cours": return "📚";
			case "devoir": return "📄";
			case "evaluation": return "📊";
			case "message": return "💬";
			default: return "🔔";
		}
	};
	const getTypeLabel = (type) => {
		switch (type) {
			case "candidature": return "Candidature";
			case "cours": return "Cours";
			case "devoir": return "Devoir";
			case "evaluation": return "Évaluation";
			case "message": return "Message";
			default: return "Info";
		}
	};
	const getTypeColor = (type) => {
		switch (type) {
			case "candidature": return "bg-blue-100 text-blue-700";
			case "cours": return "bg-green-100 text-green-700";
			case "devoir": return "bg-orange-100 text-orange-700";
			case "evaluation": return "bg-purple-100 text-purple-700";
			case "message": return "bg-pink-100 text-pink-700";
			default: return "bg-gray-100 text-gray-700";
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-semibold text-gray-900",
				children: "Notifications"
			}), list.some((n) => !n.read_at) && /* @__PURE__ */ jsxs("button", {
				onClick: handleMarkAllAsRead,
				className: "text-xs text-cab-blue hover:text-cab-dark flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(CheckIcon, { className: "w-4 h-4" }), "Tout marquer comme lu"]
			})]
		}), list.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-gray-500 text-center py-8",
			children: "Aucune notification"
		}) : /* @__PURE__ */ jsx("div", {
			className: "divide-y divide-gray-100",
			children: list.map((notification) => {
				var _notification$data, _notification$data2;
				return /* @__PURE__ */ jsx(Link, {
					href: notification.link || "#",
					onClick: () => handleClick(notification),
					className: `block px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read_at ? "bg-blue-50/50" : ""}`,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-2",
						children: [!notification.read_at && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 mt-1.5 rounded-full bg-cab-blue flex-shrink-0" }), /* @__PURE__ */ jsxs("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm",
											children: getNotificationIcon(notification.type)
										}),
										/* @__PURE__ */ jsx("span", {
											className: `text-xs px-1.5 py-0.5 rounded-full font-medium ${getTypeColor(notification.type)}`,
											children: getTypeLabel(notification.type)
										}),
										((_notification$data = notification.data) === null || _notification$data === void 0 ? void 0 : _notification$data.cours_type) && /* @__PURE__ */ jsx("span", {
											className: `text-xs px-1.5 py-0.5 rounded-full font-medium ${notification.data.cours_type === "vague" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
											children: notification.data.cours_type === "vague" ? "Vague" : "Certification"
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-gray-900 mt-1",
									children: notification.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-500 mt-0.5 line-clamp-2",
									children: notification.message
								}),
								((_notification$data2 = notification.data) === null || _notification$data2 === void 0 ? void 0 : _notification$data2.video_url) && /* @__PURE__ */ jsxs("a", {
									href: notification.data.video_url,
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: (e) => e.stopPropagation(),
									className: "inline-flex items-center gap-1 text-xs text-cab-blue hover:underline mt-1",
									children: ["▶️ ", notification.data.video_title || "Voir la vidéo"]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: notification.created_at
								})
							]
						})]
					})
				}, notification.id);
			})
		})]
	});
};
//#endregion
//#region resources/js/lib/toast.ts
function showToast(message, type = "success", duration = 5e3) {
	window.dispatchEvent(new CustomEvent("app-toast", { detail: {
		message,
		type,
		duration
	} }));
}
//#endregion
//#region resources/js/Components/Notifications/NotificationBell.tsx
var NotificationBell = () => {
	var _props$unreadNotifica, _props$auth;
	const { props } = usePage();
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const dropdownRef = useRef(null);
	const unreadCount = (_props$unreadNotifica = props.unreadNotificationsCount) !== null && _props$unreadNotifica !== void 0 ? _props$unreadNotifica : 0;
	const userId = (_props$auth = props.auth) === null || _props$auth === void 0 || (_props$auth = _props$auth.user) === null || _props$auth === void 0 ? void 0 : _props$auth.id;
	useEffect(() => {
		if (!window.Echo || !userId) return;
		const channelName = `user.${userId}`;
		window.Echo.private(channelName).listen(".notification.created", (data) => {
			setNotifications((prev) => {
				if ((prev !== null && prev !== void 0 ? prev : []).some((n) => n.id === data.id)) return prev;
				return [data, ...prev !== null && prev !== void 0 ? prev : []];
			});
			showToast(`📚 ${data.title} — ${data.message}`, "success", 1e4);
			router.reload({ only: ["unreadNotificationsCount"] });
		});
		return () => {
			try {
				window.Echo.leave(channelName);
			} catch {}
		};
	}, [userId]);
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const fetchNotifications = async () => {
		try {
			const res = await fetch("/notifications", { headers: { Accept: "application/json" } });
			if (!res.ok) {
				setNotifications([]);
				return;
			}
			const data = await res.json();
			setNotifications(Array.isArray(data) ? data : Array.isArray(data === null || data === void 0 ? void 0 : data.notifications) ? data.notifications : []);
		} catch {
			setNotifications([]);
		}
	};
	const toggleDropdown = () => {
		if (!isOpen) fetchNotifications();
		setIsOpen(!isOpen);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		ref: dropdownRef,
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: toggleDropdown,
			className: "relative p-2 rounded-lg hover:bg-gray-100 transition-colors",
			children: [/* @__PURE__ */ jsx(BellIcon, { className: "w-6 h-6 text-gray-600" }), unreadCount > 0 && /* @__PURE__ */ jsx("span", {
				className: "absolute -top-1 -right-1 bg-cab-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center",
				children: unreadCount > 9 ? "9+" : unreadCount
			})]
		}), isOpen && /* @__PURE__ */ jsx(NotificationDropdown, {
			notifications,
			onMarkAsRead: (id) => {
				setNotifications((prev) => (prev !== null && prev !== void 0 ? prev : []).filter((n) => n.id !== id));
				router.reload({ only: ["unreadNotificationsCount"] });
			},
			onMarkAllAsRead: () => {
				setNotifications([]);
				router.reload({ only: ["unreadNotificationsCount"] });
			},
			onClose: () => setIsOpen(false)
		})]
	});
};
//#endregion
//#region resources/js/Components/UI/ToastContainer.tsx
var ToastContainer = () => {
	const [toastData, setToastData] = useState(null);
	const timerRef = useRef(null);
	const { props } = usePage();
	const flash = props.flash;
	const showToast = (message, type, duration = 5e3) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setToastData({
			message,
			type,
			duration
		});
		timerRef.current = setTimeout(() => setToastData(null), duration);
	};
	useEffect(() => {
		if (flash === null || flash === void 0 ? void 0 : flash.success) showToast(flash.success, "success");
		else if (flash === null || flash === void 0 ? void 0 : flash.error) showToast(flash.error, "error");
	}, [flash]);
	useEffect(() => {
		const handler = (e) => {
			var _detail$type;
			const detail = e.detail;
			showToast(detail.message, (_detail$type = detail.type) !== null && _detail$type !== void 0 ? _detail$type : "success", detail.duration);
		};
		window.addEventListener("app-toast", handler);
		return () => window.removeEventListener("app-toast", handler);
	}, []);
	if (!toastData) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "fixed top-20 right-4 z-50 max-w-md w-full",
		children: /* @__PURE__ */ jsx("div", {
			className: `rounded-lg shadow-lg p-4 border-l-4 ${toastData.type === "success" ? "bg-green-50 border-green-500 text-green-800" : "bg-red-50 border-red-500 text-red-800"}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xl",
						children: toastData.type === "success" ? "🔔" : "❌"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 text-sm",
						children: toastData.message
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setToastData(null),
						className: "text-gray-400 hover:text-gray-600",
						children: "✕"
					})
				]
			})
		})
	});
};
//#endregion
export { NotificationBell as n, ToastContainer as t };

//# sourceMappingURL=ToastContainer-CdIokmOQ.js.map