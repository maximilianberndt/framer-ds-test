import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import r, { forwardRef as i, useEffect as a, useImperativeHandle as o, useLayoutEffect as s, useMemo as c, useRef as l, useState as u } from "react";
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function d(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = d(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function f() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = d(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components/atoms/button/index.jsx
var p = ({ label: e, variant: n }) => /* @__PURE__ */ t("button", {
	className: f("inline-flex items-center px-24 py-12 text-[1.4rem] font-medium leading-none", n === "Secondary" ? "border border-black text-black bg-transparent" : "bg-black text-white"),
	children: e
}), m = (e) => {
	let t, n = /* @__PURE__ */ new Set(), r = (e, r) => {
		let i = typeof e == "function" ? e(t) : e;
		if (!Object.is(i, t)) {
			let e = t;
			t = r ?? (typeof i != "object" || !i) ? i : Object.assign({}, t, i), n.forEach((n) => n(t, e));
		}
	}, i = () => t, a = {
		setState: r,
		getState: i,
		getInitialState: () => o,
		subscribe: (e) => (n.add(e), () => n.delete(e))
	}, o = t = e(r, i, a);
	return a;
}, h = ((e) => e ? m(e) : m), g = (e) => e;
function _(e, t = g) {
	let n = r.useSyncExternalStore(e.subscribe, r.useCallback(() => t(e.getState()), [e, t]), r.useCallback(() => t(e.getInitialState()), [e, t]));
	return r.useDebugValue(n), n;
}
var v = (e) => {
	let t = h(e), n = (e) => _(t, e);
	return Object.assign(n, t), n;
}, y = ((e) => e ? v(e) : v)(() => ({ count: 0 })), b = ({ text: e, variant: t }) => {
	let r = y((e) => e.count);
	return /* @__PURE__ */ n("span", {
		onClick: () => {
			y.setState((e) => ({ count: e.count + 1 }));
		},
		className: f("w-fit inline-block rounded-full px-10 py-2 text-sm leading-none select-none text-center", t === "Light" ? "bg-[#eee] text-black" : "bg-black text-white"),
		children: [
			e,
			" ",
			r
		]
	});
}, x = ({ image: e, videoUrl: n, youtubeUrl: r }) => /* @__PURE__ */ t("div", { className: "w-full bg-black flex-center aspect-video" }), S = ({ title: r, description: i, image: a, link: o }) => {
	let s = o?.href, c = o?.target ?? "_self", l = /* @__PURE__ */ n(e, { children: [a?.src && /* @__PURE__ */ t("div", {
		className: "aspect-4/3 w-full overflow-hidden bg-neutral-100",
		children: /* @__PURE__ */ t("img", {
			className: "h-full w-full object-cover",
			src: a.src,
			alt: a.alt ?? r ?? ""
		})
	}), /* @__PURE__ */ n("div", {
		className: "flex flex-col gap-16",
		children: [r && /* @__PURE__ */ t("p", {
			className: "type-m font-medium text-black",
			children: r
		}), i && /* @__PURE__ */ t("p", {
			className: "type-m text-neutral-500",
			children: i
		})]
	})] });
	return s ? /* @__PURE__ */ t("article", {
		className: "flex w-400 shrink-0 flex-col gap-24",
		children: /* @__PURE__ */ t("a", {
			className: f("flex flex-col gap-24 text-black no-underline select-none", "transition-opacity hover:opacity-80"),
			href: s,
			target: c,
			rel: c === "_blank" ? "noopener noreferrer" : void 0,
			children: l
		})
	}) : /* @__PURE__ */ t("article", {
		className: "flex w-400 shrink-0 flex-col gap-24",
		children: l
	});
}, C = ({ title: e, description: r, button: i, media: a }) => /* @__PURE__ */ n("section", {
	className: "w-full flex flex-col gap-40 pt-120 px-80 pb-80",
	children: [/* @__PURE__ */ n("div", {
		className: "flex flex-row justify-between items-end",
		children: [/* @__PURE__ */ t("div", {
			className: "flex max-w-400",
			children: /* @__PURE__ */ n("h1", {
				className: "text-[10rem] font-bold leading-[0.9] tracking-tight",
				children: [
					e,
					" ",
					y((e) => e.count)
				]
			})
		}), /* @__PURE__ */ t("div", {
			className: "flex",
			children: /* @__PURE__ */ n("div", {
				className: "flex flex-col items-start gap-24 max-w-300",
				children: [/* @__PURE__ */ t("p", {
					className: "text-[1.6rem] leading-[1.6] text-neutral-500",
					children: r
				}), i]
			})
		})]
	}), /* @__PURE__ */ t("div", {
		className: "flex items-center",
		children: /* @__PURE__ */ t("div", {
			className: "w-full",
			children: a
		})
	})]
}), w = i(({ children: e, as: n = "div", repeat: r = !1, load: i = "conditional", ...s }, c) => {
	let u = n, d = l(null), f = l(null);
	return a(() => {
		if (!d.current || !window.matchMedia("(hover: hover) and (pointer: fine)").matches && i !== "always") return;
		let e = !1;
		return import("./blossom-carousel-core-Bs50s3Qj.js").then(({ Blossom: t }) => {
			if (e || !d.current) return;
			let n = t(d.current, { repeat: r });
			f.current = n, n.init();
		}), () => {
			e = !0, f.current?.destroy(), f.current = null;
		};
	}, [r, i]), o(c, () => ({
		prev: (e) => f.current?.prev(e),
		next: (e) => f.current?.next(e),
		element: d.current
	}), []), /* @__PURE__ */ t(u, {
		ref: d,
		"blossom-carousel": "true",
		...s,
		children: e
	});
});
w.displayName = "BlossomCarousel";
//#endregion
//#region node_modules/.pnpm/boneyard-js@1.8.1_react@19.2.6_vite@8.0.13_@types+node@25.9.0_jiti@2.7.0_terser@5.47.1_/node_modules/boneyard-js/dist/types.js
function T(e) {
	if (Array.isArray(e)) {
		if (e.length < 5 || e.length > 6) throw Error(`Invalid bone format: expected [x,y,w,h,r,c?] but got ${e.length} elements`);
		let t = e;
		return {
			x: t[0],
			y: t[1],
			w: t[2],
			h: t[3],
			r: t[4],
			c: t[5] || void 0
		};
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/boneyard-js@1.8.1_react@19.2.6_vite@8.0.13_@types+node@25.9.0_jiti@2.7.0_terser@5.47.1_/node_modules/boneyard-js/dist/extract.js
var E = new Set([
	"p",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"li",
	"td",
	"th"
]);
function D(e, t = "component", n) {
	let r = e.getBoundingClientRect(), i = [], a = n?.leafTags ? new Set([...E, ...n.leafTags]) : E, o = n?.captureRoundedBorders ?? !0, s = n?.excludeTags ? new Set(n.excludeTags) : null, c = n?.excludeSelectors ?? null;
	function l(e) {
		let t = getComputedStyle(e);
		if (t.display === "none" || t.visibility === "hidden" || t.opacity === "0") return;
		let n = e.tagName.toLowerCase();
		if (s?.has(n) || c?.some((t) => e.matches(t))) return;
		let u = [...e.children].filter((e) => {
			let t = getComputedStyle(e);
			return t.display !== "none" && t.visibility !== "hidden" && t.opacity !== "0";
		}), d = n === "img" || n === "svg" || n === "video" || n === "canvas", f = n === "input" || n === "button" || n === "textarea" || n === "select", p = u.length === 0 || d || f || a.has(n), m = t.backgroundColor, h = m !== "rgba(0, 0, 0, 0)" && m !== "transparent", g = t.backgroundImage !== "none", _ = parseFloat(t.borderTopWidth) || 0, v = o && _ > 0 && t.borderTopColor !== "rgba(0, 0, 0, 0)" && t.borderTopColor !== "transparent", y = (parseFloat(t.borderTopLeftRadius) || 0) > 0, b = h || g || v && y, x = n === "tr" || n === "td" || n === "th" || n === "thead" || n === "tbody" || n === "table";
		if (p) {
			let n = e.getBoundingClientRect();
			if (n.width < 1 || n.height < 1) return;
			let a = d && n.width > 0 && n.height > 0 && Math.abs(n.width - n.height) < 4, o = x ? 0 : a ? "50%" : O(t, e) ?? 8, s = r.width;
			i.push({
				x: s > 0 ? +((n.left - r.left) / s * 100).toFixed(4) : 0,
				y: Math.round(n.top - r.top),
				w: s > 0 ? +(n.width / s * 100).toFixed(4) : 0,
				h: Math.round(n.height),
				r: o
			});
			return;
		}
		if (b) {
			let n = e.getBoundingClientRect();
			if (n.width >= 1 && n.height >= 1) {
				let a = x ? 0 : O(t, e) ?? 8, o = r.width;
				i.push({
					x: o > 0 ? +((n.left - r.left) / o * 100).toFixed(4) : 0,
					y: Math.round(n.top - r.top),
					w: o > 0 ? +(n.width / o * 100).toFixed(4) : 0,
					h: Math.round(n.height),
					r: a,
					c: !0
				});
			}
		}
		for (let e of u) l(e);
	}
	for (let t of e.children) l(t);
	return {
		name: t,
		viewportWidth: Math.round(r.width),
		width: Math.round(r.width),
		height: Math.round(r.height),
		bones: i
	};
}
function O(e, t) {
	let n = parseFloat(e.borderTopLeftRadius) || 0, r = parseFloat(e.borderTopRightRadius) || 0, i = parseFloat(e.borderBottomRightRadius) || 0, a = parseFloat(e.borderBottomLeftRadius) || 0;
	if (n === 0 && r === 0 && i === 0 && a === 0) return;
	let o = t ? (() => {
		let e = t.getBoundingClientRect();
		return e.width > 0 && e.height > 0 && Math.abs(e.width - e.height) < 4;
	})() : !1;
	return e.borderRadius === "50%" ? "50%" : Math.max(n, r, i, a) > 9998 ? o ? "50%" : 9999 : n === r && r === i && i === a ? n === 8 ? void 0 : n : `${n}px ${r}px ${i}px ${a}px`;
}
//#endregion
//#region node_modules/.pnpm/boneyard-js@1.8.1_react@19.2.6_vite@8.0.13_@types+node@25.9.0_jiti@2.7.0_terser@5.47.1_/node_modules/boneyard-js/dist/shared.js
var k = /* @__PURE__ */ new Map();
function A(e) {
	for (let [t, n] of Object.entries(e)) k.set(t, n);
}
function ee(e) {
	return k.get(e);
}
function j() {
	typeof window < "u" && window.__BONEYARD_BUILD && (window.__BONEYARD_SNAPSHOT = D);
}
function te() {
	return typeof window < "u" && window.__BONEYARD_BUILD === !0;
}
function ne(e, t) {
	if (!("breakpoints" in e)) return e;
	let n = Object.keys(e.breakpoints).map(Number).sort((e, t) => e - t);
	if (n.length === 0) return null;
	let r = [...n].reverse().find((e) => t >= e) ?? n[0];
	return e.breakpoints[r] ?? null;
}
var M = {
	angle: 110,
	start: 30,
	end: 70,
	speed: "2s",
	lightHighlight: "#f7f7f7",
	darkHighlight: "#2c2c2c"
}, N = {
	speed: "1.8s",
	lightAdjust: .3,
	darkAdjust: .02
}, P = {
	web: {
		light: "#f0f0f0",
		dark: "#222222"
	},
	native: {
		light: "#f0f0f0",
		dark: "#222222"
	},
	runtime: "#f0f0f0"
}, F = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/;
function I(e, t) {
	let n = e.match(F);
	if (n) {
		let [, e, r, i, a = "1"] = n;
		return `rgba(${e},${r},${i},${Math.min(1, parseFloat(a) + t * .5).toFixed(3)})`;
	}
	if (e.startsWith("#") && e.length >= 7) {
		let n = parseInt(e.slice(1, 3), 16), r = parseInt(e.slice(3, 5), 16), i = parseInt(e.slice(5, 7), 16);
		if (!isNaN(n) && !isNaN(r) && !isNaN(i)) {
			let e = Math.round(n + (255 - n) * t), a = Math.round(r + (255 - r) * t), o = Math.round(i + (255 - i) * t);
			return `#${e.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${o.toString(16).padStart(2, "0")}`;
		}
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/boneyard-js@1.8.1_react@19.2.6_vite@8.0.13_@types+node@25.9.0_jiti@2.7.0_terser@5.47.1_/node_modules/boneyard-js/dist/react.js
j();
var L = {};
function R({ loading: e, children: r, name: i, initialBones: o, color: c, darkColor: d, animate: f, stagger: p = !1, transition: m = !1, boneClass: h, className: g, fallback: _, fixture: v, snapshotConfig: y }) {
	let b = l(null), x = l(Math.random().toString(36).slice(2, 8)).current, [S, C] = u(0), [w, E] = u(0), [D, O] = u(!1);
	a(() => {
		if (typeof window > "u") return;
		let e = () => {
			O(document.documentElement.classList.contains("dark") || !!b.current?.closest(".dark"));
		};
		e();
		let t = new MutationObserver(e);
		t.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["class"]
		});
		let n = window.matchMedia("(prefers-color-scheme: dark)");
		return n.addEventListener("change", e), () => {
			t.disconnect(), n.removeEventListener("change", e);
		};
	}, []);
	let k = c ?? L.color ?? P.web.light, A = d ?? L.darkColor ?? P.web.dark, j = D ? A : k, F = f ?? L.animate ?? "pulse", R = F === !0 ? "pulse" : F === !1 ? "solid" : F;
	a(() => {
		let e = b.current;
		if (!e) return;
		let t = new ResizeObserver((e) => {
			let t = e[0]?.contentRect;
			C(Math.round(t?.width ?? 0)), t && t.height > 0 && E(Math.round(t.height));
		});
		t.observe(e);
		let n = e.getBoundingClientRect();
		return C(Math.round(n.width)), n.height > 0 && E(Math.round(n.height)), () => t.disconnect();
	}, []);
	let z = {};
	if (i && (z["data-boneyard"] = i, y && (z["data-boneyard-config"] = JSON.stringify(y))), te()) return t("div", {
		ref: b,
		className: g,
		style: { position: "relative" },
		...z,
		children: t("div", { children: v ?? r })
	});
	let [B, V] = u(!1);
	s(() => {
		V(!0);
	}, []);
	let H = o ?? (i ? ee(i) : void 0), U = B && typeof window < "u" ? window.innerWidth : 0, W = S > 0 ? S : U, G = H && W > 0 ? ne(H, W) : null, K = h ?? L.boneClass, q = (() => {
		let e = p ?? L.stagger;
		return e === !0 ? 80 : e === !1 || !e ? 0 : e;
	})(), J = (() => {
		let e = m ?? L.transition;
		return e === !0 ? 300 : e === !1 || !e ? 0 : e;
	})(), [Y, X] = u(!1), Z = l(e), Q = l(null);
	a(() => (Z.current && !e && J > 0 && G && (Q.current && clearTimeout(Q.current), X(!0), Q.current = setTimeout(() => {
		X(!1), Q.current = null;
	}, J)), Z.current = e, () => {
		Q.current && clearTimeout(Q.current);
	}), [
		e,
		J,
		G
	]);
	let re = (e || Y) && G, ie = e && !G && !Y, ae = w > 0 ? w : G?.height ?? 0, oe = G?.height ?? 0, $ = ae > 0 && oe > 0 ? ae / oe : 1;
	return n("div", {
		ref: b,
		className: g,
		style: { position: "relative" },
		...z,
		children: [t("div", {
			"data-boneyard-content": "true",
			style: re && !Y ? { visibility: "hidden" } : void 0,
			children: ie ? _ : r
		}), re && t("div", {
			"data-boneyard-overlay": "true",
			style: {
				position: "absolute",
				inset: 0,
				overflow: "hidden",
				opacity: +!Y,
				transition: J > 0 ? `opacity ${J}ms ease-out` : void 0
			},
			children: n("div", {
				style: {
					position: "relative",
					width: "100%",
					height: "100%"
				},
				children: [
					G.bones.filter((e) => !T(e).c).map((e, n) => {
						let r = T(e), i = j;
						I(j, D ? N.darkAdjust : N.lightAdjust);
						let a = r.w / 100 * (G.width ?? 0), o = r.r === "50%" && Math.abs(a - r.h) < 4, s = {
							position: "absolute",
							left: `${r.x}%`,
							top: r.y * $,
							width: o ? r.h * $ : `${r.w}%`,
							height: r.h * $,
							borderRadius: typeof r.r == "string" ? r.r : `${r.r}px`,
							backgroundColor: i
						}, c = L.speed;
						if (R === "pulse") s.animation = `bp-${x} ${c ?? N.speed} ease-in-out infinite`;
						else if (R === "shimmer") {
							let e = D ? L.darkShimmerColor ?? M.darkHighlight : L.shimmerColor ?? M.lightHighlight, t = L.shimmerAngle ?? M.angle;
							delete s.backgroundColor, s.backgroundImage = `linear-gradient(${t}deg, ${i} ${M.start}%, ${e} 50%, ${i} ${M.end}%)`, s.backgroundSize = "200% 100%", s.animation = `bs-${x} ${c ?? M.speed} linear infinite`;
						}
						return q > 0 && (s.opacity = 0, s.animation = `${s.animation ? s.animation + "," : ""} by-${x} 0.3s ease-out ${n * q}ms forwards`), t("div", {
							"data-boneyard-bone": "true",
							className: K,
							style: s
						}, n);
					}),
					R === "pulse" && t("style", { children: `@keyframes bp-${x}{0%,100%{background-color:${j}}50%{background-color:${I(j, D ? N.darkAdjust : N.lightAdjust)}}}` }),
					R === "shimmer" && t("style", { children: `@keyframes bs-${x}{0%{background-position:200% 0}100%{background-position:-200% 0}}` }),
					q > 0 && t("style", { children: `@keyframes by-${x}{from{opacity:0}to{opacity:1}}` })
				]
			})
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/boneyard-js@1.8.1_react@19.2.6_vite@8.0.13_@types+node@25.9.0_jiti@2.7.0_terser@5.47.1_/node_modules/boneyard-js/dist/runtime.js
function z(e, t, n) {
	let r = t ?? P.runtime, i = n !== !1, a = I(r, N.lightAdjust), o = `${i ? `<style>.boneyard-bone{animation:boneyard-pulse ${N.speed} ease-in-out infinite}@keyframes boneyard-pulse{0%,100%{background-color:${r}}50%{background-color:${a}}}</style>` : ""}<div class="boneyard" style="position:relative;width:100%;height:${e.height}px">`;
	for (let t of e.bones) {
		let n = T(t);
		if (n.c) continue;
		let i = typeof n.r == "string" ? n.r : `${n.r}px`, a = n.w / 100 * (e.width ?? 0), s = n.r === "50%" && (e.width ?? 0) > 0 && Math.abs(a - n.h) < 4 ? `${n.h}px` : `${n.w}%`;
		o += `<div class="boneyard-bone" style="position:absolute;left:${n.x}%;top:${n.y}px;width:${s};height:${n.h}px;border-radius:${i};background-color:${r}"></div>`;
	}
	return o += "</div>", o;
}
var B = {
	breakpoints: {
		375: {
			name: "project-list",
			viewportWidth: 375,
			width: 375,
			height: 513,
			bones: [
				[
					13.3333,
					75,
					10.5375,
					15,
					8
				],
				[
					13.3333,
					120,
					66.6667,
					318,
					8
				],
				[
					85.3333,
					120,
					66.6667,
					318,
					8
				],
				[
					157.3333,
					120,
					66.6667,
					318,
					8
				],
				[
					229.3333,
					120,
					66.6667,
					318,
					8
				],
				[
					301.3333,
					120,
					66.6667,
					318,
					8
				]
			]
		},
		640: {
			name: "project-list",
			viewportWidth: 640,
			width: 640,
			height: 513,
			bones: [
				[
					7.8125,
					75,
					6.1743,
					15,
					8
				],
				[
					7.8125,
					120,
					39.0625,
					318,
					8
				],
				[
					50,
					120,
					39.0625,
					318,
					8
				],
				[
					92.1875,
					120,
					39.0625,
					318,
					8
				],
				[
					134.375,
					120,
					39.0625,
					318,
					8
				],
				[
					176.5625,
					120,
					39.0625,
					318,
					8
				]
			]
		},
		768: {
			name: "project-list",
			viewportWidth: 768,
			width: 768,
			height: 513,
			bones: [
				[
					6.5104,
					75,
					5.1453,
					15,
					8
				],
				[
					6.5104,
					120,
					32.5521,
					318,
					8
				],
				[
					41.6667,
					120,
					32.5521,
					318,
					8
				],
				[
					76.8229,
					120,
					32.5521,
					318,
					8
				],
				[
					111.9792,
					120,
					32.5521,
					318,
					8
				],
				[
					147.1354,
					120,
					32.5521,
					318,
					8
				]
			]
		},
		1024: {
			name: "project-list",
			viewportWidth: 1024,
			width: 1024,
			height: 513,
			bones: [
				[
					4.8828,
					75,
					3.8589,
					15,
					8
				],
				[
					4.8828,
					120,
					24.4141,
					318,
					8
				],
				[
					31.25,
					120,
					24.4141,
					318,
					8
				],
				[
					57.6172,
					120,
					24.4141,
					318,
					8
				],
				[
					83.9844,
					120,
					24.4141,
					318,
					8
				],
				[
					110.3516,
					120,
					24.4141,
					318,
					8
				]
			]
		},
		1280: {
			name: "project-list",
			viewportWidth: 1280,
			width: 1280,
			height: 513,
			bones: [
				[
					3.9063,
					75,
					3.0872,
					15,
					8
				],
				[
					3.9063,
					120,
					19.5313,
					318,
					8
				],
				[
					25,
					120,
					19.5313,
					318,
					8
				],
				[
					46.0938,
					120,
					19.5313,
					318,
					8
				],
				[
					67.1875,
					120,
					19.5313,
					318,
					8
				],
				[
					88.2813,
					120,
					19.5313,
					318,
					8
				]
			]
		},
		1536: {
			name: "project-list",
			viewportWidth: 1536,
			width: 1536,
			height: 513,
			bones: [
				[
					3.2552,
					75,
					2.5726,
					15,
					8
				],
				[
					3.2552,
					120,
					16.276,
					318,
					8
				],
				[
					20.8333,
					120,
					16.276,
					318,
					8
				],
				[
					38.4115,
					120,
					16.276,
					318,
					8
				],
				[
					55.9896,
					120,
					16.276,
					318,
					8
				],
				[
					73.5677,
					120,
					16.276,
					318,
					8
				]
			]
		}
	},
	_hash: "628520779323604f23378d93ab401b5f"
};
//#endregion
//#region src/bones/registry.ts
A({ "project-list": B });
//#endregion
//#region src/bones/index.ts
var V = { "project-list": B };
function H(e) {
	return V[e];
}
function U(e, t) {
	if (!("breakpoints" in e)) return e;
	let n = Object.keys(e.breakpoints).map(Number).sort((e, t) => e - t);
	if (n.length === 0) return null;
	let r = [...n].reverse().find((e) => t >= e) ?? n[0];
	return e.breakpoints[r] ?? null;
}
function W() {
	return typeof window < "u" && window.__BONEYARD_BUILD === !0;
}
//#endregion
//#region src/utils/debounce.js
function G(e, t, n) {
	let r = null, i = null, a = function() {
		r &&= (clearTimeout(r), i = null, null);
	}, o = function() {
		let e = i;
		a(), e && e();
	}, s = function() {
		if (!t) return e.apply(this, arguments);
		let o = arguments, s = n && !r;
		if (a(), i = () => {
			e.apply(this, o);
		}, r = setTimeout(function() {
			if (r = null, !s) {
				let e = i;
				return i = null, e();
			}
		}, t), s) return i();
	};
	return s.cancel = a, s.flush = o, s;
}
//#endregion
//#region src/hooks/use-window-size.js
function K(e = 500) {
	let [t, n] = u(), [r, i] = u();
	return s(() => {
		let t = G(() => {
			n(window.innerWidth), i(window.innerHeight);
		}, e, !0);
		return window.addEventListener("resize", t, !1), t(), () => window.removeEventListener("resize", t, !1);
	}, [e]), {
		width: t,
		height: r
	};
}
//#endregion
//#region src/components/molecules/skeleton-shell/index.jsx
var q = 1280;
function J({ name: e, show: r, children: i, fixture: a, className: o = "relative w-full", color: s = "#f0f0f0" }) {
	let { width: l } = K(), u = l ?? q, { bonesHtml: d, descriptor: f } = c(() => {
		if (!r) return {};
		let t = H(e);
		if (!t) return {};
		let n = U(t, u);
		return n ? {
			bonesHtml: z(n, s, !0),
			descriptor: n
		} : {};
	}, [
		r,
		e,
		u,
		s
	]);
	return W() ? /* @__PURE__ */ t(R, {
		loading: !0,
		name: e,
		className: o,
		children: a ?? i
	}) : /* @__PURE__ */ n("div", {
		"data-boneyard": e,
		className: o,
		style: { minHeight: f?.height },
		children: [/* @__PURE__ */ t("div", {
			style: r ? { visibility: "hidden" } : void 0,
			children: i
		}), r && d ? /* @__PURE__ */ t("div", {
			"data-boneyard-overlay": "true",
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": !0,
			dangerouslySetInnerHTML: { __html: d }
		}) : null]
	});
}
//#endregion
//#region src/components/organisms/project-list/index.jsx
var Y = Array.from({ length: 5 }, (e, t) => ({
	id: `fixture-${t + 1}`,
	fieldData: {
		name: "Project name",
		"project-summary": "Fusce aliquet turpis at orci bibendum, non convallis justo tempor.\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.\nCras sit amet velit id nulla tempus dictum sit amet eu nisi.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nPraes",
		"main-project-image": { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" }
	}
}));
function X({ heading: e, items: r }) {
	return /* @__PURE__ */ n("section", {
		className: "flex w-full flex-col gap-48 px-80 py-120 overflow-clip",
		children: [e && /* @__PURE__ */ t("h2", {
			className: "type-m w-fit",
			children: e
		}), /* @__PURE__ */ t(w, {
			as: "ul",
			className: "w-[calc(100%+160px)] scroll-smooth flex gap-x-32 -ml-80 px-80",
			children: r?.map(({ id: e, fieldData: n }) => /* @__PURE__ */ t("li", {
				role: "listitem",
				children: /* @__PURE__ */ t(S, {
					title: n.name,
					description: n["project-summary"],
					image: { src: n["main-project-image"].url }
				})
			}, e))
		})]
	});
}
var Z = ({ heading: e = "Projects" }) => /* @__PURE__ */ t(J, {
	name: "project-list",
	show: !1,
	fixture: /* @__PURE__ */ t(X, {
		heading: e,
		items: Y
	}),
	children: /* @__PURE__ */ t(X, {
		heading: e,
		items: Y
	})
});
//#endregion
export { b as Badge, p as Button, x as Media, C as PageHero, S as ProjectCard, Z as ProjectList };
