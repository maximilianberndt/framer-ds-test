import { Skeleton } from "boneyard-js/react";
import { renderBones } from "boneyard-js";
import { useMemo } from "react";

import { getBones, isBuildMode, resolveResponsive } from "@/bones";
import { useWindowSize } from "@/hooks/use-window-size.js";

/** Default width for SSR / first paint before `window` is available. */
const SSR_VIEWPORT_WIDTH = 1280;

/**
 * SSR-safe skeleton shell. Boneyard's `<Skeleton>` waits for client mount before
 * painting bones; this renders `renderBones()` HTML immediately (including SSR).
 */
export function SkeletonShell({
  name,
  show,
  children,
  fixture,
  className = "relative w-full",
  color = "#f0f0f0",
}) {
  const { width } = useWindowSize();
  const viewportWidth = width ?? SSR_VIEWPORT_WIDTH;

  const { bonesHtml, descriptor } = useMemo(() => {
    if (!show) return {};
    const registered = getBones(name);
    if (!registered) return {};
    const descriptor = resolveResponsive(registered, viewportWidth);
    if (!descriptor) return {};

    return { bonesHtml: renderBones(descriptor, color, true), descriptor };
  }, [show, name, viewportWidth, color]);

  if (isBuildMode()) {
    return (
      <Skeleton loading={true} name={name} className={className}>
        {fixture ?? children}
      </Skeleton>
    );
  }

  return (
    <div
      data-boneyard={name}
      className={className}
      style={{ minHeight: descriptor?.height }}
    >
      <div style={show ? { visibility: "hidden" } : undefined}>{children}</div>
      {show && bonesHtml ? (
        <div
          data-boneyard-overlay="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: bonesHtml }}
        />
      ) : null}
    </div>
  );
}
