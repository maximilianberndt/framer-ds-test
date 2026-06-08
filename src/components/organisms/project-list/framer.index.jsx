// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import { useLoadDsStyles } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/src/framer/load-styles.js?external=react";
import { ProjectList as DSProjectList } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Project List
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function ProjectList(props) {
  useLoadDsStyles("https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css");
  const { heading, style } = props;

  return (
    <div style={{ position: "relative", width: "100%", ...style }}>
      <DSProjectList heading={heading} />
    </div>
  );
}

addPropertyControls(ProjectList, {
  heading: {
    type: ControlType.String,
    title: "Heading",
    defaultValue: "Projects",
  },
});
