"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";
import { pageContentStagger } from "@/lib/motion";
import { PROJECTS } from "@/lib/projects";
import { ProjectMediaPreview } from "./ProjectMediaPreview";

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
  const reduceMotion = useReducedMotion();
  const v = pageContentStagger(reduceMotion);

  const filteredProjects = useMemo(() => {
    if (selectedTag === ALL_TAG) return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tags.some(
        (t) => t.toLowerCase() === selectedTag.toLowerCase()
      )
    );
  }, [selectedTag]);

  return (
    <motion.div
      className="md:p-12 p-4 min-h-screen"
      variants={v.section}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        variants={v.block}
        className="text-4xl pb-6 font-bold text-center"
      >
        My Projects
      </motion.h2>

      <motion.div
        variants={v.block}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {FILTER_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
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
      </motion.div>

      <motion.div
        variants={v.grid}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {filteredProjects.map((project) => {
          return (
            <motion.article
              key={project.id}
              variants={v.card}
              className="rounded-lg overflow-hidden bg-[#222]/40 border border-[#333]/40 hover:border-[#444]/60 transition-colors"
            >
              <ProjectMediaPreview project={project} />
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
          </motion.article>
          );
        })}
      </motion.div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-[#888] py-12">
          No projects match &quot;{selectedTag}&quot;.
        </p>
      )}
    </motion.div>
  );
};

export default Projects;
