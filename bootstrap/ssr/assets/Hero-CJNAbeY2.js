import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/public/Components/Hero/Hero.tsx
var Hero = ({ scrollTo }) => {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden",
		"aria-labelledby": "hero-title",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 z-0",
			children: [/* @__PURE__ */ jsx("img", {
				src: "/assets/images/img1.jpeg",
				alt: "CAB Informatique - Formation professionnelle",
				className: "w-full h-full object-cover",
				loading: "eager",
				fetchPriority: "high"
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-hero" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsx("nav", {
				"aria-label": "Fil d'Ariane",
				className: "text-xs text-white/60 mb-6",
				children: /* @__PURE__ */ jsxs("ol", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "hover:text-white transition-colors",
							children: "Accueil"
						}) }),
						/* @__PURE__ */ jsx("li", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("li", {
							className: "text-white/80",
							"aria-current": "page",
							children: "CAB Informatique"
						})
					]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid md:grid-cols-2 gap-12 items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-6 animate-slide-up",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/10",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.jpeg",
								alt: "CAB",
								className: "h-6 w-auto object-contain",
								loading: "lazy"
							}), /* @__PURE__ */ jsx("span", { children: "Rentrée académique 2026-2027" })]
						}),
						/* @__PURE__ */ jsxs("h1", {
							id: "hero-title",
							className: "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white",
							children: [
								"Formez-vous ",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "text-white/90",
									children: "aujourd'hui"
								}),
								" ",
								/* @__PURE__ */ jsx("br", {}),
								"pour ",
								/* @__PURE__ */ jsx("span", {
									className: "text-white/90",
									children: "réussir demain"
								})
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-lg text-white/80 max-w-lg",
							children: [
								/* @__PURE__ */ jsx("strong", {
									className: "text-white",
									children: "CAB Informatique"
								}),
								" forme aux métiers de l'informatique depuis",
								" ",
								/* @__PURE__ */ jsx("strong", {
									className: "text-white",
									children: "22 ans"
								}),
								". Découvrez nos ",
								/* @__PURE__ */ jsx("strong", {
									className: "text-white",
									children: "formations professionnelles"
								}),
								" à Douala, Yaoundé et Bafoussam."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-8",
							"aria-label": "Statistiques clés",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "text-center",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-3xl font-extrabold text-white",
										"aria-label": "22 ans",
										children: "22+"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-white/60 font-medium",
										children: "Ans d'expérience"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-px h-10 bg-white/20",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-center",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-3xl font-extrabold text-white",
										"aria-label": "6 filières",
										children: "6"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-white/60 font-medium",
										children: "Filières"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-px h-10 bg-white/20",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-center",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-3xl font-extrabold text-white",
										"aria-label": "3 campus",
										children: "3"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-white/60 font-medium",
										children: "Campus"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-4 pt-2",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => scrollTo("certification"),
								className: "inline-flex items-center gap-2 px-8 py-4 bg-white text-cab-blue rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer",
								children: [/* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "📝"
								}), " Certification en ligne"]
							}), /* @__PURE__ */ jsxs("button", {
								onClick: () => scrollTo("formations"),
								className: "inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/60 transition-all cursor-pointer",
								children: [/* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "📚"
								}), " Découvrir"]
							})]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative",
					"data-reveal": true,
					"data-reveal-delay": "2",
					children: /* @__PURE__ */ jsx("div", {
						className: "bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: "/assets/images/logo.jpeg",
									alt: "CAB Informatique",
									className: "w-24 h-24 mx-auto mb-4 object-contain rounded-full border-4 border-cab-blue p-2 bg-white",
									loading: "lazy"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "text-2xl font-bold text-gray-900",
									children: "Rentrée académique"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xl font-semibold text-cab-red mt-2",
									children: "Lundi 05 Octobre 2026"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap justify-center gap-2 mt-6",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "CEP"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "BEPC"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "PROBATOIRE"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "BACCALAURÉAT"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "Étudiants"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-blue-50 text-cab-blue rounded-full text-xs font-semibold",
											children: "Professionnels"
										})
									]
								})
							]
						})
					})
				})]
			})]
		})]
	});
};
//#endregion
export { Hero as default };

//# sourceMappingURL=Hero-CJNAbeY2.js.map