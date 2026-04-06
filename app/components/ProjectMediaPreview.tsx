"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { useNarrowViewport } from "@/lib/useNarrowViewport";
import { MotionNextImage } from "./MotionNextImage";

type PreviewProject = Pick<Project, "id" | "name" | "image" | "imageMobile">;

type Props = Readonly<{
  project: PreviewProject;
  /** When set, the image area is clickable (toggle stays above). */
  imageLinkHref?: string;
  /** Use eager for the first above-the-fold card to improve LCP. */
  loading?: "eager" | "lazy";
}>;

export function ProjectMediaPreview({
  project,
  imageLinkHref,
  loading = "lazy",
}: Props) {
  const narrow = useNarrowViewport();
  const [locked, setLocked] = useState<"desktop" | "mobile" | null>(null);
  const effective = locked ?? (narrow ? "mobile" : "desktop");

  const desktopSrc = project.image;
  const mobileSrc = project.imageMobile;
  const hasBoth = Boolean(desktopSrc && mobileSrc);
  const showToggle = hasBoth;

  const renderPhone = (src: string, alt: string) => (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="relative h-[min(92%,420px)] aspect-[390/844]  overflow-hidden border-2 border-[#333] shadow-lg bg-black">
        <MotionNextImage
          src={src}
          alt={alt}
          className="w-full h-full object-contain object-top"
          width={390}
          height={844}
          loading={loading}
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = "none";
          }}
        />
      </div>
    </div>
  );

  const renderFull = (src: string, alt: string) => (
    <MotionNextImage
      src={src}
      alt={alt}
      width={400}
      height={225}
      className="w-full h-full object-contain object-top"
      loading={loading}
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.style.display = "none";
        const fallback = e.currentTarget.parentElement?.querySelector(
          "[data-fallback]"
        );
        if (fallback) (fallback as HTMLElement).style.display = "flex";
      }}
    />
  );

  let body: ReactNode = null;
  const hasAny = Boolean(desktopSrc || mobileSrc);

  if (hasBoth) {
    if (effective === "desktop" && desktopSrc) {
      body = renderFull(desktopSrc, project.name);
    } else if (mobileSrc) {
      body = renderPhone(mobileSrc, `${project.name} mobile preview`);
    }
  } else if (desktopSrc) {
    body = renderFull(desktopSrc, project.name);
  } else if (mobileSrc) {
    body = renderPhone(mobileSrc, `${project.name} mobile preview`);
  }

  return (
    <div className="aspect-video bg-[#1a1a1a] relative">
      {showToggle && (
        <fieldset className="absolute top-2 right-2 z-[3] m-0 min-w-0 flex rounded-full border border-[#444]/80 bg-[#111]/90 p-0.5 gap-0.5">
          <legend className="sr-only">Preview device</legend>
          <button
            type="button"
            onClick={() => setLocked("desktop")}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              effective === "desktop"
                ? "bg-green-200 text-black"
                : "text-[#c7c7c7] hover:text-white"
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setLocked("mobile")}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              effective === "mobile"
                ? "bg-green-200 text-black"
                : "text-[#c7c7c7] hover:text-white"
            }`}
          >
            Mobile
          </button>
        </fieldset>
      )}

      {body}

      {imageLinkHref ? (
        <Link
          href={imageLinkHref}
          className="absolute inset-0 z-[1]"
          aria-label={`View ${project.name}`}
        />
      ) : null}

      <div
        data-fallback
        className={`absolute inset-0 items-center justify-center text-[#666] text-sm z-0 ${
          hasAny ? "hidden" : "flex"
        }`}
        aria-hidden
      >
        {project.name}
      </div>
    </div>
  );
}
