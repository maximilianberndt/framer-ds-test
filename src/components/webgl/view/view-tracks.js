/** @typedef {HTMLElement} ViewTrack */

const tracks = new Set();
/** @type {(() => void) | null} */
let cleanupListeners = null;
/** @type {((state: import("@react-three/fiber").RootState) => (() => void) | void) | null} */
let bindEvents = null;

export function registerViewTrack(element) {
  if (!element) return;
  tracks.add(element);
  bindEvents?.();
}

export function unregisterViewTrack(element) {
  if (!element) return;
  tracks.delete(element);
  bindEvents?.();
}

export function setViewTrackBinder(binder) {
  bindEvents = binder;
  binder?.();
}

export function resetViewTrackBinder() {
  bindEvents = null;
  cleanupListeners?.();
  cleanupListeners = null;
}

const DOM_EVENT_MAP = {
  onClick: ["click", false],
  onContextMenu: ["contextmenu", false],
  onDoubleClick: ["dblclick", false],
  onWheel: ["wheel", true],
  onPointerDown: ["pointerdown", true],
  onPointerUp: ["pointerup", true],
  onPointerLeave: ["pointerleave", true],
  onPointerMove: ["pointermove", true],
  onPointerCancel: ["pointercancel", true],
  onLostPointerCapture: ["lostpointercapture", true],
};

/**
 * Attach R3F pointer handlers directly to each View tracking element.
 * Required for Webflow code components (shadow DOM + separate React roots).
 */
export function syncViewTrackListeners(rootState) {
  cleanupListeners?.();
  cleanupListeners = null;

  rootState.events.disconnect?.();

  const activeTracks = [...tracks].filter(Boolean);
  if (!activeTracks.length || !rootState.events.handlers) return;

  const cleanups = [];

  for (const track of activeTracks) {
    for (const name in rootState.events.handlers) {
      const mapping = DOM_EVENT_MAP[name];
      if (!mapping) continue;

      const [eventName, passive] = mapping;
      const handler = rootState.events.handlers[name];
      track.addEventListener(eventName, handler, { passive });
      cleanups.push(() => track.removeEventListener(eventName, handler));
    }
  }

  rootState.setEvents({ connected: activeTracks[0] });
  cleanupListeners = () => {
    for (const cleanup of cleanups) cleanup();
    rootState.events.disconnect?.();
    cleanupListeners = null;
  };
}
