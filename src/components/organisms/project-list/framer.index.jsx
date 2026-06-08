// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)
// ProjectList uses static fixture data baked into the design system.
// Replace VERSION with your published semver after `npm publish`.

import "https://esm.sh/@maaax/framer-ds-test@0.1.0/style.css";
import { ProjectList as DSProjectList } from "https://esm.sh/@maaax/framer-ds-test@0.1.0?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Project List
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function ProjectList(props) {
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
