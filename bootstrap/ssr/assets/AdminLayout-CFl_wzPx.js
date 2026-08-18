import { n as NotificationBell, t as ToastContainer } from "./ToastContainer-CdIokmOQ.js";
import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AcademicCapIcon, ArrowLeftOnRectangleIcon, BanknotesIcon, Bars3Icon, BookOpenIcon, CalendarIcon, ChartBarIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, ClipboardDocumentListIcon, Cog6ToothIcon, CreditCardIcon, EyeIcon, HomeIcon, PhotoIcon, UserGroupIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Components/Layouts/AdminLayout.tsx
var AdminLayout = ({ children, title = "Tableau de bord" }) => {
	var _props$auth$user, _props$auth, _props$unreadCountsBy, _props$unreadCountsBy2, _props$unreadCountsBy3, _props$unreadCountsBy4, _props$unreadCountsBy5, _props$unreadCountsBy6, _props$unreadCountsBy7, _props$unreadCountsBy8;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { props, url } = usePage();
	const user = (_props$auth$user = (_props$auth = props.auth) === null || _props$auth === void 0 ? void 0 : _props$auth.user) !== null && _props$auth$user !== void 0 ? _props$auth$user : null;
	const devoirCount = (_props$unreadCountsBy = (_props$unreadCountsBy2 = props.unreadCountsByType) === null || _props$unreadCountsBy2 === void 0 ? void 0 : _props$unreadCountsBy2["devoir"]) !== null && _props$unreadCountsBy !== void 0 ? _props$unreadCountsBy : 0;
	const candidatureCount = (_props$unreadCountsBy3 = (_props$unreadCountsBy4 = props.unreadCountsByType) === null || _props$unreadCountsBy4 === void 0 ? void 0 : _props$unreadCountsBy4["candidature"]) !== null && _props$unreadCountsBy3 !== void 0 ? _props$unreadCountsBy3 : 0;
	const evaluationCount = (_props$unreadCountsBy5 = (_props$unreadCountsBy6 = props.unreadCountsByType) === null || _props$unreadCountsBy6 === void 0 ? void 0 : _props$unreadCountsBy6["evaluation"]) !== null && _props$unreadCountsBy5 !== void 0 ? _props$unreadCountsBy5 : 0;
	const contactCount = (_props$unreadCountsBy7 = (_props$unreadCountsBy8 = props.unreadCountsByType) === null || _props$unreadCountsBy8 === void 0 ? void 0 : _props$unreadCountsBy8["contact"]) !== null && _props$unreadCountsBy7 !== void 0 ? _props$unreadCountsBy7 : 0;
	const canManageUsers = (user === null || user === void 0 ? void 0 : user.role) === "super_admin" || (user === null || user === void 0 ? void 0 : user.role) === "admin_centre";
	const menuGroups = [
		{
			title: "Gestion du Site",
			icon: /* @__PURE__ */ jsx(Cog6ToothIcon, { className: "w-5 h-5" }),
			badgeCount: contactCount,
			items: [
				{
					label: "Statistiques visites",
					href: "/admin/stats-visites",
					icon: /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" })
				},
				{
					label: "Galerie",
					href: "/admin/galerie",
					icon: /* @__PURE__ */ jsx(PhotoIcon, { className: "w-4 h-4" })
				},
				{
					label: "Activités",
					href: "/admin/activites",
					icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4" })
				},
				{
					label: "Messages de contact",
					href: "/admin/contacts",
					icon: /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "w-4 h-4" }),
					badge: contactCount
				}
			]
		},
		{
			title: "Inscriptions",
			icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" }),
			badgeCount: candidatureCount,
			items: [{
				label: "Pré-inscriptions",
				href: "/admin/pre-inscriptions",
				icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-4 h-4" })
			}, {
				label: "Candidatures",
				href: "/admin/candidatures",
				icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-4 h-4" }),
				badge: candidatureCount
			}]
		},
		{
			title: "Gestion Académique",
			icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" }),
			badgeCount: devoirCount + evaluationCount,
			items: [
				{
					label: "Formations",
					href: "/admin/formations",
					icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-4 h-4" })
				},
				{
					label: "Vagues",
					href: "/admin/vagues",
					icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4" })
				},
				{
					label: "Étudiants",
					href: "/admin/students",
					icon: /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-4 h-4" })
				},
				{
					label: "Cours",
					href: "/admin/cours",
					icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-4 h-4" })
				},
				{
					label: "Devoirs",
					href: "/admin/devoirs",
					icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-4 h-4" }),
					badge: devoirCount
				},
				{
					label: "Évaluations",
					href: "/admin/evaluations",
					icon: /* @__PURE__ */ jsx(ChartBarIcon, { className: "w-4 h-4" }),
					badge: evaluationCount
				}
			]
		},
		{
			title: "Finance",
			icon: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-5 h-5" }),
			items: [{
				label: "Tranches",
				href: "/admin/tranches",
				icon: /* @__PURE__ */ jsx(BanknotesIcon, { className: "w-4 h-4" })
			}, {
				label: "Paiements",
				href: "/admin/paiements",
				icon: /* @__PURE__ */ jsx(CreditCardIcon, { className: "w-4 h-4" })
			}]
		}
	];
	const [openGroups, setOpenGroups] = useState({});
	useEffect(() => {
		const activeState = {};
		menuGroups.forEach((group) => {
			if (group.items.some((item) => url === item.href || url.startsWith(item.href + "/"))) activeState[group.title] = true;
		});
		setOpenGroups((prev) => ({
			...prev,
			...activeState
		}));
	}, [url]);
	const toggleGroup = (title) => {
		setOpenGroups((prev) => ({
			...prev,
			[title]: !prev[title]
		}));
	};
	const getUserInitials = (user) => {
		if (!user) return "?";
		return user.name.charAt(0).toUpperCase();
	};
	const getRoleLabel = (role) => {
		return role ? {
			super_admin: "Super Administrateur",
			admin_centre: "Admin Centre",
			admin: "Administrateur",
			student_online: "Étudiant en ligne"
		}[role] || role : "";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gamaliel-paper",
		children: [
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx("nav", {
				className: "fixed top-0 left-0 right-0 z-40 bg-white border-b border-gamaliel-navy/10",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setIsSidebarOpen(!isSidebarOpen),
							className: "lg:hidden p-2 rounded-lg hover:bg-gamaliel-navy/5",
							children: isSidebarOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6 text-gamaliel-navy/70" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "w-6 h-6 text-gamaliel-navy/70" })
						}), /* @__PURE__ */ jsxs(Link, {
							href: "/admin/dashboard",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.png",
								alt: "Institut Gamaliel",
								className: "h-8 w-8 rounded-lg object-cover"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-lg font-bold text-gamaliel-navy-deep hidden sm:block",
								children: ["Gamaliel ", /* @__PURE__ */ jsx("span", {
									className: "text-gamaliel-orange",
									children: "Admin"
								})]
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(NotificationBell, {}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
								className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gamaliel-navy/5 transition-colors",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-full bg-gamaliel-navy-deep text-white flex items-center justify-center text-sm font-semibold",
										children: getUserInitials(user)
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gamaliel-navy/80 hidden sm:block",
										children: (user === null || user === void 0 ? void 0 : user.name) || "Utilisateur"
									}),
									/* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4 text-gamaliel-navy/40" })
								]
							}), isUserMenuOpen && user && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gamaliel-navy/10 py-1 z-50",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "px-4 py-2 border-b border-gamaliel-navy/10",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gamaliel-navy-deep",
											children: user.name
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gamaliel-navy/50",
											children: user.email
										}),
										/* @__PURE__ */ jsx("span", {
											className: "inline-block mt-1 px-2 py-0.5 bg-gamaliel-navy/10 text-gamaliel-navy rounded-full text-xs font-medium",
											children: getRoleLabel(user.role)
										})
									]
								}), /* @__PURE__ */ jsxs(Link, {
									href: "/logout",
									method: "post",
									as: "button",
									className: "flex items-center gap-2 w-full px-4 py-2 text-sm text-gamaliel-red hover:bg-gamaliel-red/10 transition-colors",
									children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-4 h-4" }), "Déconnexion"]
								})]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("aside", {
				className: `
                    fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gamaliel-navy/10
                    transition-transform duration-300 ease-in-out overflow-hidden
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `,
				children: /* @__PURE__ */ jsxs("nav", {
					className: "h-full overflow-y-auto p-4 space-y-1.5 pb-24",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							href: "/admin/dashboard",
							className: `
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url === "/admin/dashboard" ? "bg-gamaliel-navy-deep text-white" : "text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep"}
                        `,
							children: [/* @__PURE__ */ jsx(HomeIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "flex-1",
								children: "Tableau de bord"
							})]
						}),
						canManageUsers && /* @__PURE__ */ jsxs(Link, {
							href: "/admin/users",
							className: `
                                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                transition-colors duration-200
                                ${url.startsWith("/admin/users") ? "bg-gamaliel-navy-deep text-white" : "text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep"}
                            `,
							children: [/* @__PURE__ */ jsx(UserGroupIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "flex-1",
								children: "Utilisateurs"
							})]
						}),
						menuGroups.map((group) => {
							const isOpen = !!openGroups[group.title];
							const hasActiveChild = group.items.some((item) => url === item.href || url.startsWith(item.href + "/"));
							return /* @__PURE__ */ jsxs("div", {
								className: "space-y-1 pt-1",
								children: [/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => toggleGroup(group.title),
									className: `
                                        flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium
                                        transition-colors duration-200
                                        ${hasActiveChild ? "text-gamaliel-navy-deep font-semibold bg-gamaliel-navy/5" : "text-gamaliel-navy/70 hover:bg-gamaliel-navy/5"}
                                    `,
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [group.icon, /* @__PURE__ */ jsx("span", { children: group.title })]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [!isOpen && !!group.badgeCount && group.badgeCount > 0 && /* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold rounded-full px-2 py-0.5 text-white",
											style: { background: "linear-gradient(135deg, #FD7D0F, #E13A4B)" },
											children: group.badgeCount > 9 ? "9+" : group.badgeCount
										}), /* @__PURE__ */ jsx(ChevronDownIcon, { className: `w-4 h-4 text-gamaliel-navy/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` })]
									})]
								}), isOpen && /* @__PURE__ */ jsx("div", {
									className: "pl-6 space-y-1 border-l-2 border-gamaliel-navy/10 ml-4",
									children: group.items.map((item) => {
										const isActive = url === item.href || url.startsWith(item.href + "/");
										return /* @__PURE__ */ jsxs(Link, {
											href: item.href,
											className: `
                                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                                                        transition-colors duration-200
                                                        ${isActive ? "bg-gamaliel-navy-deep text-white" : "text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep"}
                                                    `,
											children: [
												item.icon,
												/* @__PURE__ */ jsx("span", {
													className: "flex-1",
													children: item.label
												}),
												!!item.badge && item.badge > 0 && /* @__PURE__ */ jsx("span", {
													className: "text-xs font-bold rounded-full px-2 py-0.5",
													style: isActive ? {
														backgroundColor: "#fff",
														color: "#153B62"
													} : {
														background: "linear-gradient(135deg, #FD7D0F, #E13A4B)",
														color: "#fff"
													},
													children: item.badge > 9 ? "9+" : item.badge
												})
											]
										}, item.href);
									})
								})]
							}, group.title);
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/profil",
							className: `
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url.startsWith("/profil") ? "bg-gamaliel-navy-deep text-white" : "text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep"}
                        `,
							children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "flex-1",
								children: "Mon Profil"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pt-4 mt-4 border-t border-gamaliel-navy/10",
							children: /* @__PURE__ */ jsxs(Link, {
								href: "/logout",
								method: "post",
								as: "button",
								className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gamaliel-red hover:bg-gamaliel-red/10 transition-colors",
								children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-5 h-5" }), "Déconnexion"]
							})
						})
					]
				})
			}),
			isSidebarOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-20 bg-gamaliel-navy-deep/50 lg:hidden",
				onClick: () => setIsSidebarOpen(false)
			}),
			/* @__PURE__ */ jsx("main", {
				className: "lg:ml-64 pt-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "p-4 md:p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gamaliel-navy-deep",
							children: title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gamaliel-navy/50",
							children: "Bienvenue sur votre espace d'administration"
						})]
					}), children]
				})
			})
		]
	});
};
//#endregion
export { AdminLayout as t };

//# sourceMappingURL=AdminLayout-CFl_wzPx.js.map