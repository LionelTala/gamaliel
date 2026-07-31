import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as StudentLayout } from "./StudentLayout-MdC-2Al8.js";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, CalendarIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Profile/Index.tsx
function Profile({ user, student }) {
	var _props$auth;
	const { props } = usePage();
	const authUser = (_props$auth = props.auth) === null || _props$auth === void 0 ? void 0 : _props$auth.user;
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const isStudent = !!student;
	const isAdmin = (authUser === null || authUser === void 0 ? void 0 : authUser.role) === "super_admin" || (authUser === null || authUser === void 0 ? void 0 : authUser.role) === "admin_centre" || (authUser === null || authUser === void 0 ? void 0 : authUser.role) === "admin";
	const Layout = isAdmin ? AdminLayout : StudentLayout;
	const layoutTitle = isAdmin ? "Mon profil" : "Mon profil";
	const { data, setData, post, processing, errors } = useForm(isStudent ? {
		first_name: (student === null || student === void 0 ? void 0 : student.first_name) || "",
		last_name: (student === null || student === void 0 ? void 0 : student.last_name) || "",
		phone: (student === null || student === void 0 ? void 0 : student.phone) || "",
		school_level: (student === null || student === void 0 ? void 0 : student.school_level) || "",
		birth_date: (student === null || student === void 0 ? void 0 : student.birth_date) || "",
		address: (student === null || student === void 0 ? void 0 : student.address) || "",
		city: (student === null || student === void 0 ? void 0 : student.city) || "",
		current_password: "",
		new_password: "",
		new_password_confirmation: ""
	} : {
		name: user.name || "",
		email: user.email || "",
		current_password: "",
		new_password: "",
		new_password_confirmation: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/profil", {
			preserveScroll: true,
			onSuccess: () => {
				setData("current_password", "");
				setData("new_password", "");
				setData("new_password_confirmation", "");
				setIsChangingPassword(false);
			}
		});
	};
	const ProfileContent = () => {
		var _student$first_name, _student$last_name, _user$name;
		return /* @__PURE__ */ jsx("div", {
			className: "max-w-3xl mx-auto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "bg-gradient-to-r from-cab-blue to-cab-blue/80 px-6 py-8 text-white",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold",
							children: isStudent ? ((student === null || student === void 0 || (_student$first_name = student.first_name) === null || _student$first_name === void 0 ? void 0 : _student$first_name.charAt(0)) || "") + ((student === null || student === void 0 || (_student$last_name = student.last_name) === null || _student$last_name === void 0 ? void 0 : _student$last_name.charAt(0)) || "") : ((_user$name = user.name) === null || _user$name === void 0 || (_user$name = _user$name.charAt(0)) === null || _user$name === void 0 ? void 0 : _user$name.toUpperCase()) || "A"
						}), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-bold",
								children: isStudent ? student === null || student === void 0 ? void 0 : student.full_name : user.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/80 text-sm",
								children: user.role_label
							}),
							isStudent && (student === null || student === void 0 ? void 0 : student.matricule) && /* @__PURE__ */ jsxs("p", {
								className: "text-white/60 text-sm mt-1",
								children: ["🎓 Matricule: ", /* @__PURE__ */ jsx("span", {
									className: "font-mono font-semibold",
									children: student.matricule
								})]
							}),
							isStudent && /* @__PURE__ */ jsxs("p", {
								className: "text-white/60 text-sm",
								children: [(student === null || student === void 0 ? void 0 : student.vague) ? `Vague: ${student.vague}` : "", (student === null || student === void 0 ? void 0 : student.certification) ? `Certification: ${student.certification}` : ""]
							})
						] })]
					})
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "p-6 space-y-6",
					children: [
						!isStudent && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "name",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Nom d'utilisateur ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "name",
									type: "text",
									value: data.name,
									onChange: (e) => setData("name", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								})]
							}),
							errors.name && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.name
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "email",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
									children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-5 h-5 text-gray-400" })
								}), /* @__PURE__ */ jsx("input", {
									id: "email",
									type: "email",
									value: data.email,
									onChange: (e) => setData("email", e.target.value),
									className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
									required: true
								})]
							}),
							errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.email
							})
						] })] }),
						isStudent && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										htmlFor: "first_name",
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: ["Prénom ", /* @__PURE__ */ jsx("span", {
											className: "text-red-500",
											children: "*"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("div", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
											children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
										}), /* @__PURE__ */ jsx("input", {
											id: "first_name",
											type: "text",
											value: data.first_name,
											onChange: (e) => setData("first_name", e.target.value),
											className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
											required: true
										})]
									}),
									errors.first_name && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-red-600",
										children: errors.first_name
									})
								] }), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("label", {
										htmlFor: "last_name",
										className: "block text-sm font-medium text-gray-700 mb-1",
										children: ["Nom ", /* @__PURE__ */ jsx("span", {
											className: "text-red-500",
											children: "*"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("div", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
											children: /* @__PURE__ */ jsx(UserIcon, { className: "w-5 h-5 text-gray-400" })
										}), /* @__PURE__ */ jsx("input", {
											id: "last_name",
											type: "text",
											value: data.last_name,
											onChange: (e) => setData("last_name", e.target.value),
											className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
											required: true
										})]
									}),
									errors.last_name && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-red-600",
										children: errors.last_name
									})
								] })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("label", {
									htmlFor: "phone",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: ["Téléphone ", /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(PhoneIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "phone",
										type: "tel",
										value: data.phone,
										onChange: (e) => setData("phone", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										required: true
									})]
								}),
								errors.phone && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.phone
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "school_level",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Niveau scolaire"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsxs("select", {
										id: "school_level",
										value: data.school_level,
										onChange: (e) => setData("school_level", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "-- Sélectionnez --"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "CEP",
												children: "CEP"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "BEPC",
												children: "BEPC"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "PROBATOIRE",
												children: "Probatoire"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "BAC",
												children: "Baccalauréat"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "BAC+2",
												children: "BAC+2"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "LICENCE",
												children: "Licence"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "MASTER",
												children: "Master ou plus"
											})
										]
									})]
								}),
								errors.school_level && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.school_level
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "birth_date",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Date de naissance"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "birth_date",
										type: "date",
										value: data.birth_date,
										onChange: (e) => setData("birth_date", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
									})]
								}),
								errors.birth_date && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.birth_date
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "address",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Adresse"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "address",
										type: "text",
										value: data.address,
										onChange: (e) => setData("address", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Votre adresse"
									})]
								}),
								errors.address && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.address
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "city",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Ville"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(MapPinIcon, { className: "w-5 h-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "city",
										type: "text",
										value: data.city,
										onChange: (e) => setData("city", e.target.value),
										className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "Votre ville"
									})]
								}),
								errors.city && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.city
								})
							] })
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "border-t border-gray-200 pt-6",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setIsChangingPassword(!isChangingPassword),
								className: "flex items-center gap-2 text-sm font-medium text-cab-blue hover:text-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(KeyIcon, { className: "w-5 h-5" }), isChangingPassword ? "Annuler le changement de mot de passe" : "Changer mon mot de passe"]
							}), isChangingPassword && /* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											htmlFor: "current_password",
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: ["Mot de passe actuel ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("input", {
												id: "current_password",
												type: showCurrentPassword ? "text" : "password",
												value: data.current_password,
												onChange: (e) => setData("current_password", e.target.value),
												className: "w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
												placeholder: "Votre mot de passe actuel"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setShowCurrentPassword(!showCurrentPassword),
												className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
												children: showCurrentPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											})]
										}),
										errors.current_password && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-red-600",
											children: errors.current_password
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											htmlFor: "new_password",
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: ["Nouveau mot de passe ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("input", {
												id: "new_password",
												type: showNewPassword ? "text" : "password",
												value: data.new_password,
												onChange: (e) => setData("new_password", e.target.value),
												className: "w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
												placeholder: "Nouveau mot de passe (min 8 caractères)",
												minLength: 8
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setShowNewPassword(!showNewPassword),
												className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
												children: showNewPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											})]
										}),
										errors.new_password && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-red-600",
											children: errors.new_password
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											htmlFor: "new_password_confirmation",
											className: "block text-sm font-medium text-gray-700 mb-1",
											children: ["Confirmer ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("input", {
												id: "new_password_confirmation",
												type: showConfirmPassword ? "text" : "password",
												value: data.new_password_confirmation,
												onChange: (e) => setData("new_password_confirmation", e.target.value),
												className: "w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
												placeholder: "Confirmer le nouveau mot de passe"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setShowConfirmPassword(!showConfirmPassword),
												className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
												children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											})]
										}),
										errors.new_password_confirmation && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-red-600",
											children: errors.new_password_confirmation
										})
									] })
								]
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
							}), "Enregistrement..."] }) : "Enregistrer les modifications"
						})
					]
				})]
			})
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Mon profil - CAB Informatique" }), /* @__PURE__ */ jsx(Layout, {
		title: layoutTitle,
		children: /* @__PURE__ */ jsx(ProfileContent, {})
	})] });
}
//#endregion
export { Profile as default };

//# sourceMappingURL=Index-CLffptdd2.js.map