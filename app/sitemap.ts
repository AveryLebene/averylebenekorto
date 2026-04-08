import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://averylebenekor.to",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://averylebenekor.to/projects",
      lastModified: new Date(),
    },
    {
      url: "https://averylebenekor.to/about",
      lastModified: new Date(),
    },
  ];
}