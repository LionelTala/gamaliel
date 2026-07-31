import { t as PublicLayout } from "./PublicLayout-DbkKDi4M.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, BookOpenIcon, BuildingOfficeIcon, LinkIcon, ShoppingBagIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Bibliotheque.tsx
function Show({ livre, suggestions }) {
	const cleanDescription = livre.description ? livre.description.replace(/(\r\n|\n|\r)/gm, " ").slice(0, 155) + "..." : `Découvrez le livre "${livre.titre}" ${livre.auteur ? `de ${livre.auteur}` : ""} disponible à la bibliothèque du centre de formation CAB Informatique au Cameroun.`;
	const jsonLdBook = {
		"@context": "https://schema.org",
		"@type": "Book",
		"name": livre.titre,
		"description": livre.description,
		"url": `https://cab-informatique.com/bibliotheque/${livre.slug}`,
		"image": livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg",
		"author": {
			"@type": "Person",
			"name": livre.auteur || "Auteur non spécifié"
		},
		"publisher": {
			"@type": "Organization",
			"name": livre.editeur || "CAB Informatique"
		},
		"genre": livre.categorie || "Informatique",
		"offers": {
			"@type": "Offer",
			"price": livre.prix ? livre.prix.toString() : "0",
			"priceCurrency": "XAF",
			"availability": livre.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
			"url": livre.lien_achat || `https://cab-informatique.com/bibliotheque/${livre.slug}`
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: `${livre.titre} ${livre.auteur ? `par ${livre.auteur}` : ""} | Bibliothèque CAB Informatique` }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: cleanDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: `${livre.titre}, livre ${livre.auteur || ""}, livre informatique Cameroun, bibliothèque CAB Informatique, manuel ${livre.categorie || ""}`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow, max-snippet:-1, max-image-preview:large"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: `https://cab-informatique.com/bibliotheque/${livre.slug}`
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "book"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: `${livre.titre} | Bibliothèque CAB Informatique`
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: cleanDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: "CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: "fr_CM"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: `https://cab-informatique.com/bibliotheque/${livre.slug}`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:site",
			content: "@cabinfo"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: `${livre.titre} | Bibliothèque CAB Informatique`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: cleanDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLdBook)
		})
	] }), /* @__PURE__ */ jsx(PublicLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "py-12 bg-gray-50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/bibliotheque",
					className: "inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a56db] transition-colors mb-6",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la bibliothèque"]
				}),
				/* @__PURE__ */ jsx("article", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-8 p-6 md:p-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden",
							children: [livre.image_url ? /* @__PURE__ */ jsx("img", {
								src: livre.image_url,
								alt: `Couverture du livre ${livre.titre} - Bibliothèque CAB Informatique`,
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-full h-full flex items-center justify-center",
								children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-24 h-24 text-gray-300" })
							}), livre.prix && /* @__PURE__ */ jsxs("div", {
								className: "absolute top-4 right-4 bg-[#1a56db] text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md",
								children: [livre.prix.toLocaleString(), " FCFA"]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ jsx("h1", {
										className: "text-3xl font-bold text-gray-900 mb-2",
										children: livre.titre
									}),
									livre.auteur && /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-gray-600 mb-1",
										children: [/* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }), /* @__PURE__ */ jsxs("span", { children: ["Auteur : ", /* @__PURE__ */ jsx("strong", { children: livre.auteur })] })]
									}),
									livre.editeur && /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-gray-600 mb-4",
										children: [/* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-4 h-4" }), /* @__PURE__ */ jsxs("span", { children: ["Éditeur : ", livre.editeur] })]
									}),
									livre.categorie && /* @__PURE__ */ jsxs("span", {
										className: "inline-block text-xs bg-blue-50 text-[#1a56db] font-medium px-3 py-1 rounded-full mb-4",
										children: ["Catégorie : ", livre.categorie]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "prose prose-sm max-w-none",
										children: [/* @__PURE__ */ jsx("h2", {
											className: "text-base font-semibold text-gray-900 mb-2",
											children: "Résumé du livre :"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-gray-700 leading-relaxed whitespace-pre-line",
											children: livre.description || "Aucune description disponible pour cet ouvrage."
										})]
									}),
									livre.stock > 0 ? /* @__PURE__ */ jsxs("div", {
										className: "mt-4 flex items-center gap-2 text-green-600",
										children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }), /* @__PURE__ */ jsxs("span", {
											className: "text-sm font-medium",
											children: [
												"Disponible en stock (",
												livre.stock,
												" exemplaires)"
											]
										})]
									}) : /* @__PURE__ */ jsxs("div", {
										className: "mt-4 flex items-center gap-2 text-red-600",
										children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full" }), /* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium",
											children: "Actuellement en rupture de stock"
										})]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-6 pt-6 border-t border-gray-100 space-y-3",
								children: [
									livre.lien_achat && /* @__PURE__ */ jsxs("a", {
										href: livre.lien_achat,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1a56db] text-white rounded-xl font-semibold hover:bg-[#0d2a63] transition-colors",
										children: [/* @__PURE__ */ jsx(ShoppingBagIcon, { className: "w-5 h-5" }), "Acheter ce livre"]
									}),
									livre.lien_achat && /* @__PURE__ */ jsxs("a", {
										href: livre.lien_achat,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors",
										children: [/* @__PURE__ */ jsx(LinkIcon, { className: "w-4 h-4" }), "Accéder au lien de vente externe"]
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: "/certification",
										className: "flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#1a56db] to-[#0d2a63] text-white rounded-xl font-semibold hover:shadow-lg transition-all",
										children: [/* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" }), "Découvrir nos certifications professionnelles"]
									})
								]
							})]
						})]
					})
				}),
				suggestions.length > 0 && /* @__PURE__ */ jsxs("aside", {
					className: "mt-12",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-gray-900 mb-6",
						children: "Autres ouvrages recommandés"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6",
						children: suggestions.map((suggestion) => /* @__PURE__ */ jsx(Link, {
							href: `/bibliotheque/${suggestion.slug}`,
							children: /* @__PURE__ */ jsxs("div", {
								className: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative aspect-[3/4] bg-gray-100 overflow-hidden",
									children: [suggestion.image_url ? /* @__PURE__ */ jsx("img", {
										src: suggestion.image_url,
										alt: `Livre ${suggestion.titre} - CAB Informatique`,
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
										loading: "lazy"
									}) : /* @__PURE__ */ jsx("div", {
										className: "w-full h-full flex items-center justify-center",
										children: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300" })
									}), suggestion.prix && /* @__PURE__ */ jsxs("div", {
										className: "absolute top-2 right-2 bg-[#1a56db] text-white px-2 py-0.5 rounded-full text-xs font-semibold",
										children: [suggestion.prix.toLocaleString(), " FCFA"]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-3",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-[#1a56db] transition-colors",
										children: suggestion.titre
									}), suggestion.auteur && /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500 mt-1",
										children: suggestion.auteur
									})]
								})]
							})
						}, suggestion.id))
					})]
				})
			]
		})
	}) })] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Bibliotheque-Cpywygup.js.map