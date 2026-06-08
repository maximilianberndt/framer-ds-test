// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

import "https://esm.sh/@maaax/framer-ds-test@0.1.1/style.css";
import { Media as DSMedia } from "https://esm.sh/@maaax/framer-ds-test@0.1.1?external=react,react-dom";
import { ControlType, addPropertyControls } from "framer";

/**
 * Media
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function Media(props) {
  const {
    image = {
      src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
      alt: "Media",
    },
    videoUrl = "",
    youtubeUrl = "",
    style,
  } = props;

  return (
    <div style={{ position: "relative", width: "100%", ...style }}>
      <DSMedia image={image} videoUrl={videoUrl} youtubeUrl={youtubeUrl} />
    </div>
  );
}

addPropertyControls(Media, {
  image: {
    type: ControlType.ResponsiveImage,
    title: "Image",
  },
  videoUrl: {
    type: ControlType.String,
    title: "Video URL",
    defaultValue: "",
  },
  youtubeUrl: {
    type: ControlType.String,
    title: "YouTube URL",
    defaultValue: "",
  },
});
