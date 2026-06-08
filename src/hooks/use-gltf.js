import { GLTFLoader, MeshoptDecoder } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

import { DRACOLoader } from "@/lib/draco/DRACOLoader.min.js";

// Pure-JS draco.js loader — avoid drei/three-stdlib WASM DRACOLoader (gstatic decoders).

const dracoLoader = new DRACOLoader();

const configureLoader = (loader) => {
  loader.setDRACOLoader(dracoLoader);
  loader.setMeshoptDecoder(
    typeof MeshoptDecoder === "function" ? MeshoptDecoder() : MeshoptDecoder,
  );
};

/**
 * useGLTF with the project's pure-JS DRACOLoader (no WASM decoder path).
 *
 * @param {string | string[]} path
 */
export function useGLTF(path) {
  return useLoader(GLTFLoader, path, configureLoader);
}

useGLTF.preload = (path) => {
  useLoader.preload(GLTFLoader, path, configureLoader);
};
