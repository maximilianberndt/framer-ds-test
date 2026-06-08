import { Box, Center, OrbitControls, Sphere } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";

import { View } from "@/components/webgl/view";
import { useGLTF } from "@/hooks/use-gltf.js";
import agStationModelUrl from "@/assets/models/ag-station-transformed.glb";

const AgStationModel = ({ onPointerOver, onPointerOut }) => {
  const { scene } = useGLTF(agStationModelUrl);
  const model = useMemo(() => scene.clone(), [scene]);

  return (
    <Center scale={0.1}>
      <OrbitControls />
      <primitive
        object={model}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    </Center>
  );
};

const ShapeScene = ({ variant }) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (variant === "ag-station") {
      useGLTF.preload(agStationModelUrl);
    }
  }, [variant]);

  const onPointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };
  const onPointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group scale={hovered ? 2 : 1}>
        {variant === "sphere" ? (
          <Sphere onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
            <meshNormalMaterial />
          </Sphere>
        ) : variant === "box" ? (
          <Box
            rotation={[0, Math.PI / 4, Math.PI / 6]}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
          >
            <meshNormalMaterial />
          </Box>
        ) : null}
      </group>

      {variant === "ag-station" && (
        <Suspense fallback={null}>
          <AgStationModel
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
          />
        </Suspense>
      )}
    </>
  );
};

export const Shape = ({ variant = "sphere" }) => (
  <View className="w-full h-500">
    <ShapeScene variant={variant} />
  </View>
);
