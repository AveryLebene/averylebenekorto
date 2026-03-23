import Link from "next/link";
import { fetchBlogPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

const LATEST_COUNT = 6;

export default async function LatestBlogs() {
  const { posts } = await fetchBlogPosts({ limit: LATEST_COUNT, page: 1 });

  return (
    <div>
        <div className="flex items-center mb-8">
        <div className="h-px bg-green-200/60 w-10 mr-4"></div>
        <span className="text-green-200/80 font-gt-regular text-sm tracking-wider uppercase">
          Blog
        </span>
      </div>
    <section className="px-4 lg:px-8 py-12 md:py-16">
    
      <div className="max-w-6xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-[#888] text-center py-8">
            No posts yet. When the blog is live, your latest posts will appear
            here.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
    </div>
  );
}
