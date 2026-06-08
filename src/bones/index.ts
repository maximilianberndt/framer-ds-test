import type { ResponsiveBones, SkeletonResult } from "boneyard-js";

import "./registry";

import projectList from "./project-list.bones.json";

type RegisteredBones = SkeletonResult | ResponsiveBones;

/** Keep keys in sync with auto-generated `registry.ts` (webpack has no import.meta.glob). */
const bonesByName: Record<string, RegisteredBones> = {
  "project-list": projectList,
};

export function getBones(name: string): RegisteredBones | undefined {
  return bonesByName[name];
}

export function resolveResponsive(
  bones: RegisteredBones,
  width: number,
): SkeletonResult | null {
  if (!("breakpoints" in bones)) return bones;
  const bps = Object.keys(bones.breakpoints)
    .map(Number)
    .sort((a, b) => a - b);
  if (bps.length === 0) return null;
  const match = [...bps].reverse().find((bp) => width >= bp) ?? bps[0];
  return bones.breakpoints[match] ?? null;
}

export function isBuildMode(): boolean {
  return typeof window !== "undefined" && window.__BONEYARD_BUILD === true;
}
