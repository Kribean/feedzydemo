import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Feedzy Démo",
    short_name: "Feedzy",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b0b2e",
    theme_color: "#008069",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
