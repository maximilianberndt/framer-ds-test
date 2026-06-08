// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import { useLoadDsStyles } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/src/framer/load-styles.js?external=react";
import { Button as DSButton } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Button
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Button(props) {
  useLoadDsStyles(
    "https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css",
  );
  return <DSButton {...props} />;
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
