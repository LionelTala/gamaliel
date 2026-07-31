import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { SparklesIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Components/Hero/HeroSlide.tsx
var HeroSlide = ({ slide, isActive }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: `
        absolute inset-0 transition-opacity duration-1000 ease-in-out
        ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
      `,
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 bg-cover bg-center bg-no-repeat scale-105",
			style: { backgroundImage: `url('${slide.image}')` },
			children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cab-dark/90 via-cab-dark/70 to-transparent" })
		}), /* @__PURE__ */ jsx("div", {
			className: "relative z-10 h-full flex items-center",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-2xl",
					children: [
						slide.badge && /* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10 mb-6 animate-fade-in",
							children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-4 h-4" }), slide.badge]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-slide-up",
							children: slide.title.split("<br>").map((part, index) => /* @__PURE__ */ jsxs("span", { children: [part, index < slide.title.split("<br>").length - 1 && /* @__PURE__ */ jsx("br", {})] }, index))
						}),
						slide.subtitle && /* @__PURE__ */ jsx("p", {
							className: "mt-4 text-xl text-white/80 font-medium animate-slide-up",
							style: { animationDelay: "0.1s" },
							children: slide.subtitle
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-lg text-white/70 max-w-lg animate-slide-up",
							style: { animationDelay: "0.2s" },
							children: slide.description
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-wrap gap-4 animate-slide-up",
							style: { animationDelay: "0.3s" },
							children: [/* @__PURE__ */ jsxs(Link, {
								href: slide.ctaPrimary.link,
								className: "inline-flex items-center gap-2 px-8 py-4 bg-white text-cab-blue rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300",
								children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" }), slide.ctaPrimary.text]
							}), slide.ctaSecondary && /* @__PURE__ */ jsx(Link, {
								href: slide.ctaSecondary.link,
								className: "inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300",
								children: slide.ctaSecondary.text
							})]
						})
					]
				})
			})
		})]
	});
};
//#endregion
export { HeroSlide as default };

//# sourceMappingURL=HeroSlide-CItYGKXM.js.map