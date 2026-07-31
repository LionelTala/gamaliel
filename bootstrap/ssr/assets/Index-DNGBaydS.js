import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BuildingOfficeIcon, CheckCircleIcon, PencilSquareIcon, PlusIcon, ShieldCheckIcon, SparklesIcon, TrashIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Users/Index.tsx
function Index({ users, canCreate }) {
	const getRoleBadge = (role) => {
		const configs = {
			super_admin: {
				icon: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-4 h-4" }),
				color: "bg-purple-100 text-purple-700",
				label: "Super Admin"
			},
			admin_centre: {
				icon: /* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-4 h-4" }),
				color: "bg-blue-100 text-blue-700",
				label: "Admin Centre"
			},
			admin: {
				icon: /* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4" }),
				color: "bg-green-100 text-green-700",
				label: "Admin"
			},
			student_online: {
				icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }),
				color: "bg-orange-100 text-orange-700",
				label: "Étudiant En Ligne"
			},
			student_certif: {
				icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }),
				color: "bg-red-100 text-red-700",
				label: "Étudiant Certification"
			}
		};
		const config = configs[role] || configs.admin;
		return /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`,
			children: [config.icon, config.label]
		});
	};
	const handleToggleActive = (user) => {
		if (confirm(`Confirmer la ${user.is_active ? "désactivation" : "activation"} de ${user.name} ?`)) router.post(`/admin/users/${user.id}/toggle-active`);
	};
	const handleDelete = (user) => {
		if (confirm(`Confirmer la suppression de ${user.name} ? Cette action est irréversible.`)) router.delete(`/admin/users/${user.id}`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des utilisateurs - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des utilisateurs",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [
						users.total,
						" utilisateur",
						users.total > 1 ? "s" : "",
						" au total"
					]
				}), canCreate && /* @__PURE__ */ jsxs(Link, {
					href: "/admin/users/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvel utilisateur"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Utilisateur"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Rôle"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Dernière connexion"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-gray-50 transition-colors",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold",
												children: user.name.charAt(0).toUpperCase()
											}), /* @__PURE__ */ jsx("span", {
												className: "font-medium text-gray-900",
												children: user.name
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-600",
										children: user.email
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: getRoleBadge(user.role)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
											children: [user.is_active ? /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), user.is_active ? "Actif" : "Inactif"]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-gray-500 text-xs",
										children: user.last_login_at || "Jamais"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												user.can_edit && /* @__PURE__ */ jsx(Link, {
													href: `/admin/users/${user.id}/edit`,
													className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
													title: "Modifier",
													children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
												}),
												user.can_toggle && /* @__PURE__ */ jsx("button", {
													onClick: () => handleToggleActive(user),
													className: `p-1.5 rounded-lg transition-colors ${user.is_active ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`,
													title: user.is_active ? "Désactiver" : "Activer",
													children: user.is_active ? /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" })
												}),
												user.can_delete && /* @__PURE__ */ jsx("button", {
													onClick: () => handleDelete(user),
													className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
													title: "Supprimer",
													children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
												}),
												!user.can_edit && !user.can_toggle && !user.can_delete && /* @__PURE__ */ jsx("span", {
													className: "text-xs text-gray-300",
													children: "—"
												})
											]
										})
									})
								]
							}, user.id))
						})]
					})
				}), users.data.length === 0 && /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucun utilisateur trouvé"
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Pagination, {
				links: users.links,
				from: users.from,
				to: users.to,
				total: users.total
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-DNGBaydS.js.map