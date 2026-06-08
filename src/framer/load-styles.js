import { useEffect } from "react";

/**
 * Injects the design system stylesheet via <link>.
 * Framer code components do not apply `import "…/style.css"` side-effects.
 */
export function useLoadDsStyles(href) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const id = `framer-ds-styles-${href}`;
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
}
