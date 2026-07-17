import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getBlogPostUrl } from "@/lib/blog";
import { fetchArticleContentRich } from "@/lib/article";
import ArticleContent from "@/app/components/ArticleContent";
import { MotionNextImage } from "@/app/components/MotionNextImage";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = getBlogPostUrl(post);
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const requestOrigin = `${proto}://${host}`;

  let contentHtml: string;
  try {
    const { contentHtml: html } = await fetchArticleContentRich(
      postUrl,
      requestOrigin
    );
    contentHtml = html;
  } catch {
    contentHtml = post.excerpt
      ? `<p>${escapeHtml(post.excerpt)}</p><p><em>Full content could not be loaded. <a href="${escapeAttr(postUrl)}">Open original post</a>.</em></p>`
      : "<p><em>Content could not be loaded.</em></p>";
  }

  const isExternal = postUrl.startsWith("http");

  return (
    <main className="min-h-screen md:p-12 p-4 pb-24">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-green-200 text-sm font-medium hover:underline mb-8"
        >
          ← Back to Blogs
        </Link>

        {post.image_url && (
          <div className="aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] mb-6 relative">
            <MotionNextImage
              src={post.image_url}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              loading="lazy"
            />
          </div>
        )}

        <header className="mb-8">
          <p className="text-[#888] text-sm mb-2">
            {formatDate(post.created_at)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 rounded text-xs bg-[#333]/50 text-[#c7c7c7]"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        <ArticleContent
          contentHtml={contentHtml}
          className="text-[#c7c7c7] leading-relaxed prose-invert"
        />

        <footer className="mt-12 pt-6 border-t border-[#333]/40">
          <a
            href={postUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-green-200 font-medium hover:underline"
          >
            {isExternal ? "Open original article →" : "Open on blog →"}
          </a>
        </footer>
      </article>
    </main>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
