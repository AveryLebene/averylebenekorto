import Link from "next/link";
import { fetchBlogPosts } from "@/lib/blog";
import BlogCard from "../components/BlogCard";

export const metadata = {
  title: "Blogs",
  description: "Latest blog posts and articles",
};

const POSTS_PER_PAGE = 12;

export default async function BlogsPage() {
  const { posts, pagination } = await fetchBlogPosts({
    limit: POSTS_PER_PAGE,
    page: 1,
  });

  return (
    <main className="md:p-12 p-4 min-h-screen pb-24">
      <h1 className="text-4xl pb-6 font-bold text-center">Blogs</h1>

      {posts.length === 0 ? (
        <div className="max-w-xl mx-auto text-center py-16">
          <p className="text-[#c7c7c7] mb-4">
            No posts yet. When blog is live and set, your latest posts will appear here.
          </p>
          <Link
            href="/"
            className="text-green-200 font-medium hover:underline"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <p className="text-center text-[#888] mt-8 text-sm">
              Page 1 of {pagination.totalPages} • {pagination.total} posts
            </p>
          )}
        </>
      )}
    </main>
  );
}
