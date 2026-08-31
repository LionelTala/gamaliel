import { t as AdminLayout } from "./AdminLayout-BD3FfVJf.js";
import { Head, Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChatBubbleLeftRightIcon, ChevronLeftIcon, ChevronRightIcon, EnvelopeIcon, MagnifyingGlassIcon, PhoneIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Contacts.tsx
var COLORS = {
	navy: "#153B62",
	navyDeep: "#0D2844",
	navyMuted: "rgba(21,59,98,0.7)",
	navyFaint: "rgba(21,59,98,0.5)",
	navyBorder: "rgba(21,59,98,0.1)",
	navySoftBg: "rgba(21,59,98,0.05)",
	green: "#6FA30E",
	greenSoftBg: "rgba(111,163,14,0.12)",
	red: "#E13A4B",
	redSoftBg: "rgba(225,58,75,0.1)",
	paper: "#FAFAF8",
	white: "#FFFFFF"
};
function Contacts({ contacts }) {
	const [selected, setSelected] = useState(null);
	const [search, setSearch] = useState("");
	const [deletingId, setDeletingId] = useState(null);
	const filtered = contacts.data.filter((c) => {
		var _c$email;
		const q = search.trim().toLowerCase();
		if (!q) return true;
		return c.nom.toLowerCase().includes(q) || c.telephone.toLowerCase().includes(q) || ((_c$email = c.email) !== null && _c$email !== void 0 ? _c$email : "").toLowerCase().includes(q) || c.message.toLowerCase().includes(q);
	});
	const unreadCount = contacts.data.filter((c) => !c.is_read).length;
	const openMessage = (contact) => {
		setSelected(contact);
		if (!contact.is_read) router.patch(`/admin/contacts/${contact.id}/read`, {}, {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				contact.is_read = true;
			}
		});
	};
	const closeMessage = () => setSelected(null);
	const confirmDelete = (contact) => {
		if (!window.confirm(`Supprimer définitivement le message de ${contact.nom} ?`)) return;
		setDeletingId(contact.id);
		router.delete(`/admin/contacts/${contact.id}`, {
			preserveScroll: true,
			onSuccess: () => {
				if ((selected === null || selected === void 0 ? void 0 : selected.id) === contact.id) closeMessage();
			},
			onFinish: () => setDeletingId(null)
		});
	};
	const formatDate = (iso) => {
		return new Date(iso).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	const excerpt = (text, len = 90) => text.length > len ? `${text.slice(0, len)}…` : text;
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Messages de contact",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "Messages de contact — Admin Gamaliel" }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
								style: { backgroundColor: COLORS.greenSoftBg },
								children: /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, {
									className: "w-5 h-5",
									style: { color: COLORS.green }
								})
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "text-sm font-semibold",
								style: { color: COLORS.navyDeep },
								children: [
									contacts.total,
									" message",
									contacts.total > 1 ? "s" : "",
									" au total"
								]
							}), unreadCount > 0 && /* @__PURE__ */ jsxs("p", {
								className: "text-xs",
								style: { color: COLORS.red },
								children: [
									unreadCount,
									" non lu",
									unreadCount > 1 ? "s" : ""
								]
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative w-full sm:w-72",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
								children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, {
									className: "w-4 h-4",
									style: { color: COLORS.navyFaint }
								})
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Rechercher un nom, un numéro...",
								className: "w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-colors",
								style: {
									borderColor: COLORS.navyBorder,
									backgroundColor: COLORS.white,
									color: COLORS.navyDeep
								},
								onFocus: (e) => e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.green}55`,
								onBlur: (e) => e.currentTarget.style.boxShadow = "none"
							})]
						})]
					}),
					filtered.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border p-12 text-center",
						style: {
							backgroundColor: COLORS.white,
							borderColor: COLORS.navyBorder
						},
						children: [/* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, {
							className: "w-12 h-12 mx-auto mb-3",
							style: { color: COLORS.navyBorder }
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm",
							style: { color: COLORS.navyFaint },
							children: search ? "Aucun message ne correspond à cette recherche." : "Aucun message reçu pour le moment."
						})]
					}) : /* @__PURE__ */ jsx("div", {
						className: "rounded-2xl border overflow-hidden",
						style: {
							backgroundColor: COLORS.white,
							borderColor: COLORS.navyBorder
						},
						children: /* @__PURE__ */ jsx("ul", {
							className: "divide-y",
							style: { borderColor: COLORS.navyBorder },
							children: filtered.map((contact) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
								onClick: () => openMessage(contact),
								className: "w-full text-left flex items-start gap-4 px-5 py-4 transition-colors",
								style: { backgroundColor: contact.is_read ? "transparent" : COLORS.greenSoftBg },
								onMouseEnter: (e) => e.currentTarget.style.backgroundColor = COLORS.navySoftBg,
								onMouseLeave: (e) => e.currentTarget.style.backgroundColor = contact.is_read ? "transparent" : COLORS.greenSoftBg,
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "pt-1.5 shrink-0",
										children: /* @__PURE__ */ jsx("span", {
											className: "block w-2 h-2 rounded-full",
											style: { backgroundColor: contact.is_read ? "transparent" : COLORS.green }
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
										style: {
											backgroundColor: COLORS.navyDeep,
											color: COLORS.white
										},
										children: contact.nom.charAt(0).toUpperCase()
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("p", {
													className: "text-sm truncate",
													style: {
														color: COLORS.navyDeep,
														fontWeight: contact.is_read ? 500 : 700
													},
													children: [contact.nom, contact.sujet && /* @__PURE__ */ jsx("span", {
														className: "ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium",
														style: {
															backgroundColor: COLORS.navySoftBg,
															color: COLORS.navy
														},
														children: contact.sujet
													})]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs shrink-0",
													style: { color: COLORS.navyFaint },
													children: formatDate(contact.created_at)
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm mt-0.5 truncate",
												style: { color: COLORS.navyFaint },
												children: excerpt(contact.message)
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-xs mt-1 flex items-center gap-3",
												style: { color: COLORS.navyFaint },
												children: [/* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(PhoneIcon, { className: "w-3.5 h-3.5" }), contact.telephone]
												}), contact.email && /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-3.5 h-3.5" }), contact.email]
												})]
											})
										]
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: (e) => {
											e.stopPropagation();
											confirmDelete(contact);
										},
										disabled: deletingId === contact.id,
										className: "p-2 rounded-lg transition-colors shrink-0 disabled:opacity-40",
										style: { color: COLORS.red },
										title: "Supprimer",
										children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-4 h-4" })
									})
								]
							}) }, contact.id))
						})
					}),
					contacts.last_page > 1 && /* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center gap-1.5 pt-2",
						children: contacts.links.map((link, i) => {
							link.label.includes("Previous") || link.label.includes("Next");
							const label = link.label.includes("Previous") ? /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-4 h-4" }) : link.label.includes("Next") ? /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-4 h-4" }) : link.label;
							if (!link.url) return /* @__PURE__ */ jsx("span", {
								className: "w-9 h-9 flex items-center justify-center rounded-lg text-sm",
								style: { color: COLORS.navyBorder },
								children: label
							}, i);
							return /* @__PURE__ */ jsx(Link, {
								href: link.url,
								preserveScroll: true,
								className: "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
								style: link.active ? {
									backgroundColor: COLORS.navyDeep,
									color: COLORS.white
								} : {
									color: COLORS.navyMuted,
									backgroundColor: COLORS.white,
									border: `1px solid ${COLORS.navyBorder}`
								},
								children: label
							}, i);
						})
					})
				]
			}),
			selected && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[999] flex items-center justify-center p-4",
				style: {
					backgroundColor: "rgba(13,40,68,0.6)",
					backdropFilter: "blur(4px)"
				},
				onClick: closeMessage,
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl",
					style: { backgroundColor: COLORS.white },
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "sticky top-0 px-6 py-4 rounded-t-3xl flex items-center justify-between border-b",
						style: {
							backgroundColor: COLORS.white,
							borderColor: COLORS.navyBorder
						},
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold",
								style: {
									backgroundColor: COLORS.navyDeep,
									color: COLORS.white
								},
								children: selected.nom.charAt(0).toUpperCase()
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-base font-bold",
								style: { color: COLORS.navyDeep },
								children: selected.nom
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs",
								style: { color: COLORS.navyFaint },
								children: formatDate(selected.created_at)
							})] })]
						}), /* @__PURE__ */ jsx("button", {
							onClick: closeMessage,
							className: "p-2 rounded-full transition-colors",
							style: { color: COLORS.navyFaint },
							children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-6 space-y-5",
						children: [
							selected.sujet && /* @__PURE__ */ jsx("span", {
								className: "inline-block px-3 py-1 rounded-full text-xs font-semibold",
								style: {
									backgroundColor: COLORS.navySoftBg,
									color: COLORS.navy
								},
								children: selected.sujet
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-xs font-semibold uppercase tracking-wide mb-2",
								style: { color: COLORS.navyFaint },
								children: "Message"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm leading-relaxed whitespace-pre-line",
								style: { color: COLORS.navyDeep },
								children: selected.message
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-3 pt-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl p-3 text-center",
									style: { backgroundColor: COLORS.paper },
									children: [
										/* @__PURE__ */ jsx(PhoneIcon, {
											className: "w-4 h-4 mx-auto mb-1",
											style: { color: COLORS.green }
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs",
											style: { color: COLORS.navyFaint },
											children: "Téléphone"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold",
											style: { color: COLORS.navyDeep },
											children: selected.telephone
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "rounded-xl p-3 text-center",
									style: { backgroundColor: COLORS.paper },
									children: [
										/* @__PURE__ */ jsx(EnvelopeIcon, {
											className: "w-4 h-4 mx-auto mb-1",
											style: { color: COLORS.green }
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs",
											style: { color: COLORS.navyFaint },
											children: "Email"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold truncate",
											style: { color: COLORS.navyDeep },
											children: selected.email || "—"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row gap-3 pt-3 border-t",
								style: { borderColor: COLORS.navyBorder },
								children: [/* @__PURE__ */ jsxs("a", {
									href: `https://wa.me/${selected.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${selected.nom}, merci pour votre message à l'Institut Gamaliel.`)}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all",
									style: { backgroundColor: "#25D366" },
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", { d: "M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.63 13.49L3 21l3.65-1.36a8.9 8.9 0 0 0 4.34 1.13h.01c4.94 0 9.09-4.15 9.09-9.09 0-2.42-1.06-4.7-2.49-5.36zM12.05 19.1a7.5 7.5 0 0 1-3.83-1.06l-.27-.16-2.66 1 .95-2.6-.18-.28a7.4 7.4 0 0 1-1.14-3.97 7.5 7.5 0 1 1 7.13 7.07z" })
									}), "Répondre sur WhatsApp"]
								}), selected.email && /* @__PURE__ */ jsxs("a", {
									href: `mailto:${selected.email}`,
									className: "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all",
									style: { backgroundColor: COLORS.green },
									children: [/* @__PURE__ */ jsx(EnvelopeIcon, { className: "w-4 h-4" }), "Répondre par email"]
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => confirmDelete(selected),
								className: "w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors",
								style: {
									color: COLORS.red,
									backgroundColor: COLORS.redSoftBg
								},
								children: [/* @__PURE__ */ jsx(TrashIcon, { className: "w-4 h-4" }), "Supprimer ce message"]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Contacts as default };

//# sourceMappingURL=Contacts-GbYjZ2xR.js.map