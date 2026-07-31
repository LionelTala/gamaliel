import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Users/Create.tsx
function Create({ roles }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		role: roles[0] || "",
		is_active: true
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/admin/users");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Créer un utilisateur - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Créer un utilisateur",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/users",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "name",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Nom d'utilisateur ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "name",
								type: "text",
								value: data.name,
								onChange: (e) => setData("name", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "ex: jean.dupont",
								required: true
							}),
							errors.name && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.name
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "email",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "email",
								type: "email",
								value: data.email,
								onChange: (e) => setData("email", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "exemple@email.com",
								required: true
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.email
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "password",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Mot de passe ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									id: "password",
									type: showPassword ? "text" : "password",
									value: data.password,
									onChange: (e) => setData("password", e.target.value),
									className: "w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									placeholder: "••••••••",
									required: true,
									minLength: 8
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
									children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
								})]
							}),
							errors.password && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.password
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
							htmlFor: "password_confirmation",
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: ["Confirmer le mot de passe ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("input", {
								id: "password_confirmation",
								type: showPasswordConfirmation ? "text" : "password",
								value: data.password_confirmation,
								onChange: (e) => setData("password_confirmation", e.target.value),
								className: "w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								placeholder: "••••••••",
								required: true,
								minLength: 8
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setShowPasswordConfirmation(!showPasswordConfirmation),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
								children: showPasswordConfirmation ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
							})]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "role",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Rôle ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("select", {
								id: "role",
								value: data.role,
								onChange: (e) => setData("role", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								children: roles.map((role) => /* @__PURE__ */ jsxs("option", {
									value: role,
									children: [
										role === "super_admin" && "Super Administrateur",
										role === "admin_centre" && "Admin Centre",
										role === "admin" && "Administrateur"
									]
								}, role))
							}),
							errors.role && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.role
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								id: "is_active",
								type: "checkbox",
								checked: data.is_active,
								onChange: (e) => setData("is_active", e.target.checked),
								className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
							}), /* @__PURE__ */ jsx("label", {
								htmlFor: "is_active",
								className: "text-sm text-gray-700",
								children: "Activer le compte immédiatement"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
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
							}), "Création en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "Créer l'utilisateur"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Create as default };

//# sourceMappingURL=Create-Bxm-xvVE.js.map