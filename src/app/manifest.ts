import type { MetadataRoute } from "next";
import { APP } from "@/app.config";

// Lets "Add to Home Screen" open full screen like an app. Replace the placeholder icon with
// PNGs (192, 512, maskable 512 with art inside the middle 60%, apple-touch) before launch.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: APP.themeColor,
    theme_color: APP.themeColor,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
