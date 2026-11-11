"use client";

import { useEffect } from "react";

/** Registers public/sw.js in production: offline page, last-copy pages, and Android's real install. */
export function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
  }, []);
  return null;
}
