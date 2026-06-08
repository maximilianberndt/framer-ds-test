// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import "https://esm.sh/@maaax/framer-ds-test@0.1.1/style.css";
import { Badge as DSBadge } from "https://esm.sh/@maaax/framer-ds-test@0.1.1?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Badge
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Badge(props) {
  const { text, variant, style } = props;

  return (
    <div style={{ position: "relative", ...style }}>
      <DSBadge text={text} variant={variant} />
    </div>
  );
}

addPropertyControls(Badge, {
  text: {
    type: ControlType.String,
    title: "Text",
    defaultValue: "Hello World",
  },
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["Light", "Dark"],
    optionTitles: ["Light", "Dark"],
    defaultValue: "Light",
    displaySegmentedControl: true,
  },
});
