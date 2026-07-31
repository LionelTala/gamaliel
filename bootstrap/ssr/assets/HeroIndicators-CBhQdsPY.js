import { jsx } from "react/jsx-runtime";
//#region resources/js/Pages/public/Components/Hero/HeroIndicators.tsx
var HeroIndicators = ({ total, current, onSelect }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2",
		children: Array.from({ length: total }).map((_, index) => /* @__PURE__ */ jsx("button", {
			onClick: () => onSelect(index),
			className: `
            transition-all duration-300 rounded-full
            ${current === index ? "w-10 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"}
          `,
			"aria-label": `Aller à la slide ${index + 1}`,
			"aria-current": current === index ? "true" : "false"
		}, index))
	});
};
//#endregion
export { HeroIndicators as default };

//# sourceMappingURL=HeroIndicators-CBhQdsPY.js.map