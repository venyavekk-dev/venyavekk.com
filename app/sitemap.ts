import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://venyavekk.com";

  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/music`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/films`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cv`, changeFrequency: "monthly", priority: 0.5 }
  ];
}
