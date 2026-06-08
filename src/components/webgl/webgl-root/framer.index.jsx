// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)
// Place a single WebglRoot on the page; pair with Shape components.
// Replace VERSION with your published semver after `npm publish`.

import "https://esm.sh/@maaax/framer-ds-test@0.1.0/style.css";
import { WebglRoot as DSWebglRoot } from "https://esm.sh/@maaax/framer-ds-test@0.1.0?external=react,react-dom";
import { useIsStaticRenderer } from "framer";

/**
 * WebGL Root
 *
 * Shared WebGL canvas for drei View components.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function WebglRoot(props) {
  const isStatic = useIsStaticRenderer();

  if (isStatic) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#111",
          ...props.style,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", ...props.style }}
    >
      <DSWebglRoot />
    </div>
  );
}
