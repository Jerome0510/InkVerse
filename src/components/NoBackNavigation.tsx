"use client";

import { useEffect } from "react";

const NoBackNavigation = () => {
  useEffect(() => {
    const stateObj = { noBackNav: true };
    window.history.replaceState(stateObj, document.title);
    window.history.pushState(stateObj, document.title);

    const onPopState = (event: PopStateEvent) => {
      if (event.state && event.state.noBackNav) {
        window.history.pushState(stateObj, document.title);
        window.location.reload();
      }
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
  return null;
};
export default NoBackNavigation;
