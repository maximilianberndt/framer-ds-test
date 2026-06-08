import { View as DreiView } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";

import { registerViewTrack, unregisterViewTrack } from "@/components/webgl/view/view-tracks";

export function View({ className, ...props }) {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    registerViewTrack(element);
    return () => unregisterViewTrack(element);
  }, [trackRef]);

  return (
    <DreiView
      ref={trackRef}
      className={clsx("pointer-events-auto", className)}
      {...props}
    />
  );
}

View.Port = DreiView.Port;
