import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectDetail } from "@/lib/projectDetails";
import { getProjectById, PROJECTS } from "@/lib/projects";
import { ProjectDetailGallery } from "@/app/components/ProjectDetailGallery";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Avery Lebene Korto`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectById(slug);
  const detail = getProjectDetail(slug);
  if (!project || !detail) notFound();

  const live = project.liveUrl;

  return (
    <main className="min-h-screen md:p-12 p-4 pb-24">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-green-200 text-sm font-medium hover:underline mb-8"
        >
          ← Back to projects
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {project.name}
          </h1>
          <p className="text-[#c7c7c7] text-lg mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs bg-[#333]/50 text-[#c7c7c7]"
              >
                {tag}
              </span>
            ))}
          </div>
          {live ? (
            <p>
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 font-medium hover:underline"
              >
                Open live site →
              </a>
            </p>
          ) : null}
        </header>

        <section className="mb-10" aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="text-xl font-semibold text-white mb-4"
          >
            About
          </h2>
          <div className="space-y-4 text-[#c7c7c7] leading-relaxed">
            {detail.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className="mb-10 rounded-lg border border-green-200/25 bg-green-200/5 p-6"
          aria-labelledby="goal-heading"
        >
          <h2
            id="goal-heading"
            className="text-lg font-semibold text-green-200 mb-3"
          >
            Goal
          </h2>
          <p className="text-[#e8e8e8] leading-relaxed m-0">{detail.goal}</p>
        </section>

        {detail.direction ? (
          <section className="mb-10" aria-labelledby="direction-heading">
            <h2
              id="direction-heading"
              className="text-xl font-semibold text-white mb-4"
            >
              Where it&apos;s headed
            </h2>
            <p className="text-[#c7c7c7] leading-relaxed m-0">
              {detail.direction}
            </p>
          </section>
        ) : null}

        {detail.roadmap && detail.roadmap.length > 0 ? (
          <section className="mb-10" aria-labelledby="roadmap-heading">
            <h2
              id="roadmap-heading"
              className="text-xl font-semibold text-white mb-6"
            >
              Roadmap
            </h2>
            <ol className="space-y-8 list-decimal pl-5 m-0 text-[#c7c7c7]">
              {detail.roadmap.map((block) => (
                <li key={block.phase} className="pl-2">
                  <h3 className="text-white font-medium text-base m-0 mb-3">
                    {block.phase}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 m-0">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="mb-6" aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="text-xl font-semibold text-white mb-6"
          >
            Screenshots
          </h2>
          <ProjectDetailGallery items={detail.gallery} />
        </section>
      </article>
    </main>
  );
}
