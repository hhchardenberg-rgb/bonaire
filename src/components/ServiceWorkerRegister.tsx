"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // PWA-installatie is optioneel; falen mag de site niet blokkeren.
      });
    }
  }, []);
  return null;
}
