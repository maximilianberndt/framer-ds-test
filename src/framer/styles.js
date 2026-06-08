import { useLoadDsStyles } from "./load-styles.js";

/** Compiled stylesheet URL — synced by pnpm sync:framer */
export const STYLE_URL = "https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css";

/** Injects the design system stylesheet once. Safe to call from every code component. */
export function useDsStyles() {
  useLoadDsStyles(STYLE_URL);
}

export { useLoadDsStyles };
