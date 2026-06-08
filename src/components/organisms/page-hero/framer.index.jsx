// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import { DsStylesheet } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/src/framer/styles.js?external=react";
import { PageHero as DSPageHero } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Page Hero
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function PageHero(props) {
  const { title, description, button, media, style } = props;

  return (
      <div style={{ position: "relative", width: "100%", ...style }}>
      <DSPageHero
        title={title}
        description={description}
        button={button}
        media={media}
      />
    </div>
    </>
  );
}

addPropertyControls(PageHero, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Haven Station",
  },
  description: {
    type: ControlType.String,
    title: "Description",
    defaultValue: "Enabling continuous human presence in low-Earth orbit",
    displayTextArea: true,
  },
  button: {
    type: ControlType.Slot,
    title: "Button",
    maxCount: 1,
  },
  media: {
    type: ControlType.Slot,
    title: "Media",
    maxCount: 1,
  },
});
