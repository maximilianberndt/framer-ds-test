import { useLayoutEffect, useState } from "react";

import debounce from "@/utils/debounce";

/**
 * @name useWindowSize
 * @description A React hook that listens to window size.
 * @returns {object} { width, height }
 */

export function useWindowSize(debounceDelay = 500) {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useLayoutEffect(() => {
    const onWindowRezise = debounce(
      () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      },
      debounceDelay,
      true,
    );

    window.addEventListener("resize", onWindowRezise, false);

    onWindowRezise();

    return () => window.removeEventListener("resize", onWindowRezise, false);
  }, [debounceDelay]);

  return { width, height };
}
