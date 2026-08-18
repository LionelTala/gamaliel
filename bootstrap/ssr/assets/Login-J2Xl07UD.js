import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, PhoneIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Auth/Login.tsx
function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [loginType, setLoginType] = useState("email");
	const { data, setData, post, processing, errors } = useForm({
		login: "",
		password: "",
		remember: false
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/login");
	};
	const getInputPlaceholder = () => {
		return loginType === "email" ? "exemple@email.com" : "6XX XXX XXX";
	};
	const getInputType = () => {
		return loginType === "email" ? "email" : "tel";
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Connexion — Institut Gamaliel" }), /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex bg-gamaliel-paper",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden lg:flex lg:w-[44%] relative overflow-hidden bg-gamaliel-navy-deep text-white flex-col justify-between p-12",
			children: [
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/20 blur-[100px]" }),
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-28 -right-10 w-96 h-96 rounded-full bg-gamaliel-orange/20 blur-[110px]" }),
				/* @__PURE__ */ jsxs(Link, {
					href: "/",
					className: "relative flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/assets/images/logo.png",
						alt: "Institut Gamaliel",
						className: "h-11 w-11 rounded-xl object-cover"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-display font-bold text-lg",
						children: "Institut Gamaliel"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 mb-6",
							children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4 text-gamaliel-green" }), "Espace personnel sécurisé"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "font-display font-bold text-3xl xl:text-4xl leading-tight",
							children: [
								"Retrouvez votre",
								/* @__PURE__ */ jsx("br", {}),
								"parcours de formation"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-white/60 mt-4 max-w-sm leading-relaxed",
							children: "Accédez à vos formations, votre pré-inscription et vos échanges avec l'équipe pédagogique de l'Institut Gamaliel."
						})
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "relative text-xs text-white/35",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Institut de Formation Professionnelle Gamaliel — Douala"
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-md w-full space-y-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center lg:text-left",
						children: [
							/* @__PURE__ */ jsx(Link, {
								href: "/",
								className: "inline-block lg:hidden mb-6",
								children: /* @__PURE__ */ jsx("img", {
									src: "/assets/images/logo.png",
									alt: "Institut Gamaliel",
									className: "h-14 w-14 rounded-xl object-cover mx-auto"
								})
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-display text-3xl font-bold text-gamaliel-navy-deep",
								children: "Connexion"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-gamaliel-navy/60",
								children: "Connectez-vous avec votre email ou votre numéro de téléphone"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "bg-gamaliel-green/10 border border-gamaliel-green/25 rounded-xl p-3.5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-5 h-5 text-gamaliel-green-deep flex-shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gamaliel-navy/80",
								children: [
									"Après ",
									/* @__PURE__ */ jsx("strong", { children: "5 tentatives échouées" }),
									", votre accès sera bloqué pendant ",
									/* @__PURE__ */ jsx("strong", { children: "5 minutes" }),
									"."
								]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("form", {
						className: "space-y-6",
						onSubmit: handleSubmit,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative flex rounded-xl bg-white border border-gamaliel-navy/10 p-1",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-out",
										style: {
											background: "linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)",
											width: "calc(50% - 4px)",
											left: loginType === "email" ? "4px" : "calc(50% + 0px)"
										}
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setLoginType("email"),
										className: `relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${loginType === "email" ? "text-white" : "text-gamaliel-navy/50 hover:text-gamaliel-navy"}`,
										children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4 h-4 inline mr-2 -mt-0.5" }), "Email"]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setLoginType("phone"),
										className: `relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${loginType === "phone" ? "text-white" : "text-gamaliel-navy/50 hover:text-gamaliel-navy"}`,
										children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 inline mr-2 -mt-0.5" }), "Téléphone"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											htmlFor: "login",
											className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
											children: [loginType === "email" ? "Adresse email" : "Numéro de téléphone", /* @__PURE__ */ jsx("span", {
												className: "text-gamaliel-red ml-1",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("div", {
												className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
												children: loginType === "email" ? /* @__PURE__ */ jsx(EnvelopeIcon, { className: "h-5 w-5 text-gamaliel-navy/30" }) : /* @__PURE__ */ jsx(PhoneIcon, { className: "h-5 w-5 text-gamaliel-navy/30" })
											}), /* @__PURE__ */ jsx("input", {
												id: "login",
												type: getInputType(),
												value: data.login,
												onChange: (e) => setData("login", e.target.value),
												className: `appearance-none block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gamaliel-navy/30 text-gamaliel-navy-deep bg-white focus:outline-none focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors ${errors.login ? "border-gamaliel-red" : "border-gamaliel-navy/15"}`,
												placeholder: getInputPlaceholder(),
												required: true
											})]
										}),
										errors.login && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-gamaliel-red",
											children: errors.login
										})
									] }),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("label", {
											htmlFor: "password",
											className: "block text-sm font-medium text-gamaliel-navy/80 mb-1",
											children: ["Mot de passe ", /* @__PURE__ */ jsx("span", {
												className: "text-gamaliel-red",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [
												/* @__PURE__ */ jsx("div", {
													className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
													children: /* @__PURE__ */ jsx(LockClosedIcon, { className: "h-5 w-5 text-gamaliel-navy/30" })
												}),
												/* @__PURE__ */ jsx("input", {
													id: "password",
													type: showPassword ? "text" : "password",
													value: data.password,
													onChange: (e) => setData("password", e.target.value),
													className: `appearance-none block w-full pl-10 pr-12 py-3 border rounded-xl placeholder-gamaliel-navy/30 text-gamaliel-navy-deep bg-white focus:outline-none focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors ${errors.password ? "border-gamaliel-red" : "border-gamaliel-navy/15"}`,
													placeholder: "••••••••",
													required: true
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setShowPassword(!showPassword),
													className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gamaliel-navy/30 hover:text-gamaliel-navy/60",
													children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5" })
												})
											]
										}),
										errors.password && /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm text-gamaliel-red",
											children: errors.password
										})
									] }),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center",
											children: [/* @__PURE__ */ jsx("input", {
												id: "remember",
												type: "checkbox",
												checked: data.remember,
												onChange: (e) => setData("remember", e.target.checked),
												className: "h-4 w-4 text-gamaliel-orange focus:ring-gamaliel-orange border-gamaliel-navy/20 rounded"
											}), /* @__PURE__ */ jsx("label", {
												htmlFor: "remember",
												className: "ml-2 block text-sm text-gamaliel-navy/70",
												children: "Se souvenir de moi"
											})]
										}), /* @__PURE__ */ jsx(Link, {
											href: "#",
											className: "text-sm font-semibold text-gamaliel-orange hover:text-gamaliel-red transition-colors",
											children: "Mot de passe oublié ?"
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "group relative w-full flex justify-center items-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5",
								style: {
									background: "linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)",
									boxShadow: "0 10px 20px -6px rgba(225,58,75,0.4)"
								},
								children: processing ? /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxs("svg", {
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
									}), "Connexion en cours..."]
								}) : "Se connecter"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-center lg:text-left",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/",
							className: "inline-flex items-center gap-1.5 text-sm text-gamaliel-navy/50 hover:text-gamaliel-orange transition-colors",
							children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-3.5 h-3.5" }), "Retour à l'accueil"]
						})
					})
				]
			})
		})]
	})] });
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-J2Xl07UD.js.map