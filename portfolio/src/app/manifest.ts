import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Siva Santhosh Portfolio", short_name: "Siva", start_url: "/", display: "standalone", background_color: "#05060a", theme_color: "#05060a", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
