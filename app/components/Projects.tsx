"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  detailsUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: "repnote",
    name: "RepNote",
    description: "A fitness tracking app that allows you to track your workouts and see your progress.",
    image: "/images/projects/cedirates.png",
    tags: ["Web app", "Next.js", "Tailwind", "TypeScript", "Supabase"],
  },
  {
    id: "amovies",
    name: "A Movies",
    description: "A movie search app that allows you to search for movies and see their trailers/details.",
    image: "/images/projects/mycreditscore.png",
    tags: ["Web app", "Tailwind", "React","Axios"],
  },
  {
    id: "hitched",
    name: "Hitched",
    description: "A dating platform landing website",
    image: "/images/projects/hitched.png",
    tags: ["Tailwind", "React",],
  },
  {
    id: "asranna",
    name: "Asranna",
    description: "A platform to help you remember dates and add events to your calendar",
    image: "/images/projects/asranna.png",
    tags: ["Web app", "Tailwind", "React","Axios"],
  },
  {
    id: "bds",
    name: "Butterfly Design System",
    description: "A design system for the Butterfly Design System platform",
    image: "/images/projects/bds.png",
    tags: ["Web app", "Tailwind", "Astro"],
  },
  {
    id: "hubtel-web",
    name: "Hubtel Web",
    description: "A web app for the Hubtel platform",
    image: "/images/projects/hubtel-web.png",
    tags: ["Web app", "Tailwind", "Nuxt"],
  }

];

const ALL_TAG = "All Projects";

const FILTER_TAGS = [
  ALL_TAG,
  "React",
  "Next.js",
  "Supabase",
  "Web app",
  "Nuxt.js",
  "TypeScript",
  "Bootstrap",
  "Tailwind CSS",
  "Sass",
];

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState(ALL_TAG);

  const filteredProjects = useMemo(() => {
    if (selectedTag === ALL_TAG) return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tags.some(
        (t) => t.toLowerCase() === selectedTag.toLowerCase()
      )
    );
  }, [selectedTag]);

  return (
    <div className="md:p-12 p-4 min-h-screen">
      <h2 className="text-4xl pb-6 font-bold text-center">My Projects</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {FILTER_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1  rounded-full font-gt-light text-sm transition-all duration-300 border ${
                isSelected
                  ? "bg-green-200 text-black border-green-200"
                  : "bg-[#222]/30 text-[#c7c7c7] hover:bg-[#333]/40 hover:text-green-200 border-[#333]/40"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="rounded-lg overflow-hidden bg-[#222]/40 border border-[#333]/40 hover:border-[#444]/60 transition-colors"
          >
            <div className="aspect-video bg-[#1a1a1a] relative">
              <Image
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  const fallback = t.nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 hidden items-center justify-center text-[#666] text-sm"
                aria-hidden
              >
                {project.name}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-[#c7c7c7] text-sm mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs bg-[#333]/50 text-[#c7c7c7]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-[#888]">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>
              {project.detailsUrl ? (
                <a
                  href={project.detailsUrl}
                  className="text-green-200 text-sm font-medium hover:underline"
                >
                  View Details →
                </a>
              ) : (
                <span className="text-green-200 text-sm font-medium">
                  View Details →
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-[#888] py-12">
          No projects match &quot;{selectedTag}&quot;.
        </p>
      )}
    </div>
  );
};

export default Projects;
