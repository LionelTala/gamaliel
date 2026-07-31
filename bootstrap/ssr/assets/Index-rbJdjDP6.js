import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Bibliotheque/Index.tsx
function Index({ livres, filters }) {
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [expandedDescriptions, setExpandedDescriptions] = useState(/* @__PURE__ */ new Set());
	const handleSearch = (e) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		router.get(`/bibliotheque${params.toString() ? "?" + params.toString() : ""}`);
	};
	const toggleDescription = (livreId) => {
		setExpandedDescriptions((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(livreId)) newSet.delete(livreId);
			else newSet.add(livreId);
			return newSet;
		});
	};
	const truncateText = (text, maxLength = 100) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + "...";
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, {
		title: "Bibliothèque — CAB Informatique",
		children: /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Découvrez notre sélection de livres de formation en informatique, gestion et métiers techniques."
		})
	}), /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "relative pt-32 pb-16",
			style: { background: "linear-gradient(to right, #0a1f4d, #1a56db)" },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-4xl md:text-5xl font-extrabold text-white",
						children: ["Notre ", /* @__PURE__ */ jsx("span", {
							className: "text-[#d21f2f]",
							children: "Bibliothèque"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-xl max-w-2xl mx-auto",
						style: { color: "rgba(255,255,255,0.8)" },
						children: "Des ouvrages sélectionnés pour accompagner votre formation"
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-8 bg-white border-b border-gray-100",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-3 items-center",
					children: [/* @__PURE__ */ jsx("form", {
						onSubmit: handleSearch,
						className: "flex-1 min-w-[200px]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
								children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-gray-400" })
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								placeholder: "Rechercher un livre...",
								className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors text-sm"
							})]
						})
					}), filters.search && /* @__PURE__ */ jsxs("button", {
						onClick: () => {
							setSearchTerm("");
							router.get("/bibliotheque");
						},
						className: "px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }), "Effacer"]
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-12 bg-gray-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: livres.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-16",
					children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-lg",
						children: "Aucun livre trouvé"
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: livres.data.map((livre) => {
						var _livre$description;
						const isExpanded = expandedDescriptions.has(livre.id);
						const shouldTruncate = (((_livre$description = livre.description) === null || _livre$description === void 0 ? void 0 : _livre$description.length) || 0) > 100;
						return /* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative aspect-[3/4] bg-gray-100 overflow-hidden",
								children: [livre.image_url ? /* @__PURE__ */ jsx("img", {
									src: livre.image_url,
									alt: livre.titre,
									className: "w-full h-full object-cover",
									loading: "lazy"
								}) : /* @__PURE__ */ jsx("div", {
									className: "w-full h-full flex items-center justify-center",
									children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-16 h-16 text-gray-300" })
								}), livre.prix && /* @__PURE__ */ jsxs("div", {
									className: "absolute top-3 right-3 bg-[#1a56db] text-white px-3 py-1 rounded-full text-sm font-semibold",
									children: [Number(livre.prix).toLocaleString(), " FCFA"]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-5 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-gray-900 mb-2",
										children: livre.titre
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-600 leading-relaxed",
											children: isExpanded || !shouldTruncate ? livre.description : truncateText(livre.description, 100)
										}), shouldTruncate && /* @__PURE__ */ jsx("button", {
											onClick: () => toggleDescription(livre.id),
											className: "mt-1 text-sm text-[#1a56db] hover:text-[#0d2a63] font-medium flex items-center gap-1 transition-colors",
											children: isExpanded ? /* @__PURE__ */ jsxs(Fragment, { children: ["Voir moins", /* @__PURE__ */ jsx(ChevronUpIcon, { className: "w-4 h-4" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Voir plus", /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4" })] })
										})]
									}),
									livre.lien_achat && /* @__PURE__ */ jsx("div", {
										className: "mt-4 pt-4 border-t border-gray-100",
										children: /* @__PURE__ */ jsxs("a", {
											href: livre.lien_achat,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#1a56db] text-white rounded-xl text-sm font-semibold hover:bg-[#0d2a63] transition-colors",
											children: [/* @__PURE__ */ jsx(ShoppingBagIcon, { className: "w-4 h-4" }), "Acheter ce livre"]
										})
									})
								]
							})]
						}, livre.id);
					})
				})
			})
		})
	] })] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-rbJdjDP6.js.map