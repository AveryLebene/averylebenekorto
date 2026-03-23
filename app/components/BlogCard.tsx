"use client";

import Link from "next/link";
import { getBlogPostUrl, type BlogPost } from "@/lib/blog";
import { MotionImg } from "./MotionImg";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

interface BlogCardProps {
  readonly post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const href = getBlogPostUrl(post);
  const isExternal = href.startsWith("http");

  return (
    <article className="h-full flex flex-col rounded-lg overflow-hidden bg-[#222]/40 border border-[#333]/40 transition-all duration-300 hover:border-green-200/50 hover:shadow-lg hover:shadow-green-200/10">
      <div className="aspect-video bg-[#1a1a1a] relative">
        {post.image_url ? (
          <MotionImg
            src={post.image_url}
            alt=""
            className="w-full h-full object-cover object-center"
            width={400}
            height={225}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#666] text-sm">
            {post.title}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[#888] text-xs mb-1">{formatDate(post.created_at)}</p>
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[#c7c7c7] text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded text-xs bg-[#333]/50 text-[#c7c7c7]"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-4">
          <Link
            href={`/blog/${post.slug}`}
            className="text-green-200 text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            See more
          </Link>
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-green-200 text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            Blog →
          </Link>
        </div>
      </div>
    </article>
  );
}
