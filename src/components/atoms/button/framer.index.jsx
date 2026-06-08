// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import "https://esm.sh/@maaax/framer-ds-test@0.1.0/style.css";
import { Button as DSButton } from "https://esm.sh/@maaax/framer-ds-test@0.1.0?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Button
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Button(props) {
  const { label, variant, style } = props;

  return (
    <div style={{ position: "relative", ...style }}>
      <DSButton label={label} variant={variant} />
    </div>
  );
}

addPropertyControls(Button, {
  label: {
    type: ControlType.String,
    title: "Label",
    defaultValue: "Get started",
  },
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["Primary", "Secondary"],
    optionTitles: ["Primary", "Secondary"],
    defaultValue: "Primary",
    displaySegmentedControl: true,
  },
});
