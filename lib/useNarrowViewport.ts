"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 976px)";

function subscribe(cb: () => void) {
  const mq = globalThis.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot() {
  return globalThis.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True when viewport is mobile-sized; false on server (desktop assumed for SSR). */
export function useNarrowViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
