import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aulasremotas.net/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
