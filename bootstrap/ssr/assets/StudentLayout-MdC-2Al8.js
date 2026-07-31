import { n as NotificationBell, t as ToastContainer } from "./ToastContainer-CdIokmOQ.js";
import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftOnRectangleIcon, Bars3Icon, BookOpenIcon, ChartBarIcon, ChevronDownIcon, ClipboardDocumentListIcon, HomeIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/Layouts/StudentLayout.tsx
var StudentLayout = ({ children, title = "Tableau de bord" }) => {
	var _props$auth$user, _props$auth, _props$unreadCountsBy, _props$unreadCountsBy2, _props$unreadCountsBy3, _props$unreadCountsBy4, _props$unreadCountsBy5, _props$unreadCountsBy6;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { props, url } = usePage();
	const user = (_props$auth$user = (_props$auth = props.auth) === null || _props$auth === void 0 ? void 0 : _props$auth.user) !== null && _props$auth$user !== void 0 ? _props$auth$user : null;
	const coursCount = (_props$unreadCountsBy = (_props$unreadCountsBy2 = props.unreadCountsByType) === null || _props$unreadCountsBy2 === void 0 ? void 0 : _props$unreadCountsBy2["cours"]) !== null && _props$unreadCountsBy !== void 0 ? _props$unreadCountsBy : 0;
	const devoirCount = (_props$unreadCountsBy3 = (_props$unreadCountsBy4 = props.unreadCountsByType) === null || _props$unreadCountsBy4 === void 0 ? void 0 : _props$unreadCountsBy4["devoir"]) !== null && _props$unreadCountsBy3 !== void 0 ? _props$unreadCountsBy3 : 0;
	const evaluationCount = (_props$unreadCountsBy5 = (_props$unreadCountsBy6 = props.unreadCountsByType) === null || _props$unreadCountsBy6 === void 0 ? void 0 : _props$unreadCountsBy6["evaluation"]) !== null && _props$unreadCountsBy5 !== void 0 ? _props$unreadCountsBy5 : 0;
	const menuItems = [
		{
			label: "Tableau de bord",
			href: "/student/dashboard",
			icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-5 h-5" })
		},
		{
			label: "Mes cours",
			href: "/student/cours",
			icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" }),
			badge: coursCount
		},
		{
			label: "Mes devoirs",
			href: "/student/devoirs",
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" }),
			badge: devoirCount
		},
		{
			label: "Mes évaluations",
			href: "/student/evaluations",
			icon: /* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5" }),
			badge: evaluationCount
		},
		{
			label: "Mon profil",
			href: "/profil",
			icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5" })
		}
	];
	const getUserInitials = (user) => {
		var _user$name;
		if (!user) return "?";
		return ((_user$name = user.name) === null || _user$name === void 0 || (_user$name = _user$name.charAt(0)) === null || _user$name === void 0 ? void 0 : _user$name.toUpperCase()) || "?";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-50",
		children: [
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx("nav", {
				className: "fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setIsSidebarOpen(!isSidebarOpen),
							className: "lg:hidden p-2 rounded-lg hover:bg-gray-100",
							children: isSidebarOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6 text-gray-600" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "w-6 h-6 text-gray-600" })
						}), /* @__PURE__ */ jsxs(Link, {
							href: "/student/dashboard",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.jpeg",
								alt: "CAB",
								className: "h-8 w-8 rounded-full object-cover"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-lg font-bold text-gray-900 hidden sm:block",
								children: ["CAB ", /* @__PURE__ */ jsx("span", {
									className: "text-cab-red",
									children: "Étudiant"
								})]
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(NotificationBell, {}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
								className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-full bg-cab-blue text-white flex items-center justify-center text-sm font-semibold",
										children: getUserInitials(user)
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gray-700 hidden sm:block",
										children: (user === null || user === void 0 ? void 0 : user.name) || "Étudiant"
									}),
									/* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4 text-gray-400" })
								]
							}), isUserMenuOpen && user && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "px-4 py-2 border-b border-gray-100",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gray-900",
											children: user.name
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: user.email
										})]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: "/student/profil",
										className: "flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors",
										onClick: () => setIsUserMenuOpen(false),
										children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), "Mon profil"]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: "/logout",
										method: "post",
										as: "button",
										className: "flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors",
										children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-4 h-4" }), "Déconnexion"]
									})
								]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("aside", {
				className: `
                    fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200
                    transition-transform duration-300 ease-in-out overflow-hidden
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `,
				children: /* @__PURE__ */ jsxs("nav", {
					className: "h-full overflow-y-auto p-4 space-y-1 pb-24",
					children: [menuItems.map((item) => {
						const isActive = url === item.href || url.startsWith(item.href + "/");
						return /* @__PURE__ */ jsxs(Link, {
							href: item.href,
							className: `
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                    transition-colors duration-200
                                    ${isActive ? "bg-cab-blue text-white" : "text-gray-600 hover:bg-gray-100 hover:text-cab-blue"}
                                `,
							children: [
								item.icon,
								/* @__PURE__ */ jsx("span", {
									className: "flex-1",
									children: item.label
								}),
								!!item.badge && item.badge > 0 && /* @__PURE__ */ jsx("span", {
									className: `text-xs font-bold rounded-full px-2 py-0.5 ${isActive ? "bg-white text-cab-blue" : "bg-cab-red text-white"}`,
									children: item.badge > 9 ? "9+" : item.badge
								})
							]
						}, item.href);
					}), /* @__PURE__ */ jsx("div", {
						className: "pt-4 mt-4 border-t border-gray-200",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/logout",
							method: "post",
							as: "button",
							className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors",
							children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-5 h-5" }), "Déconnexion"]
						})
					})]
				})
			}),
			isSidebarOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-20 bg-black/50 lg:hidden",
				onClick: () => setIsSidebarOpen(false)
			}),
			/* @__PURE__ */ jsx("main", {
				className: "lg:ml-64 pt-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "p-4 md:p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Bienvenue sur votre espace étudiant"
						})]
					}), children]
				})
			})
		]
	});
};
//#endregion
export { StudentLayout as t };

//# sourceMappingURL=StudentLayout-MdC-2Al8.js.map