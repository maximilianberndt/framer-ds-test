import { useEffect } from "react";

import { Canvas } from "@react-three/fiber";

import { View } from "@/components/webgl/view";
import {
  resetViewTrackBinder,
  setViewTrackBinder,
  syncViewTrackListeners,
} from "@/components/webgl/view/view-tracks";

export const WebglRoot = () => {
  useEffect(() => () => resetViewTrackBinder(), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-100 h-lvh"
    >
      <Canvas
        shadows={true}
        gl={{
          stencil: true,
          antialias: true,
          logarithmicDepthBuffer: true,
        }}
        style={{
          pointerEvents: "none",
        }}
        onCreated={(state) => {
          setViewTrackBinder(() => syncViewTrackListeners(state));
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
};
