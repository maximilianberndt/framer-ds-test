import { useLoadDsStyles } from "./load-styles.js";

/** esm.sh CSS URL (package.json `./style.css` export) — synced by pnpm sync:framer */
export const STYLE_URL = "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/style.css";
export const STYLE_CDN_URL = "https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css";
/** jsDelivr fallback — synced by pnpm sync:framer */
export const STYLE_CDN_URL =
  "https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css";

/**
 * Declarative stylesheet for Framer code components.
 * Prefer this over `import "…/styles.js"` — Framer ignores CSS side-effects.
 */
export function DsStylesheet() {
  return <link rel="stylesheet" href={STYLE_URL} />;
}

/** Injects the design system stylesheet once. Safe to call from every code component. */
export function useDsStyles() {
  useLoadDsStyles(STYLE_URL);
}

export { useLoadDsStyles };
