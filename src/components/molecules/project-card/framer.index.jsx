// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import "https://esm.sh/framer-ds-test@0.1.0/style.css";
import { ProjectCard as DSProjectCard } from "https://esm.sh/framer-ds-test@0.1.0?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Project Card
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function ProjectCard(props) {
  const {
    title,
    description,
    image = {
      src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
      alt: "Project",
    },
    link = "",
    style,
  } = props;

  return (
    <div style={{ position: "relative", ...style }}>
      <DSProjectCard
        title={title}
        description={description}
        image={image}
        link={link ? { href: link, target: "_self" } : undefined}
      />
    </div>
  );
}

addPropertyControls(ProjectCard, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Project name",
  },
  description: {
    type: ControlType.String,
    title: "Description",
    defaultValue: "Short project description",
    displayTextArea: true,
  },
  image: {
    type: ControlType.ResponsiveImage,
    title: "Image",
  },
  link: {
    type: ControlType.Link,
    title: "Link",
    defaultValue: "",
  },
});
