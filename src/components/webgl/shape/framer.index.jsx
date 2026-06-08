// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)
// Requires WebglRoot on the same page.

import "https://esm.sh/@maaax/framer-ds-test@0.1.0/style.css";
import { Shape as DSShape } from "https://esm.sh/@maaax/framer-ds-test@0.1.0?external=react,react-dom";
import { ControlType, addPropertyControls, useIsStaticRenderer } from "framer";

/**
 * Shape
 *
 * A 3D shape rendered via WebGL. Pair with WebglRoot on the page.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function Shape(props) {
  const { variant, style } = props;
  const isStatic = useIsStaticRenderer();

  if (isStatic) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#222",
          borderRadius: 8,
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      <DSShape variant={variant} />
    </div>
  );
}

addPropertyControls(Shape, {
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["sphere", "box", "ag-station"],
    optionTitles: ["Sphere", "Box", "AG Station"],
    defaultValue: "sphere",
    displaySegmentedControl: true,
  },
});
