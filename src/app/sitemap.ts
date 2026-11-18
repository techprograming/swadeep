import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/programs", changeFrequency: "weekly" as const, priority: 0.95 },
    { path: "/programs/education", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/programs/health", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/programs/livelihood", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/programs/infrastructure", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/programs/disaster", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/videos", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/resources", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/publications", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/get-involved", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/donate", changeFrequency: "monthly" as const, priority: 0.95 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
