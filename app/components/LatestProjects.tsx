"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { pageContentStagger } from "@/lib/motion";
import { LATEST_PROJECTS } from "@/lib/projects";
import { ProjectMediaPreview } from "./ProjectMediaPreview";

export default function LatestProjects() {
  const reduceMotion = useReducedMotion();
  const v = pageContentStagger(reduceMotion);

  return (
    <motion.section
      className="px-4 lg:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full"
      variants={v.section}
      initial="hidden"
      animate="show"
    >
        <motion.div
          variants={v.block}
          className="flex justify-between items-center mb-8 gap-4"
        >
          <h2 className="text-3xl font-bold text-center md:text-left">
            Latest Projects
          </h2>
          <Link
            href="/projects"
            className="text-green-200 font-medium hover:underline text-sm shrink-0"
          >
            View all →
          </Link>
        </motion.div>
        <motion.div
          variants={v.grid}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-fr"
        >
          {LATEST_PROJECTS.map((project) => {
            return (
            <motion.div key={project.id} variants={v.card} className="min-h-0">
            <div className="flex flex-col rounded-lg overflow-hidden bg-[#222]/40 border border-[#333]/40 hover:border-[#444]/60 transition-colors h-full">
              <ProjectMediaPreview
                project={project}
                imageLinkHref="/projects"
              />
              <Link
                href="/projects"
                className="p-4 flex-1 flex flex-col min-h-0"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-[#c7c7c7] text-sm line-clamp-2 mb-3">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs bg-[#333]/50 text-[#c7c7c7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
            </motion.div>
            );
          })}
        </motion.div>
    </motion.section>
  );
}
