import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/gallery",
    "/videos",
    "/donate",
    "/contact",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "" || route === "/programs" || route === "/impact"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      route === ""
        ? 1.0
        : route === "/programs" || route === "/donate"
        ? 0.9
        : 0.8,
  }));
}
