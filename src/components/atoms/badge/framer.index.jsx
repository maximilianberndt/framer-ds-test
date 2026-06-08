// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import { useLoadDsStyles } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/src/framer/load-styles.js?external=react";
import { Badge as DSBadge } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Badge
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Badge(props) {
  useLoadDsStyles("https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css");
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
